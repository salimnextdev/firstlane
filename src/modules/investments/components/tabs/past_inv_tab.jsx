import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';

import FundAccountModal from '@/modules/investments/components/fundAccountModal';

const PastInvestmentTab = ({ data }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative space-y-8">
            <FundAccountModal
                isOpen={isOpen}
                onClose={setIsOpen}
                data={{
                    amount: 140000.00,
                    acc_number: "0123456789",
                    acc_name: "Alison Eyo",
                    bank_name: "Paystack Titan",
                }}
            />
            <div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-2'>
                    {data.map((item, index) => (
                        <div key={index} className='p-5 bg-white text-xs border border-[#E4E7EC] rounded-xl'>
                            <p className='text-secondary'>Investment Duration</p>
                            <p className='text-lg font-medium space-x-1'>
                                <span>{item.days} days</span>
                                <span className='text-xs text-secondary font-light'>({item.months} months)</span>
                            </p>

                            <div className='flex gap-10 my-4'>
                                <div className='text-xs'>
                                    <p className='text-secondary'>Investment amount</p>
                                    <p className='text-sm font-medium'>₦{item.investment.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='text-xs'>
                                    <p className='text-secondary'>Interest rate</p>
                                    <p className='text-sm font-medium'>{item.interest}%</p>
                                </div>
                            </div>

                            <div className='flex gap-10 my-4'>
                                <div className='text-xs'>
                                    <p className='text-secondary'>Investment balance</p>
                                    <p className='text-sm font-medium'>₦{item.balance.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='text-xs'>
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
                                className="inline-flex items-center justify-center gap-3 px-4 h-8 bg-primary text-xs font-medium rounded-md cursor-pointer hover:bg-primary/90 transition">
                                <span>Withdraw</span>
                                <BsArrowRight className="w-4 h-4" />
                            </button>

                            {/* Disabled Button */}
                            {/* <button
                                className="px-4 h-8 text-xs text-[#E4E7EC] border border-[#F0F2F5] rounded-md cursor-pointer">
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
