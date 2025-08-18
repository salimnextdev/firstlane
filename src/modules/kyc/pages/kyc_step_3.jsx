import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { kycLevel3 } from '@/modules/kyc/state/kycSlice';

import { BsArrowLeft } from 'react-icons/bs';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import { IoIosArrowRoundBack } from 'react-icons/io';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import PlacesInput from '@/components/FormInputs/PlacesInput';
import { genderOptions, nextOfKinOptions, titleOptions } from '@/utils/dropdownOptions';

const KYCStep3 = ({ prevStep, nextStep }) => {
    const dispatch = useDispatch();

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        firstname: "",
        lastname: "",
        relationship: "",
        gender: "",
        phone: "",
        address: "",
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
        if (!formData.title) errors.title = "Title is required";
        if (!formData.firstname) errors.firstname = "Firstname is required";
        if (!formData.lastname) errors.lastname = "Lastname is required";
        if (!formData.relationship) errors.relationship = "Relationship is required";
        if (!formData.gender) errors.gender = "Gender is required";
        if (!formData.phone) errors.phone = "Phone number is required";
        if (!formData.address) errors.address = "Residential address is required";
        return errors;
    };

    const submitKYC = async (e) => {
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
            "nextOfKin": {
                title: formData.title,
                firstName: formData.firstname,
                lastName: formData.lastname,
                relationship: formData.relationship,
                gender: formData.gender,
                phoneNumber: formData.phone,
                residentialAddress: formData.address?.display_name || '',
            }
        };

        try {
            const resultAction = await dispatch(kycLevel3(data));
            if (kycLevel3.fulfilled.match(resultAction)) {
                nextStep();
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
        <div className="space-y-4">
            <form onSubmit={submitKYC} method='post' className='w-full space-y-4'>
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full flex items-center gap-3'>
                        <div className='w-32 md:w-90'>
                            <SelectInput
                                label="Title"
                                name="title"
                                className='w-full text-sm'
                                value={formData.title}
                                onChange={handleChange}
                                options={titleOptions}
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
                        options={nextOfKinOptions}
                        placeholder="Select Relationship"
                    />
                    <SelectInput
                        label="Gender"
                        name="gender"
                        className='text-sm'
                        value={formData.gender}
                        onChange={handleChange}
                        options={genderOptions}
                        placeholder="Select Gender"
                    />
                    <TextInput
                        label="Phone Number"
                        name="phone"
                        className='text-sm'
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <PlacesInput
                    label="Residential address"
                    name="address"
                    className='text-sm'
                    value={formData.address}
                    onChange={(address) => {
                        setFormData({ ...formData, ['address']: address });
                    }}
                    placeholder="No 8 Amadu Bello Way, Wuse"
                />

                <div className="fixed md:static bottom-0 z-10 w-full bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <div className="flex items-center justify-center md:justify-start gap-3 mr-8 md:m-0 h-[71px]">
                        <button
                            onClick={prevStep}
                            className="w-3/12 md:w-20 h-11 md:h-9 flex items-center justify-center md:justify-start px-3 text-sm rounded-md border border-gray-200 cursor-pointer"
                        >
                            <span className="hidden md:block">Previous</span>
                            <IoIosArrowRoundBack className="w-7 h-7 md:hidden text-secondary" />
                        </button>

                        <button
                            className="w-8/12 md:w-36 h-11 md:h-9 flex items-center justify-center px-3 rounded-md bg-primary text-white text-sm cursor-pointer"
                            disabled={submitted}
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Save and continue'
                            }
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default KYCStep3;