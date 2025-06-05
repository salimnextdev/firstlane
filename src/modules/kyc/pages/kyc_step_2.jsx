import React, { useState, useEffect } from 'react';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import FileInput from '@/components/FormInputs/FileInput';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

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
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <SelectInput
                        label="ID Type"
                        name="id_type"
                        className='text-sm'
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
                        className='text-sm'
                        value={formData.id_number}
                        onChange={handleChange}
                        placeholder="1234567890"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
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

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label="Bank Verification Number"
                        name="bvn"
                        className='text-sm'
                        value={formData.bvn}
                        onChange={handleChange}
                        placeholder="0123456789"
                    />
                    <FileInput
                        label='Upload document'
                        name='document'
                        onFileChange={handleChange}
                    />
                </div>

                <div className="fixed md:static bottom-0 z-10 w-full bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
                    <div className="flex items-center justify-center md:justify-start gap-3 mr-8 md:m-0 h-[71px]">
                        <button
                            onClick={prevStep}
                            className="w-3/12 md:w-20 h-11 md:h-9 flex items-center justify-center md:justify-start px-3 text-sm rounded-md border border-gray-200 cursor-pointer"
                        >
                            <span className="hidden md:block">Previous</span>
                            <IoIosArrowRoundBack className="w-7 h-7 md:hidden text-secondary" />
                        </button>

                        <button
                            onClick={nextStep}
                            className="w-8/12 md:w-36 h-11 md:h-9 flex items-center justify-center px-3 rounded-md bg-primary text-white text-sm cursor-pointer"
                        >
                            Save and continue
                        </button>
                    </div>
                </div>

            </form>

        </div>
    );
};

export default KYCStep2;