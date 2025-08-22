import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFXRates, fetchFXTransactions, filterFXTransactions } from '@/modules/fx_transactions/state/fxSlice';
import { getCookie } from '@/utils/cookieUtils';
import useRedirectOnDesktop from '@/hooks/useRedirectOnDesktop';

import BackButton from '@/components/BackButton';
import MobileTransactionCard from '@/modules/fx_transactions/components/MobileTransactionCard';
import TableFilter from '@/components/TableFilter';
import Pagination from '@/components/Pagination';
import NoContent from '@/components/NoContent';
import TransactionSkeletonCard from '../components/TransactionSkeletonCard';

const LIMIT = 10;

const AllTransactions = () => {
    useRedirectOnDesktop('/fx-transactions');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);
    const { searchTerm } = useSelector((state) => state.search);
    const {
        fx_transactions: fx_transactions,
        metaData: metaData,
        fx_rates: fx_rates,
        loading: loading, error: error,
    } = useSelector((state) => state.fx);

    useEffect(() => {
        if (!loading) {
            dispatch(fetchFXTransactions({ key: 'userID', value: user?._id, page: 1, limit: LIMIT }));
            dispatch(fetchFXRates({ page: 1, limit: LIMIT }));
        }
    }, [dispatch]);

    const [currencyPairs, setCurrencyPairs] = useState([]);
    useEffect(() => {
        setCurrencyPairs(fx_rates.map(rate =>
            `${rate?.baseCurrency?.currencyID?.code}/${rate?.targetCurrency?.currencyID?.code}`
        ));
    }, [fx_rates]);

    const transactions = !searchTerm ? fx_transactions : fx_transactions.filter((transaction) => (
        // transaction.amount == searchTerm ||
        transaction.status?.toLowerCase()?.includes(searchTerm.toLowerCase())
    ));

    const [filters, setFilters] = useState({
        statuses: '',
        currencyPairs: '',
    });

    const filterOptions = {
        statuses: ['Completed', 'Pending', 'Failed'],
        // currencyPairs: ['USD/EUR', 'GBP/USD', 'JPY/CAD'],
        currencyPairs: currencyPairs,
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            statuses: '',
            currencyPairs: '',
        });
    };

    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setTotalPages(metaData?.totalPage);
    }, [fx_transactions]);

    useEffect(() => {
        const hasActiveFilters = Object.values(filters).some(value => value !== '');
        const getFilterPayload = () => {
            const { statuses, currencyPairs } = filters;
            const result = {};
            
            result.userID = user?._id;

            if (statuses) {
                result.status = statuses.toLowerCase();
            }

            if (currencyPairs && currencyPairs.includes('/')) {
                const [from, to] = currencyPairs.split('/');
                if (from && to) {
                    result.fromCurrency = { currencyID: { code: from } };
                    result.toCurrency = { currencyID: { code: to } };
                }
            }

            return result;
        };

        if (hasActiveFilters) {
            dispatch(filterFXTransactions(getFilterPayload()));
        } else {
            dispatch(fetchFXTransactions({ key: 'userID', value: user?._id, page: currentPage, limit: LIMIT }));
        }
    }, [currentPage, filters]);

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

                {(loading || transactions.length) > 0 ? (
                    <div className='space-y-2' id='mobile_transaction_card'>
                        {loading ? (
                            Array.from({ length: 6 }).map((_, index) => (
                                <TransactionSkeletonCard key={index} />
                            ))
                        ) : transactions.map((transaction, index) => (
                            <div key={transaction?._id}>
                                <MobileTransactionCard transaction={transaction} />
                            </div>

                        ))}
                    </div>
                ) : (
                    <NoContent icon="fx transactions" title="No FX Transactions" description="There are no foreign exchange transactions to display at the moment." />
                )}

                {/* Pagination */}
                <Pagination
                    className={`flex ${(transactions.length == 0 || loading) && 'hidden'}`}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
};

export default AllTransactions;
