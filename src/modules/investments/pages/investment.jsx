import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { RiEyeCloseLine } from "react-icons/ri";
import { BsArrowRight } from 'react-icons/bs';
import { ReactComponent as InvestmentIcon } from '@/assets/icons/investment.svg';

import FundOptionsModal from '@/modules/investments/components/fundOptionsModal';

const data = [
    {
        days: 90,
        months: 3,
        investment: 10000.00,
        interest: 3
    },
    {
        days: 180,
        months: 6,
        investment: 10000.00,
        interest: 3
    },
    {
        days: 360,
        months: 12,
        investment: 10000.00,
        interest: 3
    },
    {
        days: 540,
        months: 18,
        investment: 10000.00,
        interest: 3
    },
    {
        days: 720,
        months: 24,
        investment: 10000.00,
        interest: 3
    },
]

const Investment = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative space-y-8">
            <FundOptionsModal
                isOpen={isOpen}
                onClose={setIsOpen}
                option="bank_transfer"
            />
            <div>
                <h2 className="text-2xl font-semibold">Investment</h2>
                <p className="text-sm text-gray-500 my-1">Track and manage your investments safely 💰</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between bg-black text-white p-5 rounded-xl">
                    <div className=''>
                        <p className="text-sm text-gray-300 mb-2">Available balance</p>
                        <div className='flex items-center gap-5 justify-between mt-12'>
                            <p className="text-2xl font-semibold">₦{140000.00.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                            <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(true)} className='h-8 px-2 text-sm rounded-md bg-secondary cursor-pointer'>
                        Fund wallet
                    </button>
                </div>
                <div className="flex justify-between bg-[#F9FAFB] p-4 rounded-xl border border-[#E4E7EC]">
                    <div className=''>
                        <p className="text-sm text-[#667085] mb-2">Investment count</p>
                        <p className="my-5 text-2xl font-semibold">{'14'.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} <span className='text-sm text-secondary'>investments</span></p>

                        <Link to={'/investment/all'} className='flex items-center gap-1 text-sm'>
                            <span className='font-medium'>View my investments</span>
                            <BsArrowRight className='w-4 h-4 text-secondary' />
                        </Link>
                    </div>
                    <div className='w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#E4E7EC] rounded-full'>
                        <InvestmentIcon className="" />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold">Available Investment</h2>
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
                                    <p className='text-secondary'>Investment starts at</p>
                                    <p className='text-sm font-medium'>₦{item.investment.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='text-sm'>
                                    <p className='text-secondary'>Interest starts at</p>
                                    <p className='text-sm font-medium'>{item.interest}%</p>
                                </div>
                            </div>

                            <Link
                                to={'/investment/make-investment'}
                                className="inline-flex items-center justify-center gap-3 px-4 h-8 bg-primary text-sm font-medium rounded-md cursor-pointer hover:bg-primary/90 transition">
                                <span>Invest</span>
                                <BsArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Investment;
