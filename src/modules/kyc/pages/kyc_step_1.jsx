import React, { useState, useEffect } from 'react';

import { ReactComponent as KYC_Upload } from '@/assets/icons/kyc_upload.svg';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import { IoIosArrowRoundBack } from 'react-icons/io';

const KYCStep1 = ({ nextStep }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        profile: null,
    });

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? { file: files[0] } : value,
        }));
    };

    return (
        <div className="space-y-4 overflow-hidden">
            <form method='post' className='w-full space-y-4'>
                <div className='flex items-center gap-5'>
                    <div className='w-[64px] h-[64px] flex items-center justify-center bg-[#F0F2F5] border border-[#E4E7EC] overflow-hidden rounded-lg'>
                        {formData.profile && formData.profile.file ? (
                            <img
                                src={typeof formData.profile.file === 'string' ? formData.profile.file : URL.createObjectURL(formData.profile.file)}
                                alt="Profile Preview"
                                className='w-full h-full object-cover'
                            />
                        ) : (
                            <KYC_Upload />
                        )}
                    </div>

                    <div className='w-[122px] h-[36px] flex items-center justify-center border border-[#D0D5DD] rounded-lg'>
                        <input
                            type="file"
                            id="profile"
                            name="profile"
                            accept="image/*"
                            onChange={handleChange}
                            className="top-0 left-0 w-full h-full opacity-0 cursor-pointer z-10"
                            hidden
                        />
                        <label htmlFor="profile" className='text-sm font-normal cursor-pointer'>Upload profile</label>
                    </div>
                </div>
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
                    <TextInput
                        label="Email Address"
                        name="email"
                        type='email'
                        className='text-sm'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="adam.jude@mail.com"
                    />
                    <TextInput
                        label="Phone"
                        name="phone"
                        className='text-sm'
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full flex items-center gap-3'>
                        <DateInput
                            label="Date of Birth"
                            name="dob"
                            placeholder='DD / MM / YY'
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
                    </div>

                    <SelectInput
                        label="Marital Status"
                        name="marital_status"
                        className='text-sm'
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
                    className='text-sm'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="No 8 Amadu Bello Way, Wuse"
                />

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <SelectInput
                        label="Nationality"
                        name="nationality"
                        className='text-sm'
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

                    <div className='w-full flex items-center gap-3'>
                        <SelectInput
                            label="State"
                            name="state"
                            className='text-sm'
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
                            className='text-sm'
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
                </div>

                <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
                    <button
                        onClick={nextStep}
                        className='w-full md:w-36 h-11 md:h-9 mt-3 px-3 text-sm font-medium rounded-md bg-primary cursor-pointer'
                    >
                        Save and continue
                    </button>
                </div>
            </form>

        </div>
    );
};

export default KYCStep1;
