import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

import OTPInput from '@/components/FormInputs/OTPInput';
import AuthImageContainer from '@/components/AuthImageContainer';

const VerifyAccount = () => {
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

    const handleResend = () => {
        if (!resend) return;
        setCountdown(50);
        setResend(false);
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
                    <p className="mt-2 mb-6 text-sm text-secondary">
                        We have sent you an OTP code to your email,
                        <span className='mx-1 font-medium'>adam.john@mail.com</span>
                        to verify you account. Enter code to verify account
                    </p>
                    <form method="post" className="space-y-4 text-sm">
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
                            className={`w-full h-11 mt-2 bg-[#3E4095] text-white font-normal rounded-md ${resend ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} hover:bg-opacity-90 transition`}
                            disabled={resend}
                        >
                            Verify account
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

export default VerifyAccount;