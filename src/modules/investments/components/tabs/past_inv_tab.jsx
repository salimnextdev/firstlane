import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { BsArrowRight } from 'react-icons/bs';

import SendMoneyModal from '@/modules/wallets/components/sendWithdrawModal';
import NoContent from '@/components/NoContent';
import InvestmentSkeletonCard from '../investmentSkeletonCard';
import { calculateDurationDetails } from '@/utils/datetimeFormats';

const PastInvestmentTab = ({ data }) => {
    const { investments: investments, loading: loading, error: error } = useSelector((state) => state.investment);
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
                {data.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mt-2'>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <InvestmentSkeletonCard key={index} plan={false} />
                            ))
                        ) : data.map((item, index) => {
                            const investmentProfit = (item?.amount * (item?.investmentID?.interestRate || item?.interestRate)) / 100;
                            const investmentBalance = item?.amount + investmentProfit;
                            const duration = parseInt(item?.duration?.split(' ')?.[0] || item?.investmentID?.duration[0]?.split(' ')?.[0]);
                            const lowDuration = (duration / 30) < 1;
                            const readableDuration = lowDuration
                                ? 'less than 1 month'
                                : `${duration} month${duration >= 2 ? 's' : ''}`;

                            const daySoFar = calculateDurationDetails(item?.createdAt, duration)?.daysSoFar;

                            const investmentEarned = (investmentProfit * daySoFar) / duration || 0.00;
                            return (
                                <div key={index} className='p-5 bg-light md:bg-white text-sm border border-gray rounded-xl'>
                                    <p className='text-xs md:text-sm text-secondary'>Investment Duration</p>
                                    <p className='text-lg font-medium space-x-1'>
                                        <span>{item?.duration || item?.investmentID?.duration[0]}</span>
                                        <span className='text-sm text-secondary font-light'>
                                            ({readableDuration})
                                        </span>
                                    </p>

                                    <div className='flex gap-10 my-4'>
                                        <div className='space-y-1 text-xs md:text-sm'>
                                            <p className='text-secondary'>Investment amount</p>
                                            <p className='text-base font-medium'>₦{item?.amount?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            })}</p>
                                        </div>
                                        <div className='space-y-1 text-xs md:text-sm'>
                                            <p className='text-secondary'>Interest rate</p>
                                            <p className='text-base font-medium'>
                                                {item?.investmentID?.interestRate || item?.interestRate}%
                                            </p>
                                        </div>
                                    </div>

                                    <div className='flex gap-10 my-4'>
                                        <div className='space-y-1 text-xs md:text-sm'>
                                            <p className='text-secondary'>Investment balance</p>
                                            <p className='text-base font-medium'>
                                                ₦{investmentBalance?.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}</p>
                                        </div>
                                        <div className='space-y-1 text-xs md:text-sm'>
                                            <p className='text-secondary'>Investment earned</p>
                                            <p className='text-sm text-success font-medium'>
                                                ₦{item?.interestEarned?.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </p>
                                        </div>
                                    </div>

                                    {/* {item?.withdrawn ? */}
                                    {!item?.withdrawalDate ?
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
                            )
                        })}
                    </div>
                ) : (
                    <NoContent
                        icon="investment"
                        title="No past investments yet"
                        description="Once your investments are completed, they’ll be listed here for your records."
                    />
                )}
            </div>
        </div>
    );
};

export default PastInvestmentTab;
