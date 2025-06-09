import React, { useState } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
// import { ActionDialog } from '@/components/ActionDialog';
import BackButton from '@/components/BackButton';

import { ReactComponent as Dot } from '@/assets/icons/dot.svg';
import { ReactComponent as Filter } from '@/assets/icons/filter.svg';
import { MoreVertical } from 'lucide-react';
import { IoIosSearch } from 'react-icons/io';

import LoanCard from "@/modules/loans/components/LoanCard";
import { useNavigate } from 'react-router-dom';

const LoanApplications = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(null);
    const [selectedInvestments, setSelectedInvestments] = useState([]);
    const [investments, setInvestments] = useState([
        {
            id: '00001',
            amount: 10000.89,
            type: 'Employee',
            purpose: 'Equipment purchase',
            status: "successful"
        },
        {
            id: '00002',
            amount: 10000.89,
            type: 'Business',
            purpose: 'Marketing',
            status: "pending"
        },
        {
            id: '00003',
            amount: 10000.89,
            type: 'Asset finance',
            purpose: 'Marketing',
            status: "pre-approved"
        },
        {
            id: '00001',
            amount: 10000.89,
            type: 'Employee',
            purpose: 'Asset acquisition',
            status: "successful"
        },
        {
            id: '00002',
            amount: 10000.89,
            type: 'Business',
            purpose: 'Marketing',
            status: "successful"
        },
    ]);

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedInvestments(investments.map(investment => investment.id));
        } else {
            setSelectedInvestments([]);
        }
    };

    const handleSelectInvestment = (investmentId, checked) => {
        if (checked) {
            setSelectedInvestments([...selectedInvestments, investmentId]);
        } else {
            setSelectedInvestments(selectedInvestments.filter(id => id !== investmentId));
        }
    };

    const isAllSelected = investments.length > 0 && selectedInvestments.length === investments.length;

    return (
        <div className="space-y-5">
            <BackButton />

            {/* DESKTOP ::::  Loan Application Table */}
            <div className="hidden md:block w-full overflow-x-auto border border-[#E4E7EC] rounded-lg">
                <div className="flex items-center justify-between px-5 py-2">
                    <h2 className="md:text-[20px] font-medium text-[#475367]">Loan Applications</h2>
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
                <Table className="w-full">
                    <TableHeader className="bg-gray-50">
                        <TableRow className="border-b border-gray-100">
                            <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={e => handleSelectAll(e.target.checked)}
                                    className="h-4 w-4 rounded border border-gray-300 accent-[#64748B]"
                                />
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                Amount
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                Type
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                Purpose
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                Date & Time
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                Status
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-xs font-normal"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {investments.map(investment => (
                            <TableRow key={investment.id} className="text-sm font-light border-b border-gray-100 last:border-b-0">
                                <TableCell className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedInvestments.includes(investment.id)}
                                        onChange={e => handleSelectInvestment(investment.id, e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 accent-[#64748B]"
                                    />
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    ₦{investment.amount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <span className="px-3 py-1 text-xs font-normal rounded-full bg-gray-100 text-gray-600">
                                        {investment.type}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-4">{investment.type}</TableCell>
                                <TableCell className="px-6 py-4">
                                    ₦
                                    {investment.amount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 text-xs font-normal capitalize rounded-full
                                                ${investment.status === 'successful' ? 'bg-success' :
                                                investment.status === 'pre-approved' ? 'bg-neutral' :
                                                    investment.status === 'pending' ? 'bg-warning' :
                                                        'bg-danger'
                                            }`}
                                    >
                                        {investment.status}
                                    </span>
                                </TableCell>
                                <TableCell className="px-6 py-4 relative">
                                    <button
                                        className="border border-gray-200 p-1 rounded-lg w-8 h-8 flex items-center justify-center"
                                        onClick={() =>
                                            setShowDropdown(showDropdown === investment.id ? null : investment.id)
                                        }>
                                        <Dot className="" />
                                    </button>
                                    {showDropdown === investment.id && (
                                        <div className="absolute right-0 mt-1 p-2 z-10 w-48 bg-white rounded-md shadow-md border border-gray-200 cursor-pointer">
                                            <span className='cursor-pointer'>View details</span>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* MOBILE ::::  Loan Application Table */}
            <div className='md:hidden space-y-4'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Loan Applications</p>
                    <div className="border border-gray-200 p-1 rounded-lg w-8 h-8 flex items-center justify-center">
                        <Filter className="" />
                    </div>
                </div>

                <div className='space-y-2' id='mobile_transaction_card'>
                    {investments.map((loan, index) => (
                        <div key={index} onClick={()=> navigate(`/loans/applications/${index}`)}>
                            <LoanCard loan={loan} />
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoanApplications;
