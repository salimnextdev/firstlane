import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { registerUser } from '@/modules/auth/state/authSlice';
import { getCookie, setCookie } from '@/utils/cookieUtils';
import { toast } from "sonner";

import logo from '@/assets/images/logo.png';

import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Separator } from '@/components/ui/separator';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import PasswordInput from '@/components/FormInputs/PasswordInput';
import AuthImageContainer from '@/components/AuthImageContainer';
import { titleOptions } from '@/utils/dropdownOptions';
import { Loader } from 'lucide-react';

const Signup = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [submitted, setSubmitted] = useState();
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        title: "Mr",
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
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
    const token = getCookie('token') || null;
    if (token) {
        return <Navigate to="/dashboard" />
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.title) errors.firstname = "Title is required";
        if (!formData.firstname) errors.firstname = "Firstname is required";
        if (!formData.lastname) errors.lastname = "Lastname is required";
        if (!formData.email) errors.email = "Email is required";
        if (!formData.phone) errors.phone = "Phone is required";
        if (!formData.password) errors.password = "Password is required";
        // More validations as needed
        return errors;
    };

    const signup = async (e) => {
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
            "title": formData.title,
            "userType": "user",
            "email": formData.email,
            "fullname": `${formData.firstname} ${formData.lastname}`,
            "firstname": formData.firstname,
            "lastname": formData.lastname,
            "phone": formData.phone,
            "password": formData.password,
            "isAdmin": false,
            "isSuperAdmin": false,
        };

        try {
            const resultAction = await dispatch(registerUser(data));
            if (registerUser.fulfilled.match(resultAction)) {
                toast("Account created successfully", {
                    description: resultAction.payload.message,
                });
                setCookie('user', JSON.stringify({email: formData.email, userID: resultAction.payload.userID}))
                navigate('/verify-account');
            };
        } catch (error) {
            toast("An error occured", {
                description: resultAction.payload.message,
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className="w-full h-full md:h-screen flex items-center justify-center md:p-10 overflow-hidden">
            <AuthImageContainer />

            <div className="w-full md:w-1/2 my-10 md:my-0 px-5 md:px-10 flex items-center justify-center md:text-center md:text-left">
                <div className='w-full lg:w-10/12'>
                    <div className="flex items-center gap-2 mb-4 md:mb-6">
                        <img className="w-7" alt="logo" src={logo} />
                        <h1 className="text-lg font-medium text-primary">FirstLane</h1>
                    </div>
                    <h2 className="text-xl md:text-4xl font-bold text-gray-800">
                        Create account
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-secondary font-light">
                        Fill in your details to create to your account
                    </p>
                    <form onSubmit={signup} method="post" className="space-y-4 text-sm">
                        <div className='flex flex-col md:flex-row items-center gap-3'>
                            <div className='flex items-center gap-3'>
                                <div className='w-32'>
                                    <SelectInput
                                        label="Title"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        options={titleOptions}
                                        placeholder="Mr."
                                    />
                                </div>
                                <TextInput
                                    label="First Name"
                                    name="firstname"
                                    className='w-full'
                                    value={formData.firstname}
                                    onChange={handleChange}
                                    placeholder="Adam"
                                />
                            </div>
                            <TextInput
                                label="Last Name"
                                name="lastname"
                                className='w-full'
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Jude"
                            />
                        </div>

                        <div className='flex flex-col lg:flex-row items-center gap-3'>
                            <TextInput
                                label="Email Address"
                                name="email"
                                type='email'
                                className='w-full'
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="adam.jude@mail.com"
                            />
                            <TextInput
                                label="Phone"
                                name="phone"
                                className={'w-20'}
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="080 0000 000"
                            />
                        </div>

                        <PasswordInput
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <button
                            className="w-full h-11 mt-3 bg-[#3E4095] text-white font-normal rounded-md cursor-pointer hover:bg-opacity-90 transition"
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Create account'
                            }
                        </button>
                    </form>
                    <div className="mt-4 space-x-3 text-center text-sm">
                        <span className="text-secondary font-light">
                            Already have an account?
                        </span>
                        <Link to={'/signin'} className="text-primary font-medium">
                            Login
                        </Link>
                    </div>

                    {/* Feature Removed */}
                    {/* <div className="flex items-center justify-center gap-4 text-sm text-secondary my-5 mt-8">
                        <Separator className="flex-1 h-px bg-gray-300" />
                        <span className="whitespace-nowrap font-light">Or continue with</span>
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

export default Signup;