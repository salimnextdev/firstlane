import React, { useState } from 'react';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import BackButton from '@/components/BackButton';
import { Checkbox } from '@/components/ui/checkbox';
import CheckboxInput from '@/components/FormInputs/CheckInput';

const PersonalLoans = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [checked, setChecked] = useState(false);

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
                <h2 className="text-2xl font-medium">Apply for a personal loan</h2>
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
                            { label: "Equipment financing", value: "Equipment financing" },
                            { label: "Working capital", value: "Working capital" },
                            { label: "Business expansion", value: "Business expansion" },
                            { label: "Invoice financing", value: "Invoice financing" },
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

                <div className='w-full flex items-center gap-3'>
                    <SelectInput
                        label="Collateral?"
                        name="collateral"
                        className='text-sm'
                        value={formData.collateral}
                        onChange={handleChange}
                        options={[
                            { label: "Vehicle details", value: "Vehicle details" },
                            { label: "Property title", value: "Property title" },
                            { label: "Fixed deposits", value: "Fixed deposits" },
                            { label: "Equipment or inventory", value: "Equipment or inventory" },
                            { label: "Others", value: "Others" },
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

            <div className='flex items-center gap-4 text-sm pr-8 text-secondary'>
                <input type="checkbox" name="" id="" className='w-5 h-5' />
                {/* <CheckboxInput
                    name='check'
                    value='check'
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                /> */}
                <p>I declare that the above information capture, is correct and complete in every respect and any failure by me to pay any amount which is due and outstanding under this agreement, I will pay additional 12% par annum</p>
            </div>

        </form>
    );
};

export default PersonalLoans;
