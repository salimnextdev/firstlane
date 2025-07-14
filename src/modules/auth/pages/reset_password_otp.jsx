import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { sendCodeToEmail, verifyCode } from '@/modules/auth/state/authSlice';
import { getCookie, setCookie } from '@/utils/cookieUtils';

import logo from '@/assets/images/logo.png';

import OTPInput from '@/components/FormInputs/OTPInput';
import AuthImageContainer from '@/components/AuthImageContainer';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const ResetPasswordOTP = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const email = getCookie('email') || null;
    const userID = getCookie('userID') || null;

    const [submitted, setSubmitted] = useState(false);
    const [OTP, setOTP] = useState();
    const handleChange = (e) => {
        setOTP(e.target.value);
    };

    const [countdown, setCountdown] = useState(0);
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

    const handleResend = () => {
        if (!resend) return;
        resendOTP();
        setCountdown(50);
        setResend(false);
    };

    const email_verification = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const data = {
            // userID: userID,
            code: OTP.replace('-', ''),
            type: "PasswordReset"
        };

        try {
            const resultAction = await dispatch(verifyCode(data));
            if (verifyCode.fulfilled.match(resultAction)) {
                setCookie('OTP', OTP);
                navigate('/reset-password');
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
            userID: userID,
            email: email || '',
            type: "PasswordReset"
        };

        try {
            const resultAction = await dispatch(sendCodeToEmail(data));
            if (sendCodeToEmail.fulfilled.match(resultAction)) {
                toast("OTP sent successfully!", {
                    description: resultAction.payload.message,
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
                    <h2 className="text-xl md:text-4xl font-bold text-gray-900">
                        Reset password
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-secondary font-light">
                        We have sent you an otp code to your email
                        <span className='mx-1 font-medium'>adam.john@mail.com</span>
                        to help you recover your password
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
                                {!resend && `${countdown}secs`}
                            </p>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={!resend}
                                className={`text-primary font-medium ${!resend ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                Resend OTP
                            </button>
                        </div>

                        <button
                            className={`w-full h-11 mt-2 bg-[#3E4095] text-white font-normal rounded-md cursor-pointer hover:bg-opacity-90 transition`}
                            // disabled={resend}
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Proceed to reset password'
                            }
                        </button>
                    </form>

                    <Link to={'/signin'}>
                        <button className="mt-5 text-primary text-sm font-medium cursor-pointer">
                            Go back to Login
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordOTP;