import React, { useState } from 'react';

import { ReactComponent as Download } from '@/assets/icons/download.svg';
import BackButton from '@/components/BackButton';

const data = {
    amount: 10000.00,
    purpose: "Equipment purchase",
    type: "Employee",
    tenure: "12",
    interval: "Monthly",
    datetime: "12th Aug, 2026 | 8:23AM",
    employer_name: "Ventures Studio Group",
    employer_phone: "0800 000 0000",
    employer_address: "No 10, Ibrahim Babangida Way, Wuse 2, Abuja",
    income: 100000.00,
    state: "FCT",
    lga: "Abuja Municipal",
    collateral: "Vehicle",
    note: "{Only useful when others option was selected}",
    invoice: "vehicle_invoice.pdf",
}

const LoanDetails = () => {
    return (
        <div className="space-y-5">
            <BackButton />

            <div className='p-5 border border-[#E4E7EC] rounded-xl'>
                <span className="px-3 py-1 text-xs rounded-full bg-warning">
                    Pending
                </span>

                <div className='space-y-5 mt-5'>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-xs md:text-sm space-y-1'>
                            <p className='text-secondary'>Amount</p>
                            <p className='text-base font-medium'>₦{data.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Purpose</p>
                            <p className='text-base font-medium'>{data.purpose}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Type</p>
                            <p className='text-base font-medium'>{data.type}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Loan tenure</p>
                            <p className='text-base font-medium'>{data.tenure} months</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Repayment interval</p>
                            <p className='text-base font-medium'>{data.interval}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Date & time</p>
                            <p className='text-base font-medium'>{data.datetime} months</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Employer's name</p>
                            <p className='text-base font-medium'>{data.employer_name}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Employer's phone number</p>
                            <p className='text-base font-medium'>{data.employer_phone} months</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Employer's address</p>
                            <p className='text-base font-medium'>{data.employer_address}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Your monthly income</p>
                            <p className='text-base font-medium'>₦{data.income.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>State</p>
                            <p className='text-base font-medium'>{data.state}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>LGA</p>
                            <p className='text-base font-medium'>{data.lga}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Collateral</p>
                            <p className='text-base font-medium'>{data.collateral}</p>
                        </div>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Note</p>
                            <p className='text-base font-medium'>{data.note}</p>
                        </div>
                    </div>
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        <div className='w-full md:w-1/2 text-sm space-y-1'>
                            <p className='text-secondary'>Invoice of item from vendor</p>
                            <div className='flex items-center gap-2'>
                                <span className='text-base font-medium'>{data.invoice}</span>
                                <Download className='cursor-pointer' />
                            </div>
                        </div>
                        {/* <div className='w-1/2 tsmt-xs space-y-1'>
                            <p className='text-secondary'>Note</p>
                            <p className='text-base font-medium'>{data.lga}</p>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoanDetails;
