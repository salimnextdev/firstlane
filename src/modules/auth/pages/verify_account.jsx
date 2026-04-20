import React, { useState, useEffect } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { sendCodeToEmail, verifyAuthentication } from '@/modules/auth/state/authSlice';
import { getCookie, removeCookie, setCookie } from '@/utils/cookieUtils';

import logo from '@/assets/images/logo.png';

import OTPInput from '@/components/FormInputs/OTPInput';
import AuthImageContainer from '@/components/AuthImageContainer';
import { API_BASE_URL } from '@/middlewares/api';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';


const VerifyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const prevPage = location?.state?.from;
    const locationUser = location?.state?.email
        ? { email: location.state.email, userID: location?.state?.userID }
        : null;
    const cookieUser = JSON.parse(getCookie('user') || null);
    const pendingVerificationUser = JSON.parse(getCookie('pendingVerificationUser') || null);
    
    const user = cookieUser || pendingVerificationUser || locationUser;

    useEffect(() => {
        if (locationUser) {
            // Keep both cookies synchronized so verification survives full refreshes.
            setCookie('pendingVerificationUser', JSON.stringify(locationUser));
            if (!cookieUser) {
                setCookie('user', JSON.stringify(locationUser));
            }
        }
    }, [cookieUser, locationUser]);

    if (!user?.email) {
        return <Navigate to="/signup" />
    };

    // Redirect to dashboard, when user is loggedIn
    const token = getCookie('token') || null;
    if (token) {
        return <Navigate to="/dashboard" />
    };

    // Manually refetch the userID because it is needed to resendOTP code to customer.
    const [userID, setUserID] = useState('');
    useEffect(() => {
        if (prevPage) {
          (async () => {
            try {
              const res = await fetch(`${API_BASE_URL}/users/by-any/email/${user?.email}`);
              const { data } = await res.json();
              data?.[0]?._id && setUserID(data[0]._id);
            } catch (err) {
              toast.error('Failed to fetch users ID:', err);
            }
          })();
        }
      }, [prevPage]);

    const [submitted, setSubmitted] = useState(false);
    const [OTP, setOTP] = useState();
    const handleChange = (e) => {
        setOTP(e.target.value);
    };

    const [countdown, setCountdown] = useState(50);
    const [resend, setResend] = useState(false);
    useEffect(() => {
        if (countdown === 0) {
            setResend(true);
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResend = async () => {
        if (!resend && !prevPage) return;
        await resendOTP();
        setCountdown(50);
        setResend(false);
    };

    const email_verification = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const data = {
            "userID": user?.userID ?? userID ?? '',
            "code": (OTP || '').replace('-', ''),
            "type": "EmailVerification"
        };

        try {
            const resultAction = await dispatch(verifyAuthentication(data));
            if (verifyAuthentication.fulfilled.match(resultAction)) {
                removeCookie('user');
                removeCookie('pendingVerificationUser');
                setCookie('token', resultAction.payload?.access_token);
                setCookie('user', JSON.stringify(resultAction.payload?.data));
                navigate('/account-success');
            } else {
                setCountdown(0);
                toast(resultAction.payload.message);
                return;
            };
        } catch (error) {
            toast("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        }
    };

    const resendOTP = async () => {
        const data = {
            "userID": user?.userID ?? userID ?? '', // Important: If not passed OTP code received would fail verification.
            "email": user?.email || '',
            "type": "EmailVerification"
        };

        try {
            const resultAction = await dispatch(sendCodeToEmail(data));
            if (sendCodeToEmail.fulfilled.match(resultAction)) {
                toast("OTP sent successfully!", {
                    description: 'Enter the code to continue with verification.',
                });
            } else {
                toast(resultAction.payload.message);
                return;
            };
        } catch (error) {
            toast("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        }
    };
    return (
        <div className="w-full h-screen flex items-start justify-center md:p-10 overflow-hidden">
            <AuthImageContainer />

            <div className="w-full md:w-1/2 mt-10 md:mt-20 px-5 md:px-10 flex items-center justify-center md:text-center md:text-left">
                <div className='w-full lg:w-10/12'>
                    <div className="hidden md:flex items-center gap-2 mb-6">
                        <img className="w-7" alt="logo" src={logo} />
                        <h1 className="text-lg font-medium text-primary">FirstLane</h1>
                    </div>
                    <h2 className="text-xl text-4xl font-bold text-gray-900">
                        Verify account
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-secondary font-light">
                        We have sent you an OTP code to your email,
                        <span className='mx-1 font-medium'>{user?.email}</span>
                        to verify you account. Enter code to verify account
                    </p>
                    <form onSubmit={email_verification} method="post" className="space-y-4 text-sm">
                        <OTPInput
                            label="OTP code"
                            name="otp"
                            value={OTP}
                            onChange={handleChange}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <p className="text-secondary">
                                {!resend && !prevPage && `${countdown}secs`}
                            </p>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={!resend && !prevPage}
                                className={`text-primary font-medium ${!resend && !prevPage ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                Resend OTP
                            </button>
                        </div>

                        <button
                            className={`w-full h-11 mt-2 bg-[#3E4095] text-white font-normal rounded-md cursor-pointer hover:bg-opacity-90 transition`}
                            disabled={submitted}
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Verify account'
                            }
                        </button>
                    </form>

                    {/* <Link to={'/signin'}>
                        <button className="mt-5 text-primary text-sm font-medium cursor-pointer">
                            Go back to Login
                        </button>
                    </Link> */}
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;