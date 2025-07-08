import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';

import SendMoneyModal from '@/modules/wallets/components/sendWithdrawModal';

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
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-2'>
                    {data.map((item, index) => (
                        <div key={index} className='p-5 bg-light md:bg-white text-sm border border-gray rounded-xl'>
                            <p className='text-xs md:text-sm text-secondary'>Investment Duration</p>
                            <p className='text-lg font-medium space-x-1'>
                                <span>{item.days} days</span>
                                <span className='text-sm text-secondary font-light'>({item.months} months)</span>
                            </p>

                            <div className='flex gap-10 my-4'>
                                <div className='space-y-1 text-xs md:text-sm'>
                                    <p className='text-secondary'>Investment amount</p>
                                    <p className='text-base font-medium'>₦{item.investment.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='space-y-1 text-xs md:text-sm'>
                                    <p className='text-secondary'>Interest rate</p>
                                    <p className='text-base font-medium'>{item.interest}%</p>
                                </div>
                            </div>

                            <div className='flex gap-10 my-4'>
                                <div className='space-y-1 text-xs md:text-sm'>
                                    <p className='text-secondary'>Investment balance</p>
                                    <p className='text-base font-medium'>₦{item.balance.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='space-y-1 text-xs md:text-sm'>
                                    <p className='text-secondary'>Investment earned</p>
                                    <p className='text-base text-[#099137] font-medium'>
                                        ₦{item.earned.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </p>
                                </div>
                            </div>

                            {item.withdrawn ?
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="inline-flex items-center justify-center gap-3 px-4 h-9 md:h-8 bg-primary text-sm font-medium rounded-md cursor-pointer hover:bg-primary/90 transition">
                                    <span>Withdraw</span>
                                    <BsArrowRight className="w-4 h-4" />
                                </button> :
                                <button
                                    className="px-4 h-9 md:h-8 text-sm text-[#E4E7EC] border border-[var(--firstlane-currency)] rounded-md cursor-pointer">
                                    Investment Withdraw
                                </button>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PastInvestmentTab;
