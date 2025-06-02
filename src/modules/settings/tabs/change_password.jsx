import React, { useState, useEffect } from 'react';

import { ReactComponent as KYC_Upload } from '@/assets/icons/kyc_upload.svg';

import TextInput from '@/components/FormInputs/TextInput';
import PasswordInput from '@/components/FormInputs/PasswordInput';
import OTPInput from '@/components/FormInputs/OTPInput';

const ChangePassword = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
        otp: ""
    });

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? { file: files[0] } : value,
        }));
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
        <div className='space-y-4'>
            <form method='post' className={`w-full space-y-4 ${isOpen ? 'hidden' : 'block'}`}>
                <PasswordInput
                    label="Old Password"
                    name="old_password"
                    className='w-full text-sm'
                    value={formData.old_password}
                    onChange={handleChange}
                    placeholder="password"
                />
                <PasswordInput
                    label="New Password"
                    name="new_password"
                    className='w-full text-sm'
                    value={formData.new_password}
                    onChange={handleChange}
                    placeholder="password"
                />

                <button
                    type='button'
                    onClick={()=> setIsOpen(true)}
                    className='w-full md:w-20 h-9 my-5 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                >
                    Proceed
                </button>
            </form>

            <div className={`${isOpen ? 'block' : 'hidden'}`}>
                <p className="mb-6 text-sm text-secondary">
                    We have sent you an OTP code to your email, 
                    <span className='mx-1 font-medium'>adam.john@mail.com</span>
                    to help you securely change your password. Enter code to change the password
                </p>
                <form method='post' className='w-full space-y-4'>
                    <OTPInput
                        label="OTP code"
                        name="otp"
                        className='text-sm'
                        value={formData.otp}
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
                        className={`w-16 h-9 mt-2 bg-primary text-sm rounded-md ${resend ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} hover:bg-opacity-90 transition`}
                        disabled={resend}
                    >
                        Verify
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;