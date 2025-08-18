import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '@/modules/wallets/state/walletSlice';
import { getCookie } from '@/utils/cookieUtils';
import useRedirectOnDesktop from '@/hooks/useRedirectOnDesktop';

import BackButton from '@/components/BackButton';
import WalletCard from "@/modules/wallets/components/WalletCard";
import WalletSkeletonCard from '@/modules/wallets/components/walletSkeletonCard';
import TableFilter from '@/components/TableFilter';
import Pagination from '@/components/Pagination';
import NoContent from '@/components/NoContent';
import { filterTransactions } from '@/utils/filters';

const LIMIT = 10;

const AllWallets = () => {
    useRedirectOnDesktop('/wallets');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);

    const {
        transactions: all_transactions,
        metaData: metaData,
        transaction_loading: transaction_loading,
        transaction_error: transaction_error,
    } = useSelector((state) => state.wallet);
    useEffect(() => {
        if (!transaction_loading) {
            dispatch(fetchTransactions({
                userID: user?._id,
                page: 1,
                limit: LIMIT,
            }))
        }
    }, [dispatch]);

    const [transactions, setTransactions] = useState([]);
    const [filters, setFilters] = useState({
        statuses: '',
        paymentTypes: '',
    });

    const filterOptions = {
        statuses: ['Successful', 'Pending', 'Failed'],
        paymentTypes: ['Wallet funding', 'Money sent'],
    };

    useEffect(() => {
        const filtered = filterTransactions({
            transactions: all_transactions,
            filters,
        });

        setTransactions(filtered);
    }, [filters, all_transactions]);

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            statuses: '',
            paymentTypes: '',
        });
    };

    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setTotalPages(parseInt(metaData?.total_pages));
        setCurrentPage(parseInt(metaData?.current_page));
    }, [transactions]);

    useEffect(() => {
        dispatch(fetchTransactions({
            userID: user?._id,
            page: currentPage,
            limit: LIMIT
        }));
    }, [currentPage]);

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

                {(transaction_loading || transactions.length) > 0 ? (
                    <div className='space-y-2' id='mobile_transaction_card'>
                        {transaction_loading ? (
                            Array.from({ length: LIMIT }).map((_, index) => (
                                <WalletSkeletonCard key={index} />
                            ))
                        ) : transactions.map((transaction, index) => (
                            <div key={index} onClick={() => navigate(`/wallets/all/${transaction?.reference}`)}>
                                <WalletCard transaction={transaction} />
                            </div>

                        ))}
                    </div>
                ) : (
                    <NoContent
                        icon="wallets"
                        title="No wallet transactions found"
                        description="We couldn't find any wallet transactions to display at the moment."
                    />

                )}

                {/* Pagination */}
                <Pagination
                    className={`flex ${(transactions.length == 0 || transaction_loading) && 'hidden'}`}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllWallets;
