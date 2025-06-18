import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { sendCodeToEmail } from '@/modules/auth/state/authSlice';
import { setCookie } from '@/utils/cookieUtils';

import logo from '@/assets/images/logo.png';

import TextInput from '@/components/FormInputs/TextInput';
import AuthImageContainer from '@/components/AuthImageContainer';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [submitted, setSubmitted] = useState(false);
    const [email, setEmail] = useState('');
    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    const sendCode = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const data = {
            email: email || '',
            type: "PasswordReset"
        };

        try {
            const resultAction = await dispatch(sendCodeToEmail(data));
            if (sendCodeToEmail.fulfilled.match(resultAction)) {
                // Needed for the reset otp screen.
                setCookie('email', email);
                setCookie('userID', resultAction.payload.data.userID);

                toast("OTP sent successfully!", {
                    description: resultAction.payload.message,
                });
                navigate('/reset-password/otp');
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
                        Forgot password
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-secondary font-light">
                        Forgot password? No need to worry, just provide your email and we will help you recover your email easily.
                    </p>
                    <form onSubmit={sendCode} method="post" className="space-y-4 text-sm">
                        <TextInput
                            label="Email Address"
                            name="email"
                            type='email'
                            value={email}
                            onChange={handleChange}
                            placeholder='adam.john@mail.com'
                        />

                        <button
                            className="w-full h-11 mt-2 bg-[#3E4095] text-white font-normal rounded cursor-pointer hover:bg-opacity-90 transition"
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Request OTP'
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

export default ForgotPassword;