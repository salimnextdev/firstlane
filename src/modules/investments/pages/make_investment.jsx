import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import BackButton from '@/components/BackButton';

import ConfirmModal from '@/modules/investments/components/confirmModal';
import CustomInvestmentModal from '@/modules/investments/components/customInvestmentModal';

const MakeInvestment = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [customOpen, setCustomOpen] = useState(false);

    return (
        <div className="space-y-4">
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={setConfirmOpen}
                title='Confirm Investment'
                description='Please confirm that you are making this investment for the 
                defined duration at the specified interest rate.'
                data={{ amount: '10000', duration: "360 days", interest: "3%", interval: "Monthly" }}
                buttonCLoseText="No, cancel"
                buttonSuccessText="Confirm and Invest"
            />
            <CustomInvestmentModal
                isOpen={customOpen}
                onClose={setCustomOpen}
                name={'Micheal Jordan'}
                title='Custom Investment Interest'
                buttonCLoseText="No, cancel"
                buttonSuccessText="Talk to support"
            />
            <BackButton />

            <h2 className="text-base md:text-2xl font-semibold">Make Investment</h2>


            <form method='post' className='w-full md:w-6/12'>
                <div className='flex items-center justify-between'>
                    <p className="text-sm text-secondary font-light">How much do you want to invest</p>
                    <p className="hidden md:block text-sm font-medium space-x-1">
                        <span className='text-secondary'>Balance:</span>
                        <span>₦{1000000.00.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                    </p>
                </div>

                <div className='relative'>
                    <TextInput
                        label=''
                        name='amount'
                        className='md:h-15 pr-36 font-medium'
                        placeholder='#10,000.00'
                    />
                    <p className="block md:hidden absolute top-4.5 right-4 text-sm text-secondary space-x-1">
                        <span className='font-light'>Bal:</span>
                        <span>₦{1000000.00.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                    </p>
                </div>

                <p className="mt-2 text-sm text-secondary font-light space-x-1">
                    <span>Minimum amount that can be invested is</span>
                    <span className='font-medium'>₦{10000.00.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</span>
                </p>
                <div className='my-3 p-3 bg-gray-100 text-sm text-secondary font-light border border-[#E4E7EC] rounded-lg'>
                    <p>We noticed that your investment amount is more than
                        <span className='font-medium mx-1'>₦25 million</span>
                        You can get a custom interest rate for your investment.
                        Do you want a custom investment rate?
                    </p>
                    <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-3 text-sm font-medium'>
                        <button className='h-9 md:h-8 px-2 bg-white text-black rounded-md md:border border-[#E4E7EC] cursor-pointer'>
                            No, continue with the standard rate
                        </button>
                        <button type='button' onClick={() => setCustomOpen(true)} className='h-9 md:h-8 px-2 rounded-md bg-secondary cursor-pointer'>
                            Yes, I want custom rate
                        </button>
                    </div>
                </div>

                <SelectInput
                    label='Repayment interval'
                    name='interval'
                    className='!mb-0 text-sm'
                    options={[
                        { label: "Daily", value: "Daily" },
                        { label: "Weekly", value: "Weekly" },
                        { label: "Monthly", value: "Monthly" },
                        { label: "Yearly", value: "Yearly" },
                    ]}
                    placeholder='Select repayment interval'
                />
                <p className="mt-2 text-sm text-secondary font-light">
                    This is the time period it would take to keep getting part of your interest until your investment is fully mature
                </p>

                <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-white md:bg-transparent border-t md:border-0 border-[#E4E7EC]">
                    <button
                        type='button'
                        onClick={() => setConfirmOpen(true)}
                        className='w-full md:w-24 h-10 md:h-9 my-3 md:my-5 px-2 rounded-md bg-primary text-sm cursor-pointer'
                    >
                        Invest now
                    </button>
                </div>
            </form>

        </div>
    );
};

export default MakeInvestment;
