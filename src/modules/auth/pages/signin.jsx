import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { loginUser } from '@/modules/auth/state/authSlice';
import { getCookie, setCookie } from '@/utils/cookieUtils';
import { toast } from "sonner";

import logo from '@/assets/images/logo.png';

import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Separator } from '@/components/ui/separator';
import TextInput from '@/components/FormInputs/TextInput';
import PasswordInput from '@/components/FormInputs/PasswordInput';
import AuthImageContainer from '@/components/AuthImageContainer';

import { Loader } from 'lucide-react';

const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [redirectParam] = useSearchParams();
    const redirectUrl = redirectParam.get('redirect_url')

    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Redirect to dashboard, when user is loggedIn
    // Use useEffect to handle side effects for redirection
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            // If a redirectUrl exists and is valid, navigate there. Otherwise, navigate to dashboard.
            if (redirectUrl) {
                navigate(redirectUrl, { replace: true }); // Use replace to avoid adding sign-in to history
            } else {
                navigate("/dashboard", { replace: true });
            }
        }
    }, [redirectUrl, navigate]);

    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = "Email is required";
        if (!formData.password) errors.password = "Password is required";
        return errors;
    };

    const login = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast(error);
            });
            setErrors(validationErrors);
            return;
        };

        setSubmitted(true);

        const data = {
            "email": formData.email,
            "password": formData.password,
        };

        try {
            const resultAction = await dispatch(loginUser(data));
            if (loginUser.fulfilled.match(resultAction)) {
                navigate(redirectUrl || '/dashboard', { replace: true });
            } else if (resultAction.payload?.message === 'Email not verified') {
                setCookie('user', JSON.stringify({email: formData.email}))
                navigate('/verify-account', { state: { from: '/signin' } })
            }
        } catch (error) {
            toast("An error occured", {
                description: resultAction.payload?.message || 'An unexpected error occurred while loading the page.',
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className="w-full md:h-screen flex items-center justify-center md:p-10 overflow-hidden">
            <AuthImageContainer />

            <div className="w-full md:w-1/2 my-10 md:my-0 px-5 md:px-10 flex items-center justify-center md:text-center md:text-left">
                <div className='w-full lg:w-10/12'>
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                        <img className="w-7" alt="logo" src={logo} />
                        <h1 className="text-xl font-medium text-primary">FirstLane</h1>
                    </div>
                    <h2 className="text-xl md:text-4xl font-bold text-gray-800">
                        Welcome back!
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-secondary font-light">
                        Fill in your details to login to your account
                    </p>
                    <form onSubmit={login} method="post" className="space-y-4 text-sm">
                        <TextInput
                            label="Email Address"
                            name="email"
                            type='email'
                            className='w-full'
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="adam.jude@mail.com"
                        />

                        <PasswordInput
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <Link to={'/forgot-password'}>
                            <button type="button" className="text-primary text-sm font-medium cursor-pointer float-right">
                                Forgot Password
                            </button>
                        </Link>

                        <button
                            className="w-full h-11 mt-6 bg-[#3E4095] text-white font-normal rounded-md cursor-pointer hover:bg-opacity-90 transition"
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Login'
                            }
                        </button>
                    </form>
                    <div className="mt-4 space-x-3 text-center text-sm">
                        <span className="text-secondary font-light">
                            Don't have an account?
                        </span>
                        <Link to={'/signup'} className="text-primary font-medium">
                            Create an account
                        </Link>
                    </div>

                    {/* Feature Removed */}
                    {/* <div className="flex items-center justify-center gap-4 text-sm text-secondary my-5 mt-8">
                        <Separator className="flex-1 h-px bg-gray-300" />
                        <span className="whitespace-nowrap font-light">Or sign up with</span>
                        <Separator className="flex-1 h-px bg-gray-300" />
                    </div>

                    <div className='flex items-center justify-center gap-3 text-sm font-normal'>
                        <div className='w-full h-12 flex items-center justify-center gap-2 border-[1.5px] border-gray-200 py-2 rounded-lg cursor-pointer'>
                            <FcGoogle className='text-2xl lg:text-2xl' />
                            <span>Google</span>
                        </div>
                        <div className='w-full h-12 flex items-center justify-center gap-2 border-[1.5px] border-gray-200 py-2 rounded-lg cursor-pointer'>
                            <FaFacebook className='text-xl text-[#1877F2]' />
                            <span>Facebook</span>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default Signin;