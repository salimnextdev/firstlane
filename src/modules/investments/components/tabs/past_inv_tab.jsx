import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';

import SendMoneyModal from '@/modules/wallets/components/sendMoneyModal';

const PastInvestmentTab = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative space-y-8">
            <SendMoneyModal
                isOpen={isOpen}
                onClose={setIsOpen}
                type='withdraw'
                title="Withdraw Money"
                buttonCLoseText="Cancel"
                buttonSuccessText="Withdraw"
            />
            <div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-2'>
                    {data.map((item, index) => (
                        <div key={index} className='p-5 bg-white text-sm border border-[#E4E7EC] rounded-xl'>
                            <p className='text-secondary'>Investment Duration</p>
                            <p className='text-lg font-medium space-x-1'>
                                <span>{item.days} days</span>
                                <span className='text-sm text-secondary font-light'>({item.months} months)</span>
                            </p>

                            <div className='flex gap-10 my-4'>
                                <div className='text-sm'>
                                    <p className='text-secondary'>Investment amount</p>
                                    <p className='text-sm font-medium'>₦{item.investment.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='text-secondary'>Interest rate</p>
                                    <p className='text-sm font-medium'>{item.interest}%</p>
                                </div>
                            </div>

                            <div className='flex gap-10 my-4'>
                                <div className='text-sm'>
                                    <p className='text-secondary'>Investment balance</p>
                                    <p className='text-sm font-medium'>₦{item.balance.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='text-secondary'>Investment earned</p>
                                    <p className='text-sm text-[#099137] font-medium'>
                                        ₦{item.earned.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsOpen(true)}
                                className="inline-flex items-center justify-center gap-3 px-4 h-8 bg-primary text-sm font-medium rounded-md cursor-pointer hover:bg-primary/90 transition">
                                <span>Withdraw</span>
                                <BsArrowRight className="w-4 h-4" />
                            </button>

                            {/* Disabled Button */}
                            {/* <button
                                className="px-4 h-8 text-sm text-[#E4E7EC] border border-[#F0F2F5] rounded-md cursor-pointer">
                                Investment Withdraw
                            </button> */}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PastInvestmentTab;
