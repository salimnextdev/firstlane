import React, { useState } from 'react';

import SelectInput from '@/components/FormInputs/SelectInput';
import TextInput from '@/components/FormInputs/TextInput';

import { IoIosCheckmarkCircle } from 'react-icons/io';

const BankDetails = () => {
    const [option, setOption] = useState('NGN');
    const currencies = ['NGN', 'USD', 'GBP', 'EUR', 'CHF', 'CAD', 'KWD']

    return (
        <div className="space-y-4">
            <div className='w-full flex flex-wrap items-center gap-3 overflow-auto'>
                {currencies.map(item => (
                    <button
                        key={item}
                        onClick={() => setOption(item)}
                        className={`w-16 h-9 ${option === item ? 'bg-[#D8D9EA] text-primary' : 'border border-[#E4E7EC]'} text-sm rounded-md cursor-pointer`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {option === 'NGN' ?
                <form method="post" className='space-y-4'>
                    <TextInput
                        label='Account number'
                        name='account_number'
                        placeholder='0123456789'
                    />
                    <SelectInput
                        label='Bank name'
                        name='bank_name'
                        options={[
                            { label: "UBA", value: "UBA" },
                            { label: "Eco Bank", value: "Eco Bank" },
                        ]}
                        placeholder='Select bank'
                    />
                    <div className='relative'>
                        <TextInput
                            label='Account holder"s name'
                            name='account_name'
                            className='bg-[#F0F2F5]'
                            value=''
                            placeholder='Ayoola Sani'
                            disabled
                        />
                        <IoIosCheckmarkCircle className='absolute top-1/2 right-5 w-[25px] h-[25px] text-[#0F973D]' />
                    </div>

                    <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
                        <button
                            className='w-full md:w-32 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                        >
                            Save changes
                        </button>
                    </div>
                </form> :

                <form method='post' className='space-y-4'>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <TextInput
                            label='Account number'
                            name='account_number'
                            placeholder='0123456789'
                        />
                        <TextInput
                            label='Account holder"s name'
                            name='account_name'
                            placeholder='0123456789'
                        />
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <TextInput
                            label='Wire routing'
                            name='wire_routing'
                            placeholder='56789'
                        />
                        <TextInput
                            label='ACH routing'
                            name='ach_routing'
                            placeholder='012345'
                        />
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <SelectInput
                            label='Account type'
                            name=''
                            options={[
                                { label: "Savings", value: "Savings" },
                                { label: "Current", value: "Current" },
                            ]}
                            placeholder='Checking'
                        />
                        <TextInput
                            label='Swift code'
                            name='code'
                            placeholder='012345'
                        />
                    </div>
                    <SelectInput
                        label='Bank name'
                        name='bank_name'
                        options={[
                            { label: "UBA", value: "UBA" },
                            { label: "Eco Bank", value: "Eco Bank" },
                        ]}
                        placeholder='Select bank'
                    />

                    <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
                        <button
                            className='w-full md:w-32 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                        >
                            Save changes
                        </button>
                    </div>
                </form>}
        </div>
    );
};

export default BankDetails;