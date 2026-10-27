import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '@/modules/auth/state/authSlice';
import { getCookie, removeCookie } from '@/utils/cookieUtils';

import logo from '@/assets/images/logo.png';

import PasswordInput from '@/components/FormInputs/PasswordInput';
import AuthImageContainer from '@/components/AuthImageContainer';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const ResetPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const OTP = getCookie('OTP') || null;

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        new_password: "",
        confirm_password: ""
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
        if (!formData.new_password) errors.new_password = "New password is required";
        if (!formData.confirm_password) errors.confirm_password = "Confirm password is required";
        if (formData.new_password !== formData.confirm_password) errors.message = "Please make sure both passwords are identical";
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
            code: OTP.replace('-', ''),
            newPassword: formData.new_password
        };

        try {
            await dispatch(forgotPassword(data)).unwrap();
            // Remove all cookies used for the reset password flow
            removeCookie('email');
            removeCookie('userID');
            removeCookie('OTP');

            toast("Password successfully reset!", {
                description: "Your password has been successfully reset. You can now log in with your new password.",
            });
            navigate('/signin');
        } catch (error) {
            toast("An error occured", {
                description: error?.message || 'Unable to reset password right now. Please try again.',
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
                        Enter your new passoword
                    </p>
                    <form onSubmit={resetPassword} method="post" className="space-y-4 text-sm">
                        <PasswordInput
                            label="New Password"
                            name="new_password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <PasswordInput
                            label="Confirm Password"
                            name="confirm_password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            className="w-full h-11 mt-2 bg-[#3E4095] text-white font-normal rounded-md cursor-pointer hover:bg-opacity-90 transition"
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Reset password and login'
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

export default ResetPassword;