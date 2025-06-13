import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Filter } from '@/assets/icons/filter.svg';

import BackButton from '@/components/BackButton';
import MobileTransactionCard from '@/modules/fx_transactions/components/MobileTransactionCard';
import TableFilter from '@/components/TableFilter';

const AllTransactions = () => {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([
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
        <div className="space-y-3">
            <BackButton />

            {/* MOBILE ::::  FX Transactions Card */}
            <div className='md:hidden space-y-3'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>FX transactions</p>
                    
                    <TableFilter
                        filterOptions={filterOptions}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />
                </div>

                <div className='space-y-2' id='mobile_transaction_card'>
                    {transactions.map((transaction, index) => (
                        <div key={index}>
                            <MobileTransactionCard transaction={transaction} />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default AllTransactions;
