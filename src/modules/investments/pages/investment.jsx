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
        <div className="relative space-y-2 md:space-y-6">
            <FundOptionsModal
                isOpen={isOpen}
                onClose={setIsOpen}
                option="bank_transfer"
            />
            <div>
                <h2 className="text-xl md:text-2xl font-semibold">Investment</h2>
                <p className="text-sm text-gray-500 my-1 font-light">Track and manage your investments safely 💰</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-6">
                <div className="flex justify-between bg-black text-white p-5 rounded-xl">
                    <div className='space-y-3'>
                        <p className="text-sm text-gray-300 md:mb-2">Available balance</p>
                        <div className='flex items-center gap-5 justify-between md:mt-10'>
                            <p className="text-xl md:text-[32px] font-semibold">₦{140000.00.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                            <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                        </div>
                        <button onClick={() => setIsOpen(true)} className='block md:hidden h-8 px-4 text-sm rounded-md bg-secondary cursor-pointer'>
                            Fund wallet
                        </button>
                    </div>
                    <button onClick={() => setIsOpen(true)} className='hidden md:block h-8 px-2 text-sm rounded-md bg-secondary cursor-pointer'>
                        Fund wallet
                    </button>
                </div>
                <div className="flex justify-between bg-[#F9FAFB] p-2 px-3 md:p-4 rounded-lg md:rounded-xl border border-[#E4E7EC]">
                    <div className='w-full md:w-10/12 flex md:flex-col items-center md:items-start justify-between'>
                        <p className="hidden md:block text-base text-[#667085] md:mb-2 font-light">Investment count</p>
                        <p className="md:my-3 text-base md:text-2xl font-semibold">{'14'.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })} <span className='text-sm text-secondary font-light'>investments</span></p>

                        <Link to={'/investment/all'} className='flex items-center gap-2 text-sm'>
                            <span className='hidden md:inline-block font-medium'>View my investments</span>
                            <span className='block md:hidden font-medium'>View</span>
                            <BsArrowRight className='w-4 h-4 text-secondary' />
                        </Link>
                    </div>
                    <div className='w-[40px] h-[40px] hidden md:flex items-center justify-center bg-white border border-[#E4E7EC] rounded-full'>
                        <InvestmentIcon className="" />
                    </div>
                </div>
            </div>

            <div className="mt-6 md:mt-0">
                <h2 className="text-base md:text-xl font-medium">Available Investment</h2>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-2'>
                    {data.map((item, index) => (
                        <div key={index} className='p-3 md:p-5 bg-[#F9FAFB] md:bg-white text-sm border border-[#E4E7EC] rounded-xl'>
                            <p className='text-xs text-secondary'>Investment Duration</p>
                            <p className='text-xl font-medium space-x-1'>
                                <span>{item.days} days</span>
                                <span className='text-sm text-secondary font-light'>({item.months} months)</span>
                            </p>

                            <div className='flex gap-10 my-4'>
                                <div className='space-y-1 text-xs md:text-sm'>
                                    <p className='text-secondary'>Investment starts at</p>
                                    <p className='text-base font-medium'>₦{item.investment.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                </div>
                                <div className='space-y-1 text-xs md:text-sm'>
                                    <p className='text-secondary'>Interest starts at</p>
                                    <p className='text-base font-medium'>{item.interest}%</p>
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
