import React, { useState, useEffect } from 'react';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';

const KYCStep2 = ({ prevStep, nextStep }) => {

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
                    <SelectInput
                        label="ID Type"
                        name="id_type"
                        className='text-xs'
                        value={formData.id_type}
                        onChange={handleChange}
                        options={[
                            { label: "Mr", value: "Mr" },
                            { label: "Mrs", value: "Mrs" },
                            { label: "Sir", value: "Sir" },
                            { label: "Miss", value: "Miss" },
                        ]}
                        placeholder="Select ID Type"
                    />
                    <TextInput
                        label="ID Number"
                        name="id_number"
                        className='text-xs'
                        value={formData.id_number}
                        onChange={handleChange}
                        placeholder="1234567890"
                    />
                </div>

                <div className='w-full flex items-center gap-3'>
                    <DateInput
                        label="Issue Date"
                        name="issue_date"
                        placeholder='DD / MM / YY'
                    />
                    <DateInput
                        label="Expiry Date"
                        name="expiry_date"
                        placeholder='DD / MM / YY'
                    />
                </div>

                <TextInput
                    label="Bank Verification Number"
                    name="bvn"
                    className='text-xs'
                    value={formData.bvn}
                    onChange={handleChange}
                    placeholder="0123456789"
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

export default KYCStep2;