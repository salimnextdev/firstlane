import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FundAccountModal from '@/modules/investments/components/fundAccountModal';

const ActiveInvestmentTab = ({ data }) => {
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
                        <div key={index} className='p-5 bg-white text-sm border border-[#E4E7EC] rounded-xl'>
                            <p className='text-secondary'>Investment Duration</p>
                            <p className='text-lg font-medium space-x-1'>
                                <span>{item.days} days</span>
                                <span className='text-sm text-secondary font-light'>({item.months} months)</span>
                            </p>

                            <div className='flex gap-10 my-4'>
                                <div className='text-sm'>
                                    <p className='text-secondary'>Investment amount</p>
                                    <p className='text-sm font-medium'>₦{item.investment?.toLocaleString(undefined, {
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
                                    <p className='text-sm font-medium'>₦{item.balance?.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='text-secondary'>Investment earned</p>
                                    <p className='text-sm text-[#099137] font-medium'>
                                        ₦{item.earned?.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className='text-sm mt-2'>
                                <p className='text-secondary'>Investment duration so far</p>
                                <p className='text-sm font-medium space-x-1'>
                                    {item.days} days
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActiveInvestmentTab;
