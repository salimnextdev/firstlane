import React, { useState } from 'react';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import FileInput from '@/components/FormInputs/FileInput';
import BackButton from '@/components/BackButton';

const FinanceLoans = () => {
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
                    Apply for an asset finance loan
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

                <div className='md:w-1/2'>
                <FileInput
                    label='Invoice of item from vendor'
                    name='invoice'
                    onFileChange={handleChange}
                />
                <p className='mt-2 text-sm text-secondary'>
                    You need to upload an invoice of the asset you want to purchase which would contain the account details of the vendor of this asset.
                </p>
                </div>
            </div>

            <div className='flex md:items-center gap-4 md:pr-8 text-sm text-secondary'>
                <input type="checkbox" name="" id="" className='w-5 h-5 accent-[#3E4095]' />
                <p>I declare that the above information capture, is correct and complete in every respect and any failure by me to pay any amount which is due and outstanding under this agreement, I will pay additional 12% par annum</p>
            </div>

        </form>
    );
};

export default FinanceLoans;
