import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import { IoIosArrowRoundBack } from 'react-icons/io';

const KYCStep3 = ({ prevStep, nextStep }) => {

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
    return (
        <div className="space-y-4">
            <form method='post' className='w-full space-y-4'>
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full flex items-center gap-3'>
                        <div className='w-32 md:w-90'>
                            <SelectInput
                                label="Title"
                                name="title"
                                className='w-full text-sm'
                                value={formData.title}
                                onChange={handleChange}
                                options={[
                                    { label: "Mr", value: "Mr" },
                                    { label: "Mrs", value: "Mrs" },
                                    { label: "Sir", value: "Sir" },
                                    { label: "Miss", value: "Miss" },
                                ]}
                                placeholder="Mr"
                            />
                        </div>
                        <TextInput
                            label="First Name"
                            name="firstname"
                            className='w-full text-sm'
                            value={formData.firstname}
                            onChange={handleChange}
                            placeholder="Adam"
                        />
                    </div>
                    <TextInput
                        label="Last Name"
                        name="lastname"
                        className='text-sm'
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Jude"
                    />
                </div>

                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <SelectInput
                        label="Relationship to Next of Kin"
                        name="relationship"
                        className='w-full text-sm'
                        value={formData.relationship}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select Relationship"
                    />
                    <SelectInput
                        label="Gender"
                        name="gender"
                        className='text-sm'
                        value={formData.gender}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select Gender"
                    />
                    <TextInput
                        label="Phone Number"
                        name="phone"
                        className='text-sm'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <TextInput
                    label="Residential address"
                    name="address"
                    className='text-sm'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="No 8 Amadu Bello Way, Wuse"
                />

                <div className="fixed md:static bottom-0 z-10 w-full bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
                    <div className="flex items-center justify-center md:justify-start gap-3 mr-8 md:m-0 h-[71px]">
                        <button
                            onClick={prevStep}
                            className="w-3/12 md:w-20 h-11 md:h-9 flex items-center justify-center md:justify-start px-3 text-sm rounded-md border border-gray-200 cursor-pointer"
                        >
                            <span className="hidden md:block">Previous</span>
                            <IoIosArrowRoundBack className="w-7 h-7 md:hidden text-secondary" />
                        </button>

                        <button
                            onClick={nextStep}
                            className="w-8/12 md:w-36 h-11 md:h-9 flex items-center justify-center px-3 rounded-md bg-primary text-white text-sm cursor-pointer"
                        >
                            Save and continue
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default KYCStep3;