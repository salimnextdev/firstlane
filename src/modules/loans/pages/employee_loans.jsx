import React, { useState } from 'react';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import BackButton from '@/components/BackButton';

const EmployeeLoans = () => {
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
        <form method='post' className="space-y-5">
            <BackButton />

            <div className='flex items-center justify-between'>
                <h2 className="text-2xl font-medium">Apply for an employee loan</h2>
                <button className='h-9 px-3 rounded-md bg-primary text-sm cursor-pointer'>
                    Submit application
                </button>
            </div>

            <div className='bg-[#F9FAFB] p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                <div className='flex items-center gap-3'>
                    <TextInput
                        label="How much do you want?"
                        name="amount"
                        className='text-sm'
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="1234567890"
                    />
                    <SelectInput
                        label="Why do you want this loan?"
                        name="loan_reason"
                        className='text-sm'
                        value={formData.loan_reason}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select purpose"
                    />
                </div>

                <div className='w-full flex items-center gap-3'>
                    <SelectInput
                        label="How long before you pay?"
                        name="duration"
                        className='text-sm'
                        value={formData.duration}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select tenure"
                    />
                    <SelectInput
                        label="What is the payment interval?"
                        name="interval"
                        className='text-sm'
                        value={formData.interval}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select repayment"
                    />
                </div>

                <div className='w-full flex items-center gap-3'>
                    <TextInput
                        label='Employer"s name'
                        name='employers_name'
                        className='text-sm'
                        value={formData.employers_name}
                        onChange={handleChange}
                        placeholder="Ventures studio group"
                    />
                    <TextInput
                        label='Employer"s phone number'
                        name='employers_phone'
                        className='text-sm'
                        value={formData.employers_phone}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <div className='w-full flex items-center gap-3'>
                    <TextInput
                        label='Employer"s grade (optional)'
                        name='employers_grade'
                        className='text-sm'
                        value={formData.employers_grade}
                        onChange={handleChange}
                        placeholder="15"
                    />
                    <TextInput
                        label='Your monthly income'
                        name='employers_phone'
                        className='text-sm'
                        value={formData.employers_phone}
                        onChange={handleChange}
                        placeholder="#100,000.00"
                    />
                </div>

                <TextInput
                    label="Employer's address"
                    name="address"
                    className='text-sm'
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="No 8 Amadu Bello Way, Wuse"
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

            <div className='flex items-center gap-4 pr-8 text-sm text-secondary'>
                <input type="checkbox" name="" id="" className='w-5 h-5' />
                <p>I declare that the above information capture, is correct and complete in every respect and any failure by me to pay any amount which is due and outstanding under this agreement, I will pay additional 12% par annum</p>
            </div>

        </form>
    );
};

export default EmployeeLoans;
