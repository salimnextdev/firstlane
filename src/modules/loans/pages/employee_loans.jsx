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

            <div className="w-full flex items-center justify-between gap-4">
                <h2 className="text-base md:text-2xl font-medium">
                    Apply for an employee loan
                </h2>

                <div className="fixed md:static bottom-0 md:bottom-auto z-10 w-full md:w-auto h-[71px] md:h-auto pr-10 md:px-0 bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
                    <button className="w-full md:w-40 h-11 md:h-9 mt-3 md:mt-0 px-3 rounded-md bg-primary text-sm text-white cursor-pointer">
                        Submit application
                    </button>
                </div>
            </div>


            <div className='md:bg-[#F9FAFB] md:p-5 space-y-3 md:border border-[#E4E7EC] rounded-xl'>
                <div className='flex flex-col md:flex-row items-center gap-3'>
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
                            { label: "Equipment financing", value: "Equipment financing" },
                            { label: "Working capital", value: "Working capital" },
                            { label: "Business expansion", value: "Business expansion" },
                            { label: "Invoice financing", value: "Invoice financing" },
                        ]}
                        placeholder="Select purpose"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <SelectInput
                        label="How long before you pay?"
                        name="duration"
                        className='text-sm'
                        value={formData.duration}
                        onChange={handleChange}
                        options={[
                            { label: "3 months", value: "3 months" },
                            { label: "6 months", value: "6 months" },
                            { label: "9 months", value: "9 months" },
                            { label: "12 months", value: "12 months" },
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
                            { label: "Weekly", value: "Weekly" },
                            { label: "Monthly", value: "Monthly" },
                            { label: "Quarterly", value: "Quarterly" },
                            { label: "Yearly", value: "Yearly" },
                        ]}
                        placeholder="Select repayment"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
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

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
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

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
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

            <div className='flex md:items-center gap-4 md:pr-8 text-sm text-secondary'>
                <input type="checkbox" name="" id="" className='w-5 h-5 accent-[#3E4095]' />
                <p>I declare that the above information capture, is correct and complete in every respect and any failure by me to pay any amount which is due and outstanding under this agreement, I will pay additional 12% par annum</p>
            </div>

        </form>
    );
};

export default EmployeeLoans;
