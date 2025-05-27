import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

import { Separator } from '@/components/ui/separator';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import PasswordInput from '@/components/FormInputs/PasswordInput';
import AuthImageContainer from '@/components/AuthImageContainer';

const Signup = () => {
    const [formData, setFormData] = useState({
        title: "",
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

    return (
        <div className="w-full h-screen flex items-center justify-center md:p-10 overflow-hidden">
            <AuthImageContainer />

            <div className="w-full md:w-1/2 px-5 md:px-10 flex items-center justify-center md:text-center md:text-left">
                <div className='w-full lg:w-10/12'>
                    <div className="flex items-center gap-2 mb-6">
                        <img className="w-7" alt="logo" src={logo} />
                        <h1 className="text-lg font-medium text-primary">FirstLane</h1>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">
                        Create account
                    </h2>
                    <p className="mt-2 mb-6 text-sm text-secondary">
                        Fill in your details to create to your account
                    </p>
                    <form method="post" className="space-y-4 text-sm">
                        <div className='flex items-center gap-3'>
                            <div className='w-32'>
                                <SelectInput
                                    label="Title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    options={[
                                        { label: "Mr", value: "Mr" },
                                        { label: "Mrs", value: "Mrs" },
                                        { label: "Sir", value: "Sir" },
                                        { label: "Miss", value: "Miss" },
                                    ]}
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
                            <TextInput
                                label="Last Name"
                                name="lastname"
                                className='w-full'
                                value={formData.lastname}
                                onChange={handleChange}
                                placeholder="Jude"
                            />
                        </div>

                        <div className='flex items-center gap-3'>
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
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="adam.jude@mail.com"
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
                            Create account
                        </button>
                    </form>
                    <div className="mt-4 space-x-3 text-center text-sm">
                        <span className="text-secondary">
                            Already have an account?
                        </span>
                        <Link to={'/signin'} className="text-primary font-medium">
                            Login
                        </Link>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-sm text-secondary my-5 mt-8">
                        <Separator className="flex-1 h-px bg-gray-100" />
                        <span className="whitespace-nowrap">Or continue with</span>
                        <Separator className="flex-1 h-px bg-gray-100" />
                    </div>

                    <div className='flex flex-col lg:flex-row justify-center gap-3 text-sm font-normal'>
                        <div className='w-full h-[55px] flex items-center justify-center gap-2 border-2 border-gray-300 py-2 rounded-lg cursor-pointer'>
                            <FcGoogle className='text-2xl lg:text-2xl' />
                            <span>Google</span>
                        </div>
                        <div className='w-full h-[55px] flex items-center justify-center gap-2 border-2 border-gray-300 py-2 rounded-lg cursor-pointer'>
                            <FaFacebook className='text-xl text-[#1877F2]' />
                            <span>Facebook</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;