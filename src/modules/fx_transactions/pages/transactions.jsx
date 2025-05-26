import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { IoIosSearch } from 'react-icons/io';
import { RiEyeCloseLine } from "react-icons/ri";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import ConfirmModal from '@/modules/fx_transactions/components/confirmTransaction';
import SuccessModal from '@/modules/fx_transactions/components/successModal';
import AccountFormModal from '@/modules/fx_transactions/components/accountFormModal';
import SelectInput from '@/components/FormInputs/SelectInput';
import CountrySelect from '@/components/FormInputs/CountrySelect';
import FilterDropdown from '@/components/FormInputs/filterDropdown';
import { MoreVertical } from 'lucide-react';
import TableDropdown from '@/components/FormInputs/tableDropdown';

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
    const [filter, setFilter] = useState('');
    const [currency, setCurrency] = useState('USD');

    const handleFilterSelect = (value) => {
        setFilter(value)
    };

    return (
        <div className="relative space-y-8">
            <AccountFormModal
                isOpen={isOpen}
                onClose={setIsOpen}
            />
            {/* <SuccessModal
                isOpen={isOpen}
                onClose={setIsOpen}
            /> */}
            {/* <ConfirmModal
                isOpen={isOpen}
                onClose={setIsOpen}
                data={{
                    acc_number: "0123456789",
                    acc_name: "Firstlane Multi Investment LTD",
                    bank_name: "Paystack Titan",
                }}
            /> */}
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className="text-2xl font-semibold">FXTransactions</h2>
                    <p className="text-sm text-gray-500 my-1">Track and manage your FX transactions safely 💰</p>
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
                <div className='space-y-3'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className='p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                            <p className="text-sm text-secondary">{option === 'Buy' ? 'You buy' : 'You sell'}</p>
                            <div className='flex items-center justify-between'>
                                <p className="text-2xl font-semibold text-secondary">
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
                                <p className="text-2xl font-semibold text-secondary">
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
                        onClick={() => navigate('/fx-transactions')}
                        className='w-20 h-9 bg-primary text-sm rounded-md cursor-pointer'
                    >
                        {option} Naira
                    </button>
                </div>

                <div className='px-5 py-3 space-y-3 bg-[#F0F2F5] border border-[#E4E7EC] rounded-xl'>
                    <p className='text-sm text-secondary'>Current exchange rates</p>
                    <div className='flex items-center gap-10 font-medium'>
                        {data.map((item, index) => (
                            <span key={index}>{item[0]} ~ {item[1].toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="w-full rounded-lg border border-[#E4E7EC] bg-white">
                <div className="">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="w-full text-[20px] font-medium text-[#475367]">Recent FX Transactions</h2>
                        <div className="w-8/12 flex items-center justify-between space-x-2">
                            <div className="relative w-full">
                                <IoIosSearch className="w-5 h-5 absolute top-2 left-3 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-full h-[40px] pl-10 pr-4 rounded-md border border-[#E4E7EC] text-sm focus:outline-gray-200"
                                />
                            </div>
                            <FilterDropdown options={options} value={filter} onSelect={handleFilterSelect} />
                        </div>
                    </div>

                    <div className="overflow-x-auto text-secondary">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#F9FAFB] border-b border-[#E4E7EC]">
                                    <TableHead className="w-12 p-4">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Sent amount</TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Received amount</TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Date & time</TableHead>
                                    <TableHead className="font-medium text-sm text-gray-600">Status</TableHead>
                                    <TableHead className=""></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='text-sm text-secondary'>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id} className="border-b border-gray-100">
                                        <TableCell className="p-4">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell className="text-gray-800">{transaction.sent_amount}</TableCell>
                                        <TableCell className="text-gray-800">{transaction.amount}</TableCell>
                                        <TableCell className="text-gray-600">{transaction.dateTime}</TableCell>
                                        <TableCell>
                                            <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
                                                {transaction.status}
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            {/* <p className="w-[32px] h-[32px] flex items-center justify-center p-2 border border-[#E4E7EC] rounded-lg cursor-pointer">
                                                <MoreVertical />
                                            </p> */}
                                            <TableDropdown options={options} onSelect={handleFilterSelect} />
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
        sent_amount: "₦10,000.00",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 2,
        sent_amount: "₦10,000.00",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 3,
        sent_amount: "₦10,000.00",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 4,
        sent_amount: "₦10,000.00",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 5,
        sent_amount: "₦10,000.00",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    }
];