import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from '@/utils/cookieUtils';
import { fetchUserProfile } from '@/modules/auth/state/authSlice';
import { fetchDashboardStats } from '@/modules/dashboard/state/dashboardStatsSlice';
import { fetchTransactions } from '@/modules/wallets/state/walletSlice';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import { HiOutlineBuildingOffice2 } from "react-icons/hi2";
import { IoIosArrowRoundForward, IoMdArrowDown, IoMdArrowUp } from "react-icons/io";

import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Divider } from '@/assets/icons/divider.svg';
import { ReactComponent as EyeOpen } from '@/assets/icons/eye-open.svg';
import { ReactComponent as EyeClose } from '@/assets/icons/eye-close.svg';

import TransactionCard from '@/modules/fx_transactions/components/TransactionCard';
import NoContent from '@/components/NoContent';
import { formatDateTime } from '@/utils/datetimeFormats';
import TransactionSkeletonTable from '../components/TransactionSkeletonTable';
import TransactionSkeletonCard from '../components/TransactionSkeletonCard';
import { getTransactionType } from '@/utils/genericFunc';

const KYCBanner = {
    pending: {
        title: "KYC Verification",
        short_description: "You’ll be notified as changes happen",
        description: "Your KYC Verification is in progress and you would be notified as changes happen.",
        buttonText: "Under review",
        bg: "bg-[#FEF6E7]",
        border: "border-[#DD900D]",
        text: "text-[#DD900D]",
    },
    failed: {
        title: "KYC Verification Required",
        short_description: "Click here to verify your business",
        description:
            "We need to verify your documents and details to enjoy the features on FirstLane like finance investments, \
        loans and FX transactions. After successful verification, you would not have to upload any document again.",
        buttonText: "Verify now",
        bg: "bg-[#FBEAEA]",
        border: "border-[#CB1A14]",
        text: "text-[#CB1A14]",
    }
};

const LIMIT = 10;

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(getCookie('user') || null);

    const { stats: stats, loading: stats_loading, error: stats_error } = useSelector((state) => state.dashboard_stats);
    const { userProfile: userProfile, loading: loading, error: error } = useSelector((state) => state.auth);
    const {
        transactions: transactions,
        metaData: metaData,
        transaction_loading: wallet_loading,
        transaction_error: wallet_error
    } = useSelector((state) => state.wallet);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchUserProfile());
            dispatch(fetchDashboardStats(user?._id));
            dispatch(fetchTransactions({
                userID: user?._id,
                page: 1,
                limit: LIMIT,
            }))
        }
    }, [dispatch]);

    const cardData = [
        {
            key: 'loan',
            label: 'Loan balance',
            value: stats?.loanBalance || 0.00,
            icon: <Loan />,
            direction: stats?.monthlyChanges?.loanBalance <= 0 ? 'down' : 'up',
            percentage: stats?.monthlyChanges?.loanBalance,
            color: stats?.monthlyChanges?.loanBalance <= 0 ? 'text-red-500' : 'text-green-500',
        },
        {
            key: 'investment',
            label: 'Investment balance',
            value: stats?.investmentBalance || 0.00,
            icon: <Investment />,
            direction: stats?.monthlyChanges?.investmentBalance <= 0 ? 'down' : 'up',
            percentage: stats?.monthlyChanges?.investmentBalance,
            color: stats?.monthlyChanges?.investmentBalance <= 0 ? 'text-red-500' : 'text-green-500',
        },
        {
            key: 'interest',
            label: 'Accrued interest',
            value: stats?.accruedInterest || 0.00,
            icon: <Divider />,
            direction: stats?.monthlyChanges?.accruedInterest <= 0 ? 'down' : 'up',
            percentage: stats?.monthlyChanges?.accruedInterest,
            color: stats?.monthlyChanges?.accruedInterest <= 0 ? 'text-red-500' : 'text-green-500',
        },
    ];

    const [showKYC, setShowKYC] = useState(false);
    const [kycStatus, setKycStatus] = useState('failed');
    useEffect(() => {
        if (userProfile && userProfile?.verifications?.status === 'verified') {
            setKycStatus('pending');
            setShowKYC(false);
        } else if (!userProfile?.verifications) {
            setKycStatus('failed');
            setShowKYC(true);
        } else if (userProfile && userProfile?.verifications?.status === 'pending') {
            setKycStatus('pending');
            setShowKYC(true);
        } else if (userProfile && userProfile?.verifications?.status === 'failed') {
            setKycStatus('failed');
            setShowKYC(true);
        };
    }, [userProfile]);

    const [statsView, setStatsView] = useState({
        loan: true,
        investment: true,
        interest: true
    });
    const toggleStatsView = (stat) => {
        setStatsView(prev => ({
            ...prev,
            [stat]: !prev[stat]
        }));
    };

    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        const scrollLeft = container.scrollLeft;
        const cardWidth = container.firstChild?.clientWidth || 1;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(index);
    };

    // Optional: update active index if window resizes and scroll position changes
    useEffect(() => {
        handleScroll();
    }, []);

    return (
        <div className="relative space-y-4 md:space-y-6">
            <div className='flex flex-col lg:flex-row md:items-center justify-between'>
                <div>
                    <h2 className="text-xl md:text-[28px] font-bold">Welcome back, {userProfile?.firstname || 'Guest'}</h2>
                    <p className="text-sm text-gray-500 my-1 font-light">Track, manage and invest your finances properly 💰</p>
                </div>
                <div className='hidden md:flex items-center gap-3 text-sm font-medium'>
                    <Link to={'/loans'}>
                        <button className='w-28 h-8 rounded-lg border border-gray cursor-pointer'>
                            Apply for Loan
                        </button>
                    </Link>
                    <Link to={'/investment'}>
                        <button className='w-16 h-8 rounded-lg bg-primary cursor-pointer'>
                            Invest
                        </button>
                    </Link>
                </div>
            </div>

            {/* KYC Verification Banner */}
            {!loading && showKYC &&
                <div className={`flex flex-col lg:flex-row justify-between ${KYCBanner[kycStatus].bg} border md:border-[1.5px] ${KYCBanner[kycStatus].border} p-4 rounded-xl`}>
                    <div className='w-full flex flex-row gap-3'>
                        <div className={`w-10 h-10 flex items-center justify-center bg-white border ${KYCBanner[kycStatus].border} rounded-full`}>
                            <HiOutlineBuildingOffice2 className={`w-5 h-5 ${KYCBanner[kycStatus].text}`} />
                        </div>
                        <div className='w-10/12 text-black leading-relaxed'>
                            <p className="text-sm md:text-base font-medium">{KYCBanner[kycStatus].title}</p>
                            {
                            // kycStatus === 'failed' ?
                                <div onClick={() => navigate('/kyc-verification')} className='md:hidden flex items-center gap-3'>
                                    <p className='text-xs font-light'>{KYCBanner[kycStatus].short_description}</p>
                                    <IoIosArrowRoundForward className="w-5 h-5 text-gray-500" />
                                </div>
                                // : <p className='md:hidden text-xs font-light'>{KYCBanner[kycStatus].short_description}</p>
                            }
                            <p className="hidden md:block text-sm text-[#667085] text-wrap font-light leading-relaxed">
                                {KYCBanner[kycStatus].description}
                            </p>
                        </div>
                    </div>
                    <div className='hidden md:w-36 md:flex md:justify-end'>
                        <button
                            onClick={() => navigate('/kyc-verification')}
                            className="h-8 px-4 text-sm font-medium bg-white border border-gray-200 rounded-lg cursor-pointer"
                            disabled={userProfile?.verifications?.isKycComplete}
                        >
                            {KYCBanner[kycStatus].buttonText}
                        </button>
                    </div>
                </div>
            }

            {/* Stat Cards */}
            <div className="relative hide-scrollbar">
                {/* Scrollable wrapper */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex md:flex-wrap md:justify-between gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth hide-scrollbar px-2 md:px-0"
                >
                    {cardData.map((card, index) => (
                        <div
                            key={card.key}
                            className="min-w-[85%] md:min-w-0 md:flex-1 snap-start flex justify-between bg-light md:h-[149px] p-5 rounded-xl border border-gray"
                        >
                            <div>
                                <p className="text-sm md:text-base text-secondary mb-2 font-light">{card.label}</p>
                                <div className="flex items-center gap-5 justify-between my-2">
                                    <p className="text-[20px] md:text-[28px] font-bold">
                                        {statsView[card.key]
                                            ? '₦' +
                                            card.value.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })
                                            : '*************'}
                                    </p>
                                    {statsView[card.key] ?
                                        <EyeClose
                                            onClick={() => toggleStatsView(card.key)}
                                            className="text-secondary cursor-pointer"
                                        /> :
                                        <EyeOpen
                                            onClick={() => toggleStatsView(card.key)}
                                            className="text-secondary cursor-pointer"
                                        />}
                                </div>
                                <div className={`flex items-center gap-1 text-sm ${card.color}`}>
                                    {card.direction === 'up' ? (
                                        <IoMdArrowUp className="w-4 h-4" />
                                    ) : (
                                        <IoMdArrowDown className="w-4 h-4" />
                                    )}
                                    <span>{card.percentage}%</span>
                                    <span className="text-[#667085]">vs last month</span>
                                </div>
                            </div>
                            <div className="w-[40px] h-[40px] hidden md:flex items-center justify-center bg-white border border-gray rounded-full">
                                {card.icon}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Indicators (Mobile only) */}
                <div className="flex justify-center mt-3 md:hidden">
                    {cardData.map((_, index) => (
                        <div
                            key={index}
                            className={`h-2 rounded-full mx-1 transition-all duration-300 ${index === activeIndex ? 'w-5 bg-[#98A2B3]' : 'w-2 bg-[#E4E7EC]'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* DESKTOP :::: Recent Transactions Table */}
            <div className="hidden md:block w-full rounded-lg border border-gray-200 bg-white">
                <div className="">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-[20px] font-medium text-tertiary">Transactions</h2>
                    </div>

                    {(wallet_loading || transactions?.length) > 0 ?
                        <div className="overflow-x-auto text-secondary">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-light border-b border-gray-200">
                                        <TableHead className="w-12 p-4">
                                            <Checkbox />
                                        </TableHead>
                                        <TableHead className="w-[25%] font-medium text-xs">Name</TableHead>
                                        <TableHead className="font-medium text-xs">Amount</TableHead>
                                        <TableHead className="font-medium text-xs">Payment type</TableHead>
                                        <TableHead className="font-medium text-xs">Date & time</TableHead>
                                        <TableHead className="font-medium text-xs">Status</TableHead>
                                        <TableHead className="w-12"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className='text-sm text-secondary font-light'>
                                    {wallet_loading ? (
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <TransactionSkeletonTable key={index} />
                                        ))
                                    ) : transactions.map((transaction) => (
                                        <TableRow key={transaction?._id} className="border-b border-gray">
                                            <TableCell className="p-4">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                                                        <img
                                                            src={userProfile?.profileImage}
                                                            alt="User avatar"
                                                            className="w-full h-full object-cover"
                                                            crossOrigin='anonymous'
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{userProfile?.fullname || 'N/A'}</p>
                                                        <p className="text-sm text-gray-500">{userProfile?.email || 'N/A'}</p>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-gray-800">
                                                ₦{transaction?.amount?.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                <span className="px-3 py-1 text-xs font-normal rounded-full bg-gray-100 text-gray-600">
                                                    {getTransactionType(transaction?.type, transaction?.remarks)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-gray-800">{formatDateTime(transaction?.date)}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 text-xs font-normal capitalize rounded-full
                                                ${true ? 'bg-success' :
                                                            transaction?.status === 'pending' ? 'bg-warning' :
                                                                'bg-danger'
                                                        }`}
                                                >
                                                    {/* {transaction?.status || 'N/A'} */}
                                                    successful
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {/* <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                                                <MoreVertical className="h-4 w-4" />
                                            </Button> */}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div> : (
                            <NoContent
                                icon="wallets"
                                title="No wallet transactions found"
                                description="We couldn't find any wallet transactions to display at the moment."
                                className="hidden md:flex"
                            />
                        )
                    }
                </div>
            </div>

            {/* MOBILE :::: Recent Transactions Table */}
            <div className='md:hidden space-y-4'>
                <p className='text-base font-medium'>Transactions</p>

                {(wallet_loading || transactions?.length) > 0 ? (
                    <div className='space-y-2' id='mobile_transaction_card'>
                        {wallet_loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <TransactionSkeletonCard key={index} />
                            ))
                        ) : transactions.map((transaction, index) => (
                            <div key={index} onClick={() => navigate(`/wallets/all/${transaction?.reference}`)}>
                                <TransactionCard userProfile={userProfile} transaction={transaction} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <NoContent
                        icon="wallets"
                        title="No wallet transactions found"
                        description="We couldn't find any wallet transactions to display at the moment."
                    />

                )}
            </div>
        </div>
    );
};

export default Dashboard;
