import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUserByEmail, sendCodeToEmail, verifyAuthentication } from '@/modules/auth/state/authSlice';
import { getCookie, removeCookie, setCookie } from '@/utils/cookieUtils';

import logo from '@/assets/images/logo.png';

import OTPInput from '@/components/FormInputs/OTPInput';
import AuthImageContainer from '@/components/AuthImageContainer';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';


const VerifyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const prevPage = location?.state?.from;
    const locationUser = React.useMemo(() => (
        location?.state?.email
            ? { email: location.state.email, userID: location?.state?.userID }
            : null
    ), [location?.state?.email, location?.state?.userID]);
    const cookieUser = React.useMemo(() => {
        try {
            return JSON.parse(getCookie('user') || 'null');
        } catch {
            return null;
        }
    }, []);
    const pendingVerificationUser = React.useMemo(() => {
        try {
            return JSON.parse(getCookie('pendingVerificationUser') || 'null');
        } catch {
            return null;
        }
    }, []);

    const user = cookieUser || pendingVerificationUser || locationUser;
    const token = getCookie('token') || null;

    // Hooks must always run in the same order; declare them before conditional returns.
    const [userID, setUserID] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [OTP, setOTP] = useState();
    const [countdown, setCountdown] = useState(50);
    const [resend, setResend] = useState(false);

    useEffect(() => {
        if (locationUser) {
            // Keep both cookies synchronized so verification survives full refreshes.
            setCookie('pendingVerificationUser', JSON.stringify(locationUser));
            if (!cookieUser) {
                setCookie('user', JSON.stringify(locationUser));
            }
        }
    }, [cookieUser, locationUser]);

    useEffect(() => {
        if (prevPage) {
          (async () => {
            try {
              const response = await dispatch(fetchUserByEmail(user?.email)).unwrap();
              const profile = response?.data?.[0] || response?.data || response;
              profile?._id && setUserID(profile._id);
            } catch (err) {
              toast.error('Failed to fetch user ID', {
                description: err?.message || 'Please try again.',
              });
            }
          })();
        }
      }, [dispatch, prevPage, user?.email]);

    const handleChange = (e) => {
        setOTP(e.target.value);
    };

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

    if (!user?.email) {
        return <Navigate to="/signup" />
    };

    // Redirect to dashboard, when user is loggedIn
    if (token) {
        return <Navigate to="/dashboard" />
    };

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
            const payload = await dispatch(verifyAuthentication(data)).unwrap();
            removeCookie('user');
            removeCookie('pendingVerificationUser');
            setCookie('token', payload?.access_token);
            setCookie('user', JSON.stringify(payload?.data));
            navigate('/account-success');
        } catch (error) {
            setCountdown(0);
            toast.error("An error occured", {
                description: error?.message || 'Code not found or expired. Please request a new code.',
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
            await dispatch(sendCodeToEmail(data)).unwrap();
            toast("OTP sent successfully!", {
                description: 'Enter the code to continue with verification.',
            });
        } catch (error) {
            toast.error("An error occured", {
                description: error?.message || 'Unable to resend code right now. Please try again.',
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