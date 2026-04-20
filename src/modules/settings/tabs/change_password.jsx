import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changePassword } from '@/modules/auth/state/authSlice';
import { removeCookie } from '@/utils/cookieUtils';

import PasswordInput from '@/components/FormInputs/PasswordInput';
import OTPInput from '@/components/FormInputs/OTPInput';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isOpen, setIsOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        old_password: "",
        new_password: "",
        otp: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.old_password) errors.old_password = "Old password is required";
        if (!formData.new_password) errors.new_password = "New password is required";
        if (formData.old_password === formData.new_password) errors.message = "Please make sure both passwords are not identical";
        return errors;
    };

    const resetPassword = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast(error);
            });
            return;
        };

        setSubmitted(true);
        const data = {
            currentPassword: formData.old_password,
            newPassword: formData.new_password
        };

        try {
            const resultAction = await dispatch(changePassword(data));
            if (changePassword.fulfilled.match(resultAction)) {
                // Remove all cookies used for the reset password flow to log the user out.
                removeCookie('token');
                removeCookie('user');

                toast("Password successfully reset!", {
                    description: "Your password has been successfully reset. You can now log in with your new password.",
                });
                navigate('/signin');
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
            <form onSubmit={resetPassword} method='post' className={`w-full space-y-4 ${isOpen ? 'hidden' : 'block'}`}>
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


                <div className="fixed md:static left-0 bottom-0 z-10 w-full h-[71px] px-5 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <button
                        // type='button'
                        // onClick={() => setIsOpen(true)}
                        className='w-full md:w-20 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                    >
                        {submitted ?
                            <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                            'Proceed'
                        }
                    </button>
                </div>
            </form>

            <div className={`${isOpen ? 'block' : 'hidden'}`}>
                <p className="mb-3 md:mb-6 text-sm text-secondary font-light">
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

                    <div className="fixed md:static left-0 bottom-0 z-10 w-full h-[71px] px-5 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                        <button
                            className={`w-full md:w-16 h-11 md:h-9 mt-2 bg-primary text-sm rounded-md ${resend ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} hover:bg-opacity-90 transition`}
                            disabled={resend}
                        >
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePassword;