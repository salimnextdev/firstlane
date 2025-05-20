import React from 'react';
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
import { IoIosSearch, IoMdArrowDown, IoMdArrowUp } from "react-icons/io";
import { HiOutlineCash } from "react-icons/hi";
import { LuCircleDivide } from 'react-icons/lu';
import { BsDatabaseUp } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Divider } from '@/assets/icons/divider.svg';

const transactions = [
    {
        id: 1,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 2,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 3,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 4,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    },
    {
        id: 5,
        name: "Emery Torff",
        email: "e.t@mail.com",
        amount: "₦10,000.00",
        paymentType: "Type",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "Type"
    }
];

const Dashboard = () => {
    const navigate = useNavigate();
    return (
        <div className="relative space-y-6">
            <div className='flex flex-col lg:flex-row items-center justify-between'>
                <div>
                    <h2 className="text-[28px] font-semibold">Welcome back, Olivia</h2>
                    <p className="text-xs text-gray-500 my-1">Track, manage and invest your finance properly 💰</p>
                </div>
                <div className='flex items-center gap-3 text-xs font-medium'>
                    <button className='w-28 h-8 rounded-md border border-[#E4E7EC] cursor-pointer'>
                        Apply for Loan
                    </button>
                    <button className='w-16 h-8 rounded-md bg-primary cursor-pointer'>
                        Invest
                    </button>
                </div>
            </div>

            {/* KYC Verification Banner */}
            <div className="flex flex-col lg:flex-row justify-between bg-[#FBEAEA] border-[1.5px] border-[#CB1A14] p-4 rounded-xl">
                <div className='flex flex-col lg:flex-row gap-3'>
                    <div className='w-10 h-10 flex items-center justify-center bg-white border border-red-500 rounded-full'>
                        <HiOutlineBuildingOffice2 className="w-5 h-5 text-red-500" />
                    </div>
                    <div className='w-11/12 leading-relaxed'>
                        <p className="text-sm font-medium">KYC Verification Required</p>
                        <p className="text-xs text-[#667085] text-wrap leading-relaxed">
                            We need to verify your documents and details to enjoy the features on FirstLane like finance investments, loans and FX transactions.
                            After successful verification, you would not have to upload any document again.

                        </p>
                    </div>
                </div>
                <div className='md:w-3/12 lg:w-3/12 flex md:justify-end'>
                    <button onClick={() => navigate('/kyc-verification')} className="h-8 px-4 text-xs font-medium bg-white border border-gray-200 rounded-lg cursor-pointer">
                        Verify Now
                    </button>
                </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* {[
                    { label: 'Loan balance', value: 1210000.00 },
                    { label: 'Investment balance', value: 2420000.00 },
                    { label: 'Accured interest', value: 110000.00 },
                ].map((item, index) => ( */}
                <div className="flex justify-between bg-[#F9FAFB] h-[149px] p-5 rounded-md border border-[#E4E7EC]">
                    <div className=''>
                        <p className="text-sm text-[#667085] mb-2">{'Loan balance'}</p>
                        <div className='flex items-center gap-5 justify-between my-2'>
                            <p className="text-2xl font-semibold">₦{1210000.00.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                            <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                        </div>

                        <div className='flex items-center gap-1 text-xs text-red-500'>
                            <IoMdArrowDown className='w-4 h-4' />
                            <span>10%</span>
                            <span className='text-[#667085]'>vs last month</span>
                        </div>
                    </div>
                    <div className='w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#E4E7EC] rounded-full'>
                        {/* <HiOutlineCash className="w-4 h-4" /> */}
                        <Loan className="" />
                    </div>
                </div>
                <div className="flex justify-between bg-[#F9FAFB] h-[149px] p-5 rounded-md border border-[#E4E7EC]">
                    <div className=''>
                        <p className="text-sm text-[#667085] mb-2">{'Investment balance'}</p>
                        <div className='flex items-center gap-5 justify-between my-2'>
                            <p className="text-2xl font-semibold">₦{2420000.00.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                            <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                        </div>

                        <div className='flex items-center gap-1 text-xs text-green-500'>
                            <IoMdArrowUp className='w-4 h-4' />
                            <span>10%</span>
                            <span className='text-[#667085]'>vs last month</span>
                        </div>
                    </div>
                    <div className='w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#E4E7EC] rounded-full'>
                        {/* <BsDatabaseUp className="w-4 h-4" /> */}
                        <Investment className="text-black" />
                    </div>
                </div>
                <div className="flex justify-between bg-[#F9FAFB] h-[149px] p-5 rounded-md border border-[#E4E7EC]">
                    <div className=''>
                        <p className="text-sm text-[#667085] mb-2">{'Accured interest'}</p>
                        <div className='flex items-center gap-5 justify-between my-2'>
                            <p className="text-2xl font-semibold">₦{110000.00.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                            <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                        </div>

                        <div className='flex items-center gap-1 text-xs text-green-500'>
                            <IoMdArrowUp className='w-4 h-4' />
                            <span>10%</span>
                            <span className='text-[#667085]'>vs last month</span>
                        </div>
                    </div>
                    <div className='w-[40px] h-[40px] flex items-center justify-center bg-white border border-[#E4E7EC] rounded-full'>
                        {/* <LuCircleDivide className="w-4 h-4" /> */}
                        <Divider className="" />
                    </div>
                </div>
                {/* ))} */}
            </div>

            {/* Recent Transactions Table */}
            <div className="w-full rounded-lg border border-gray-200 bg-white">
                <div className="">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-[20px] font-medium text-[#475367]">Transactions</h2>
                        <div className="flex items-center space-x-2">
                            <div className="relative w-full">
                                <IoIosSearch className="w-5 h-5 absolute top-2 left-3 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-full h-[40px] pl-10 pr-4 rounded-md border border-[#E4E7EC] text-sm focus:outline-gray-200"
                                />
                            </div>
                            {/* <Button
                                variant="outline"
                                className="flex items-center gap-2 h-9 px-4 border border-gray-200 rounded-lg"
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filter
                            </Button> */}
                        </div>
                    </div>

                    <div className="overflow-x-auto text-secondary">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-[#F9FAFB] border-b border-gray-200">
                                    <TableHead className="w-12 p-4">
                                        <Checkbox />
                                    </TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Name</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Amount</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Payment type</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Date & time</TableHead>
                                    <TableHead className="font-medium text-xs text-gray-600">Status</TableHead>
                                    <TableHead className="w-12"></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className='text-xs text-secondary'>
                                {transactions.map((transaction) => (
                                    <TableRow key={transaction.id} className="border-b border-gray-100">
                                        <TableCell className="p-4">
                                            <Checkbox />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center overflow-hidden">
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
                                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
                                                {transaction.paymentType}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-gray-600">{transaction.dateTime}</TableCell>
                                        <TableCell>
                                            <span className="px-3 py-1 text-xs rounded-full bg-gray-100 text-gray-600">
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
        </div>
    );
};

export default Dashboard;
