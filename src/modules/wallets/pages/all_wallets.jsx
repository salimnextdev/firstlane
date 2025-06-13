import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BackButton from '@/components/BackButton';
import WalletCard from "@/modules/wallets/components/WalletCard";
import TableFilter from '@/components/TableFilter';

const AllWallets = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([
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
            status: "successful"
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
            status: "pending"
        },
    ]);

    const [filters, setFilters] = useState({
        statuses: [],
        currencyPairs: [],
    });

    const filterOptions = {
        statuses: ['Successful', 'Pending', 'Failed'],
        paymentTypes: ['Payment funding', 'Wallet sent'],
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
        <div className="space-y-3">
            <BackButton />

            {/* MOBILE ::::  Wallet Transactions Card */}
            <div className='md:hidden space-y-3'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Wallet transactions</p>
                    
                    <TableFilter
                        filterOptions={filterOptions}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />
                </div>

                <div className='space-y-2' id='mobile_transaction_card'>
                    {transactions.map((transaction, index) => (
                        <div key={index} onClick={()=> navigate(`/wallets/all/${index}`)}>
                            <WalletCard wallet={transaction} />
                        </div>
                        
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllWallets;
