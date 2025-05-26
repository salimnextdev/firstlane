import React, { useState } from 'react';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import BackButton from '@/components/BackButton';

const BusinessLoans = () => {
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
                <h2 className="text-2xl font-medium">Apply for a business loan</h2>
                <button className='h-9 px-3 rounded-md bg-primary text-xs cursmr-pointer'>
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
                    <SelectInput
                        label="Collateral?"
                        name="collateral"
                        className='text-sm'
                        value={formData.collateral}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select collateral"
                    />
                    <TextInput
                        label='If Others, please specify'
                        name='others'
                        className='text-sm'
                        value={formData.others}
                        onChange={handleChange}
                        placeholder="Select name"
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

export default BusinessLoans;
