import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { RiEyeCloseLine } from "react-icons/ri";
import { IoIosArrowRoundForward, IoIosSearch, IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { HiOutlineCash } from "react-icons/hi";
import { LuCircleDivide } from 'react-icons/lu';
import { BsDatabaseUp } from "react-icons/bs";

import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Divider } from '@/assets/icons/divider.svg';
import SelectInput from '@/components/FormInputs/SelectInput';
import TableFilter from '@/components/TableFilter';
import TransactionCard from '@/components/TransactionCard';

const cardData = [
    {
        key: 'loan',
        label: 'Loan balance',
        value: 1210000,
        icon: <Loan />,
        direction: 'down',
        percentage: 10,
        color: 'text-red-500',
    },
    {
        key: 'investment',
        label: 'Investment balance',
        value: 2420000,
        icon: <Investment />,
        direction: 'up',
        percentage: 10,
        color: 'text-green-500',
    },
    {
        key: 'interest',
        label: 'Accrued interest',
        value: 110000,
        icon: <Divider />,
        direction: 'up',
        percentage: 10,
        color: 'text-green-500',
    },
];

const transactions = [
    {
        id: 1,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Wallet funding",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    },
    {
        id: 2,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Money sent",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "pending"
    },
    {
        id: 3,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Loan",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    },
    {
        id: 4,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Loan",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    },
    {
        id: 5,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Investment",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "failed"
    }
];

const Dashboard = () => {
    const navigate = useNavigate();
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
                    <h2 className="text-base md:text-[28px] font-semibold">Welcome back, Olivia</h2>
                    <p className="text-sm text-gray-500 my-1">Track, manage and invest your finance properly 💰</p>
                </div>
                <div className='hidden md:flex items-center gap-3 text-sm font-medium'>
                    <Link to={'/loans'}>
                        <button className='w-28 h-8 rounded-xl border border-[#E4E7EC] cursor-pointer'>
                            Apply for Loan
                        </button>
                    </Link>
                    <Link to={'/investment'}>
                        <button className='w-16 h-8 rounded-xl bg-primary cursor-pointer'>
                            Invest
                        </button>
                    </Link>
                </div>
            </div>

            {/* KYC Verification Banner */}
            <div className="flex flex-col lg:flex-row justify-between bg-[#FBEAEA] border md:border-[1.5px] border-[#CB1A14] p-4 rounded-xl">
                <div className='flex flex-row gap-3'>
                    <div className='w-10 h-10 flex items-center justify-center bg-white border border-red-500 rounded-full'>
                        <HiOutlineBuildingOffice2 className="w-5 h-5 text-red-500" />
                    </div>
                    <div className='w-10/12 leading-relaxed'>
                        <p className="text-sm font-medium">KYC Verification Required</p>
                        <div onClick={() => navigate('/kyc-verification')} className='md:hidden flex items-center gap-3'>
                            <p className='text-xs'>Click here to verify your business</p>
                            <IoIosArrowRoundForward className="w-5 h-5 text-gray-500" />
                        </div>
                        <p className="hidden md:block text-sm text-[#667085] text-wrap leading-relaxed">
                            We need to verify your documents and details to enjoy the features on FirstLane like finance investments, loans and FX transactions.
                            After successful verification, you would not have to upload any document again.

                        </p>
                    </div>
                </div>
                <div className='hidden md:w-3/12 lg:w-3/12 md:flex md:justify-end'>
                    <button onClick={() => navigate('/kyc-verification')} className="h-8 px-4 text-sm font-medium bg-white border border-gray-200 rounded-lg cursor-pointer">
                        Verify Now
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="relative">
                {/* Scrollable wrapper */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex md:flex-wrap md:justify-between gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth hide-scrollbar px-2 md:px-0"
                >
                    {cardData.map((card, index) => (
                        <div
                            key={card.key}
                            className="min-w-[85%] md:min-w-0 md:flex-1 snap-start flex justify-between bg-[#F9FAFB] md:h-[149px] p-5 rounded-xl border border-[#E4E7EC]"
                        >
                            <div>
                                <p className="text-sm text-[#667085] mb-2">{card.label}</p>
                                <div className="flex items-center gap-5 justify-between my-2">
                                    <p className="text-xl md:text-2xl font-semibold">
                                        {statsView[card.key]
                                            ? '₦' +
                                            card.value.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })
                                            : '*************'}
                                    </p>
                                    <RiEyeCloseLine
                                        onClick={() => toggleStatsView(card.key)}
                                        className="w-6 h-6 text-[#98A2B3] cursor-pointer"
                                    />
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
                            <div className="w-[40px] h-[40px] hidden md:flex items-center justify-center bg-white border border-[#E4E7EC] rounded-full">
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
                            className={`h-2 rounded-full mx-1 transition-all duration-300 ${index === activeIndex ? 'w-4 bg-[#98A2B3]' : 'w-2 bg-[#E4E7EC]'
                                }`}
                        ></div>
                    ))}
                </div>
            </div>

            {/* DESKTOP :::: Recent Transactions Table */}
            <div className="hidden md:block w-full rounded-lg border border-gray-200 bg-white">
                <div className="">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-[20px] font-medium text-[#475367]">Transactions</h2>
                    </div>

                    <div className="overflow-x-auto text-secondary">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#F9FAFB] border-b border-gray-200">
                                    <TableHead className="w-12 p-4">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Name</TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Amount</TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Payment type</TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Date & time</TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Status</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='text-sm text-secondary'>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id} className="border-b border-gray-100">
                                        <TableCell className="p-4">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                                                    <img src="/api/placeholder/40/40" alt="User avatar" className="w-full h-full object-cover" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">{transaction.name}</p>
                                                    <p className="text-sm text-gray-500">{transaction.email}</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-800">{transaction.amount}</TableCell>
                                        <TableCell>
                                            <span className="px-3 py-1 text-xs font-normal rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600">
                                                {transaction.paymentType}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-gray-600">{transaction.dateTime}</TableCell>
                                        <TableCell>
                                            <span
                                                className={`px-3 py-1 text-xs font-normal capitalize rounded-full
                                                ${transaction.status === 'successful' ? 'bg-success' :
                                                        transaction.status === 'pending' ? 'bg-warning' :
                                                            'bg-danger'
                                                    }`}
                                            >
                                                {transaction.status}
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
                    </div>
                </div>
            </div>

            {/* MOBILE :::: Recent Transactions Table */}
            <div className='md:hidden space-y-4'>
                <p className='font-medium'>Transactions</p>

                <div className='space-y-2' id='mobile_transaction_card'>
                    {transactions.map((transaction, index) => (
                        <TransactionCard key={index} transaction={transaction} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
