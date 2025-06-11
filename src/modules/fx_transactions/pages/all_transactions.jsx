import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

import { ReactComponent as Dot } from '@/assets/icons/dot.svg';
import { ReactComponent as Filter } from '@/assets/icons/filter.svg';
import { IoIosSearch } from 'react-icons/io';

import BackButton from '@/components/BackButton';
import MobileTransactionCard from '../components/MobileTransactionCard';

const AllTransactions = () => {
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(null);
    const [selectedInvestments, setSelectedInvestments] = useState([]);
    const [investments, setInvestments] = useState([
        {
            id: '00001',
            amount: 10000.89,
            type: 'Employee',
            purpose: 'Equipment purchase',
            status: "approved"
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
            status: "approved"
        },
        {
            id: '00001',
            amount: 10000.89,
            type: 'Employee',
            purpose: 'Asset acquisition',
            status: "pending"
        },
        {
            id: '00002',
            amount: 10000.89,
            type: 'Business',
            purpose: 'Marketing',
            status: "approved"
        },
    ]);
    
    return (
        <div className="space-y-3">
            <BackButton />

            {/* MOBILE ::::  FX Transactions Card */}
            <div className='md:hidden space-y-3'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>FX transactions</p>
                    <div className="border border-gray-200 p-1 rounded-lg w-8 h-8 flex items-center justify-center">
                        <Filter className="" />
                    </div>
                </div>

                <div className='space-y-2' id='mobile_transaction_card'>
                    {investments.map((transaction, index) => (
                        <div key={index} onClick={()=> navigate(`/fx-transactions/all/${index}`)}>
                            <MobileTransactionCard transaction={transaction} />
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllTransactions;
