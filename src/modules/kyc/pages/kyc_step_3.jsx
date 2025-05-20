import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';

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
                <div className='flex items-center gap-3'>
                    <div className='w-90'>
                        <SelectInput
                            label="Title"
                            name="title"
                            className='w-full text-xs'
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
                        className='w-full text-xs'
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="Adam"
                    />
                    <TextInput
                        label="Last Name"
                        name="lastname"
                        className='text-xs'
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Jude"
                    />
                </div>

                <div className='flex items-center gap-3'>
                    <SelectInput
                        label="Relationship to Next of Kin"
                        name="relationship"
                        className='w-full text-xs'
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
                        className='text-xs'
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
                        className='text-xs'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <TextInput
                    label="Residential address"
                    name="address"
                    className='text-xs'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="No 8 Amadu Bello Way, Wuse"
                />

                <div className='space-x-3'>
                    <button
                        onClick={prevStep}
                        className='h-9 px-3 rounded-md border border-gray-200 text-xs cursor-pointer'
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextStep}
                        className='h-9 px-3 rounded-md bg-primary text-xs cursor-pointer'
                    >
                        Save and continue
                    </button>
                </div>
            </form>

        </div>
    );
};

export default KYCStep3;