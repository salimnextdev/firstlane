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
import { MoreVertical } from 'lucide-react';
import { IoIosSearch } from 'react-icons/io';

const LoanApplications = () => {
    const [showDropdown, setShowDropdown] = useState(null);
    const [selectedInvestments, setSelectedInvestments] = useState([]);
    const [investments, setInvestments] = useState([
        {
            id: '00001',
            amount: 45231000.89,
            type: 'Employee',
            maturityDate: '09/02/25',
            interest: '3',
        },
        {
            id: '00002',
            amount: 45231000.89,
            type: 'Business',
            maturityDate: '09/05/25',
            interest: '90',
        },
        {
            id: '00003',
            amount: 45231000.89,
            type: 'Asset finance',
            maturityDate: '09/10/25',
            interest: '45',
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

            {/* Loan Application Table */}
            <div className="overflow-x-auto border border-[#E4E7EC] rounded-lg">
                <div className="flex items-center justify-between px-5 py-2">
                    <h2 className="text-base font-medium text-[#475367]">Loan Applications</h2>
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
                            <TableHead className="text-left px-6 py-3 text-sm font-light accent-[#64748B]">
                                <input
                                    type="checkbox"
                                    checked={isAllSelected}
                                    onChange={e => handleSelectAll(e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300"
                                />
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-sm font-light text-[#64748B]">
                                Amount
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-sm font-light text-[#64748B]">
                                Type
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-sm font-light text-[#64748B]">
                                Purpose
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-sm font-light text-[#64748B]">
                                Date & Time
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-sm font-light text-[#64748B]">
                                Status
                            </TableHead>
                            <TableHead className="text-left px-6 py-3 text-sm font-light text-[#64748B]"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="">
                        {investments.map(investment => (
                            <TableRow key={investment.id} className="text-sm border-b border-gray-100 last:border-b-0">
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
                                    <span className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-600">
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
                                    {investment.maturityDate}
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    {investment.interest} %
                                </TableCell>
                                <TableCell className="px-6 py-4 relative">
                                    <button
                                        className="border border-gray-200 p-1 rounded-lg w-8 h-8 flex items-center justify-center"
                                        onClick={() =>
                                            setShowDropdown(showDropdown === investment.id ? null : investment.id)
                                        }>
                                        <MoreVertical size={16} />
                                    </button>
                                    {showDropdown === investment.id && (
                                        <div className="absolute right-0 mt-1 z-10 w-48 bg-white rounded-md shadow-lg border border-gray-200">
                                            <div className="py-1">
                                                {/* <button
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => navigateToinvestmentDetails(investment.id)}>
                          View details
                        </button> */}

                                                {/* <ActionDialog
                          trigger={
                            <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                              Withdraw investment
                            </button>
                          }
                          title="Approve investment application"
                          description="Ensure you are certain about the decision you are making because this action is irreversible. Are you sure you want to approve this investment?"
                          confirmText="Yes, approve"
                          cancelText="No, cancel"
                          confirmVariant="primary"
                          onConfirm={() => handleApproveInvestment(investment.id)}
                          onCancel={() => navigateToinvestmentDetails(investment.id)}
                        /> */}

                                                {/* <ActionDialog
                          trigger={
                            <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                              Terminate investment
                            </button>
                          }
                          title="Reject investment application"
                          description="Ensure you are certain about the decision you are making because this action is irreversible. Are you sure you want to reject this investment?"
                          confirmText="Yes, reject application"
                          cancelText="No, view details"
                          confirmVariant="danger"
                          onConfirm={() => handleRejectInvestment(investment.id)}
                          onCancel={() => navigateToinvestmentDetails(investment.id)}
                        /> */}
                                            </div>
                                        </div>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default LoanApplications;
