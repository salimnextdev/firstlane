import React, { useState, useEffect } from 'react';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';

const KYCStep1 = ({ nextStep }) => {

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
                    <TextInput
                        label="Email Address"
                        name="email"
                        type='email'
                        className='text-xs'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="adam.jude@mail.com"
                    />
                    <TextInput
                        label="Phone"
                        name="phone"
                        className='text-xs'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <div className='w-full flex items-center gap-3'>
                    <DateInput
                        label="Date of Birth"
                        name="dob"
                        placeholder='DD / MM / YY'
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

                    <SelectInput
                        label="Marital Status"
                        name="marital_status"
                        className='text-xs'
                        value={formData.marital_status}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select Marital Status"
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

                <div className='w-full flex items-center gap-3'>
                    <SelectInput
                        label="Nationality"
                        name="nationality"
                        className='text-xs'
                        value={formData.nationality}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select Nationality"
                    />

                    <SelectInput
                        label="State"
                        name="state"
                        className='text-xs'
                        value={formData.state}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select State"
                    />

                    <SelectInput
                        label="LGA"
                        name="lga"
                        className='text-xs'
                        value={formData.lga}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select LGA"
                    />
                </div>

                <button
                    onClick={nextStep}
                    className='h-9 px-3 rounded-md bg-primary text-xs cursor-pointer'
                >
                    Save and continue
                </button>
            </form>

        </div>
    );
};

export default KYCStep1;
