import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

import PasswordInput from '@/components/FormInputs/PasswordInput';
import AuthImageContainer from '@/components/AuthImageContainer';

const ResetPassword = () => {
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
    return (
        <div className="w-full h-screen flex items-start justify-center md:p-10 overflow-hidden">
            <AuthImageContainer />

            <div className="w-full md:w-1/2 md:mt-20 px-5 md:px-10 flex items-center justify-center md:text-center md:text-left">
                <div className='w-full lg:w-10/12'>
                    <div className="flex items-center gap-2 mb-6">
                        <img className="w-7" alt="logo" src={logo} />
                        <h1 className="text-lg font-medium text-primary">FirstLane</h1>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">
                        Reset password
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-secondary">
                        Enter your new passoword
                    </p>
                    <form method="post" className="space-y-4 text-sm">
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
                            Reset password and login
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