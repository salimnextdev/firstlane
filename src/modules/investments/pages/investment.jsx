import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInvestments, fetchInvestmentPlans } from '@/modules/investments/state/investmentSlice';
import { fetchBalance } from '@/modules/wallets/state/walletSlice';
import { getCookie } from '@/utils/cookieUtils';

import { BsArrowRight } from 'react-icons/bs';
import { ReactComponent as InvestmentIcon } from '@/assets/icons/investment.svg';
import { ReactComponent as EyeOpen } from '@/assets/icons/eye-open.svg';
import { ReactComponent as EyeClose } from '@/assets/icons/eye-close.svg';

import FundOptionsModal from '@/modules/investments/components/fundOptionsModal';
import InvestmentSkeletonCard from '../components/investmentSkeletonCard';
import NoContent from '@/components/NoContent';
import { Loader } from 'lucide-react';

const Investment = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);
    const {
        investments: investments,
        investment_plans: investment_plans,
        loading: loading, error: error
    } = useSelector((state) => state.investment);
    const { balance: balance, loading: balance_loading, error: balance_error } = useSelector((state) => state.wallet);

    useEffect(() => {
        if (!loading) {
            dispatch(fetchBalance(user?._id));
            dispatch(fetchInvestments(user?._id));
            dispatch(fetchInvestmentPlans());
        }
    }, [dispatch]);

    const [isOpen, setIsOpen] = useState(false);
    const [statsView, setStatsView] = useState(true);

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
                            <p className="text-xl md:text-[32px] font-semibold">
                                {statsView ? (
                                    balance_loading ? (
                                        <Loader rotate={360} className='w-8 h-8 md:w-12 md:h-12 animate-spin mx-auto' />
                                    ) : (
                                        // Add an explicit check if balance?.available_balance is NOT a number
                                        typeof balance?.available_balance === 'number'
                                            ? '₦' + (balance.available_balance ?? 0.00).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })
                                            : '₦0.00' // Or '₦...' or another temporary placeholder
                                    )
                                ) : (
                                    '*************'
                                )}
                            </p>
                            {balance_loading ? null : statsView ?
                                <EyeClose
                                    onClick={() => setStatsView(!statsView)}
                                    className="text-secondary cursor-pointer"
                                /> :
                                <EyeOpen
                                    onClick={() => setStatsView(!statsView)}
                                    className="text-secondary cursor-pointer"
                                />
                            }
                        </div>
                        <button
                            onClick={() => setIsOpen(true)}
                            className='block md:hidden h-8 px-4 text-sm rounded-md bg-secondary cursor-pointer'
                            disabled={balance_loading}
                        >
                            Fund wallet
                        </button>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className='hidden md:block h-8 px-2 text-sm rounded-md bg-secondary cursor-pointer'
                        disabled={balance_loading}
                    >
                        Fund wallet
                    </button>
                </div>
                <div className="flex justify-between bg-light p-2 px-3 md:p-4 rounded-lg md:rounded-xl border border-gray">
                    <div className='w-full md:w-10/12 flex md:flex-col items-center md:items-start justify-between'>
                        <p className="hidden md:block text-base text-secondary md:mb-2 font-light">Investment count</p>
                        <p className="md:my-3 text-base md:text-2xl font-semibold">
                            {investments?.length?.toLocaleString()}
                            <span className='ml-1 text-sm text-secondary font-light'>
                                {investments?.length === 1 ? ' investment' : ' investments'}
                            </span>
                        </p>

                        <Link to={'/investment/all'} className='flex items-center gap-2 text-sm'>
                            <span className='hidden md:inline-block font-medium'>View my investments</span>
                            <span className='block md:hidden font-medium'>View</span>
                            <BsArrowRight className='w-4 h-4 text-secondary' />
                        </Link>
                    </div>
                    <div className='w-[40px] h-[40px] hidden md:flex items-center justify-center bg-white border border-gray rounded-full'>
                        <InvestmentIcon className="" />
                    </div>
                </div>
            </div>

            <div className="mt-6 md:mt-0">
                <h2 className="text-base md:text-xl font-medium">Available Investment</h2>
                {investment_plans.length === 0 ?
                    <NoContent
                        icon="investment"
                        title="No Investment Plans Available"
                        description="There are currently no investment plans available. Please check back later or contact support for more information."
                    /> :
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-2'>
                        {loading ? (
                            // Render 6 skeleton cards when loading is true
                            Array.from({ length: 6 }).map((_, index) => (
                                <InvestmentSkeletonCard key={index} />
                            ))
                        ) : (investment_plans.map((item, index) => {
                            const duration = parseInt(item?.duration[0].split(' ')[0]) / 30
                            return (
                                <div key={index} className='p-3 md:p-5 bg-light md:bg-white text-sm border border-gray rounded-xl'>
                                    <p className='text-xs text-secondary'>Investment Duration</p>
                                    <p className='text-xl font-medium space-x-1'>
                                        <span>{item?.duration[0]}</span>
                                        <span className='text-sm text-secondary font-light'>
                                            ({duration + ` month${duration > 1 ? 's' : ''}`})
                                        </span>
                                    </p>

                                    <div className='flex gap-10 my-4'>
                                        <div className='space-y-1 text-xs'>
                                            <p className='text-secondary'>Investment starts at</p>
                                            <p className='text-base font-medium'>₦{item?.minAmount?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}</p>
                                        </div>
                                        <div className='space-y-1 text-xs'>
                                            <p className='text-secondary'>Interest starts at</p>
                                            <p className='text-base font-medium'>{item?.interestRate}%</p>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/investment/make-investment/${item?.id}`}
                                        className="inline-flex items-center justify-center gap-3 px-4 h-8 bg-primary text-sm font-medium rounded-md cursor-pointer hover:bg-primary/90 transition">
                                        <span>Invest</span>
                                        <BsArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )
                        }))}
                    </div>
                }
            </div>
        </div>
    );
};

export default Investment;
