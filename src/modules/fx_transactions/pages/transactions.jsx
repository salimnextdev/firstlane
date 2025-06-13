import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IoIosSearch } from 'react-icons/io';
import { BsArrowRight } from 'react-icons/bs';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from '@/components/ui/checkbox';

import ConfirmModal from '@/modules/fx_transactions/components/confirmTransaction';
import CountrySelect from '@/components/FormInputs/CountrySelect';
import { ReactComponent as Dot } from '@/assets/icons/dot.svg';

import TableFilter from '@/components/TableFilter';

const data = [
    [
        "1USD", 1600.03
    ],
    [
        "1EUR", 1800.05
    ],
    [
        "1GBP", 2000.03
    ],
    [
        "1CAD", 1500.03
    ],
    [
        "1KWD", 5200.03
    ],
    [
        "1CHF", 1900.03
    ],
]

const options = [
    { value: "all", label: "All" },
    { value: "new", label: "New" },
    { value: "approved", label: "Approved" },
    { value: "rejected", label: "Rejected" },
];

const FXTransactions = () => {
    const navigate = useNavigate();
    const [option, setOption] = useState('Buy');
    const [isOpen, setIsOpen] = useState(false);
    const [currency, setCurrency] = useState('USD');

    const [filters, setFilters] = useState({
        statuses: [],
        currencyPairs: [],
    });

    const filterOptions = {
        statuses: ['Successful', 'Pending', 'Failed'],
        currencyPairs: ['USD/EUR', 'GBP/USD', 'JPY/CAD'],
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            statuses: [],
            currencyPairs: [],
        });
    };

    return (
        <div className="relative space-y-3 md:space-y-6">
            <ConfirmModal
                isOpen={isOpen}
                onClose={setIsOpen}
                type={option}
                data={{
                    acc_number: "0123456789",
                    acc_name: "Firstlane Multi Investment LTD",
                    bank_name: "City Morgage Bank",
                    type: "Checking",
                    wire: "567890",
                    ach: "012345",
                }}
            />
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-2'>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold">FXTransactions</h2>
                    <p className="text-sm text-gray-500 my-1 font-light">Track and manage your FX transactions safely 💰</p>
                </div>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={() => setOption('Buy')}
                        className={`w-16 h-9 ${option === 'Buy' ? 'bg-[#D8D9EA] text-primary' : 'border border-[#E4E7EC]'} text-sm rounded-md cursor-pointer`}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setOption('Sell')}
                        className={`w-16 h-9 ${option === 'Sell' ? 'bg-[#D8D9EA] text-primary' : 'border border-[#E4E7EC]'} text-sm rounded-md cursor-pointer`}
                    >
                        Sell
                    </button>
                </div>
            </div>

            <div className='space-y-3'>
                {/* Stat Cards */}
                <div className='space-y-2 md:space-y-3'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className='p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                            <p className="text-sm text-secondary">{option === 'Buy' ? 'You buy' : 'You sell'}</p>
                            <div className='flex items-center justify-between'>
                                <p className="text-2xl md:text-[28px] font-semibold text-secondary">
                                    <span className='mr-1 text-black'>₦</span>
                                    {1600.03.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                <div className='w-[82px] h-[40px] flex items-center justify-between px-2 bg-[#F0F2F5] rounded-3xl cursor-pointer'>
                                    <img
                                        src={`https://flagcdn.com/w40/${'ng'}.png`}
                                        alt={'ng'}
                                        className="w-[24px] h-[24px] rounded-full object-center"
                                    />
                                    <span className="text-sm font-medium">NGN</span>
                                </div>
                            </div>
                        </div>
                        <div className='p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                            <p className="text-sm text-secondary">{option === 'Buy' ? 'By selling' : 'To buy'}</p>
                            <div className='flex items-center justify-between'>
                                <p className="text-2xl md:text-[28px] font-semibold text-secondary">
                                    <span className='mr-1 text-black'>$</span>
                                    {1.00.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                <CountrySelect value={currency} onChange={(c) => setCurrency(c.code)} />
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className='w-full md:w-20 h-11 md:h-9 bg-primary text-sm rounded-md cursor-pointer'
                    >
                        {option} Naira
                    </button>
                </div>

                <div className='px-5 py-3 space-y-3 bg-[#F0F2F5] border border-[#E4E7EC] rounded-xl'>
                    <p className='text-sm text-secondary font-light'>Current exchange rates</p>
                    <div className='flex items-center gap-2 md:gap-10 font-medium overflow-auto'>
                        {data.map((item, index) => (
                            <div key={index} className='w-full flex items-center gap-2'>
                                <p>{item[0]}</p>
                                <span>~</span>
                                <p>{item[1].toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}</p>
                                <span className='md:hidden text-[#D0D5DD]'>|</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Link to={'/fx-transactions/all'} className='md:hidden flex items-center gap-2 text-sm bg-[#F9FAFB] p-2 px-3 rounded-lg border border-[#E4E7EC]'>
                <span className='font-medium'>View all FX Transactions</span>
                <BsArrowRight className='w-4 h-4 text-secondary' />
            </Link>

            {/* Recent Transactions Table */}
            <div className="hidden md:block w-full rounded-lg border border-[#E4E7EC] bg-white">
                <div className="">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-nowrap text-xl font-medium text-[#475367]">Recent FX Transactions</h2>
                        <div className="w-full flex items-center justify-end gap-2">
                            <div className="w-4/12 relative">
                                <IoIosSearch className="w-5 h-5 absolute top-2 left-3 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-full h-[40px] pl-10 pr-4 rounded-md border border-[#E4E7EC] text-sm focus:outline-gray-200"
                                />
                            </div>

                            <TableFilter
                                filterOptions={filterOptions}
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto text-secondary">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#F9FAFB] border-b border-[#E4E7EC]">
                                    <TableHead className="w-12 p-4">
                                        <Checkbox className="!accent-[#3E4095]" />
                                    </TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Sell amount</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Buy amount</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Currency pair</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Exchange rate</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Date & time</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='text-sm text-secondary'>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id} className="text-sm border-b border-gray-100">
                                        <TableCell className="p-4">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="font-light">NGN{transaction.sent_amount}</TableCell>
                                        <TableCell className="font-light">${transaction.buy_amount}</TableCell>
                                        <TableCell className="font-light">{transaction.currency_pair}</TableCell>
                                        <TableCell className="font-light">{transaction.exchange_rate}</TableCell>
                                        <TableCell className="font-light">{transaction.dateTime}</TableCell>
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
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FXTransactions;

const transactions = [
    {
        id: 1,
        sent_amount: "10,000.00",
        buy_amount: "100",
        currency_pair: "USD/NGN",
        exchange_rate: "$1/₦1,600.00",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    },
    {
        id: 2,
        sent_amount: "10,000.00",
        buy_amount: "100",
        currency_pair: "USD/NGN",
        exchange_rate: "$1/₦1,600.00",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    },
    {
        id: 3,
        sent_amount: "10,000.00",
        buy_amount: "100",
        currency_pair: "USD/NGN",
        exchange_rate: "$1/₦1,600.00",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    },
    {
        id: 4,
        sent_amount: "10,000.00",
        buy_amount: "100",
        currency_pair: "USD/NGN",
        exchange_rate: "$1/₦1,600.00",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "failed"
    },
    {
        id: 5,
        sent_amount: "10,000.00",
        buy_amount: "100",
        currency_pair: "USD/NGN",
        exchange_rate: "$1/₦1,600.00",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    }
];