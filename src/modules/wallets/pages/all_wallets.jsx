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

import { ReactComponent as Filter } from '@/assets/icons/filter.svg';

import BackButton from '@/components/BackButton';
import WalletCard from "@/modules/wallets/components/WalletCard";

const AllWallets = () => {
    const navigate = useNavigate();
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

    return (
        <div className="space-y-3">
            <BackButton />

            {/* MOBILE ::::  Wallet Transactions Card */}
            <div className='md:hidden space-y-3'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Wallet transactions</p>
                    <div className="border border-gray-200 p-1 rounded-lg w-8 h-8 flex items-center justify-center">
                        <Filter className="" />
                    </div>
                </div>

                <div className='space-y-2' id='mobile_transaction_card'>
                    {investments.map((wallet, index) => (
                        <div key={index} onClick={()=> navigate(`/wallets/all/${index}`)}>
                            <WalletCard wallet={wallet} />
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllWallets;
