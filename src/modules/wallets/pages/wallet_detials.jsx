import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactionByID } from '@/modules/wallets/state/walletSlice';

import BackButton from '@/components/BackButton';
import { getTransactionType } from '@/utils/genericFunc';
import { formatDateTime } from '@/utils/datetimeFormats';
import LoanSkeletonDetails from '@/modules/loans/components/loanSkeletonDetails';

const data = {
    ID: "123456789123451",
    status: "successful",
    amount: 10000.00,
    type: "Wallet funding",
    datetime: "12th Aug, 2026 | 8:23AM",
    account_name: "Raju Gujarat",
    account_number: "0123456789",
    bank_name: "Peak bank",
    note: "{Only useful when others option are selected}"
}

const WalletDetails = () => {
    const dispatch = useDispatch();
    const { ID } = useParams();
    const {
        transactionDetails: transaction,
        transaction_loading: loading,
        transaction_error: error,
    } = useSelector((state) => state.wallet);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchTransactionByID(ID));
        }
    }, [dispatch]);

    return (
        <div className="space-y-5">
            <BackButton />

            {loading ?
                <LoanSkeletonDetails /> :
                <div className='p-5 border border-gray rounded-xl'>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize
                        ${['completed', 'paid'].includes(transaction?.status?.toLowerCase()) ? 'bg-success' :
                            transaction?.status === 'pending' ? 'bg-warning' :
                                'bg-danger'}
                        `}>
                        {transaction?.status || '--'}
                    </span>

                    <div className='space-y-5 mt-5'>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                            <div className='w-full md:w-1/2 text-xs space-y-1'>
                                <p className='text-secondary'>Amount</p>
                                <p className='text-base font-medium'>
                                    ₦{transaction?.amount.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }) || '--'}</p>
                            </div>
                            <div className='w-full md:w-1/2 text-xs space-y-1'>
                                <p className='text-secondary'>Payment type</p>
                                <p className='text-base font-medium capitalize'>
                                    {getTransactionType(transaction?.type, transaction?.remarks) || '--'}
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                            <div className='w-full md:w-1/2 text-xs space-y-1'>
                                <p className='text-secondary'>Sender account number</p>
                                <p className='text-base font-medium'>{transaction?.senderAccountNumber || '--'}</p>
                            </div>
                            <div className='w-full md:w-1/2 text-xs space-y-1'>
                                <p className='text-secondary'>Sender bank</p>
                                <p className='text-base font-medium'>{transaction?.senderBank || '--'}</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                            <div className='w-full md:w-1/2 text-xs space-y-1'>
                                <p className='text-secondary'>Sender account name</p>
                                <p className='text-base font-medium'>{transaction?.senderAccountName || '--'}</p>
                            </div>
                            <div className='w-full md:w-1/2 text-xs space-y-1'>
                                <p className='text-secondary'>Date & time</p>
                                <p className='text-base font-medium'>
                                    {formatDateTime(transaction?.createdAt || transaction?.date) || '--'}</p>
                            </div>
                        </div>
                        <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                            <div className='w-full md:w-1/2 text-xs space-y-1'>
                                <p className='text-secondary'>Transaction ID</p>
                                <p className='text-base font-medium'>{transaction?._id || '--'}</p>
                            </div>
                            <div className='w-full md:w-1/2 text-sm space-y-1'>
                                <p className='text-secondary'>Note</p>
                                <p className='text-base font-medium'>{transaction?.remarks || '--'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

export default WalletDetails;
