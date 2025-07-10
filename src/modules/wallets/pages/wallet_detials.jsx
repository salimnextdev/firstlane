import React, { useState } from 'react';

import { ReactComponent as Download } from '@/assets/icons/download.svg';
import BackButton from '@/components/BackButton';

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
    return (
        <div className="space-y-5">
            <BackButton />

            <div className='p-5 border border-gray rounded-xl'>
                <span className={`px-3 py-1 text-xs font-medium rounded-full 
                ${data.status === 'successful' ? 'bg-success' : 
                data.status === 'pending' ? 'bg-warning' : 
                'bg-danger'}
                `}>
                    Pending
                </span>

                <div className='space-y-5 mt-5'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Amount</p>
                            <p className='text-base font-medium'>₦{data.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Payment type</p>
                            <p className='text-base font-medium'>{data.type}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Sender account number</p>
                            <p className='text-base font-medium'>{data.account_number}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Sender bank</p>
                            <p className='text-base font-medium'>{data.bank_name} months</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Sender account name</p>
                            <p className='text-base font-medium'>{data.account_name}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Date & time</p>
                            <p className='text-base font-medium'>{data.datetime} months</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Transaction ID</p>
                            <p className='text-base font-medium'>{data.ID}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Note</p>
                            <p className='text-base font-medium'>{data.note}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletDetails;
