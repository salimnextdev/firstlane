import React, { useState, useEffect } from 'react';

import FileInput from '@/components/FormInputs/FileInput';

const KYCStep4 = ({ prevStep, nextStep }) => {

    const [formData, setFormData] = useState({
        account1: null,
        account2: null
    });

    const handleChange = (e) => {
        const { name, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };
    return (
        <div className="space-y-4">
            {/* KYC Verification Banner */}
            <div className="mb-6 bg-[#EBEBEB] border-[1.5px] border-[#D0D5DD] p-4 rounded-xl">
                <div className='w-10 h-10 flex items-center justify-center bg-[#D8D8D8] rounded-full'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.43459 8.06909C6.44599 4.50997 7.45169 2.73041 8.83172 2.27232C9.59093 2.02031 10.4087 2.02031 11.168 2.27232C12.548 2.73041 13.5537 4.50997 15.5651 8.06909C17.5765 11.6282 18.5822 13.4078 18.2805 14.8578C18.1145 15.6555 17.7056 16.379 17.1124 16.9247C16.034 17.9166 14.0226 17.9166 9.99984 17.9166C5.97704 17.9166 3.96565 17.9166 2.88731 16.9247C2.29407 16.379 1.88516 15.6555 1.71919 14.8578C1.4175 13.4078 2.4232 11.6282 4.43459 8.06909Z" stroke="#1B1B1B" stroke-width="1.5" />
                        <path d="M9.99349 13.3333H10.001" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10.8333L10 7.49998" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <p className="text-xs text-[#667085] text-wrap leading-relaxed">
                    We would be requesting for your statements of account for the last 6 months
                </p>
            </div>

            <form method='post' className='w-full space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    <FileInput
                        label='Statement of account 1'
                        name='account1'
                        onFileChange={handleChange}
                    />
                    <FileInput
                        label='Statement of account 2'
                        name='account2'
                        onFileChange={handleChange}
                    />
                    <FileInput
                        label='Statement of account 3'
                        name='account3'
                        onFileChange={handleChange}
                    />
                    <FileInput
                        label='Statement of account 4'
                        name='account4'
                        onFileChange={handleChange}
                    />
                    <FileInput
                        label='Statement of account 5'
                        name='account5'
                        onFileChange={handleChange}
                    />
                    <FileInput
                        label='Statement of account 6'
                        name='account6'
                        onFileChange={handleChange}
                    />
                </div>

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
                        Submit for verification
                    </button>
                </div>
            </form>

        </div>
    );
};

export default KYCStep4;