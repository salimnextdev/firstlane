import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanByID } from '@/modules/loans/state/loanSlice';
import { getCookie } from '@/utils/cookieUtils';

import { ReactComponent as Download } from '@/assets/icons/download.svg';
import BackButton from '@/components/BackButton';
import { useParams } from 'react-router-dom';
import { formatDateTime } from '@/utils/datetimeFormats';
import LoanSkeletonDetails from '../components/loanSkeletonDetails';
import NoContent from '@/components/NoContent';

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
    const dispatch = useDispatch();
    const { ID } = useParams();
    const { loanDetails: loanDetails, loading: loading, error: error } = useSelector((state) => state.loan);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchLoanByID({ key: 'id', value: ID }));
        }
    }, [dispatch]);

    return (
        <div className="space-y-5">
            <BackButton />

            {loading ?
                <LoanSkeletonDetails
                    employee={loanDetails?.loanType === 'employee'}
                    finance={loanDetails?.loanType === 'finance'}
                /> :
                loanDetails ?
                    (<div className='p-5 border border-gray rounded-xl'>
                        <span className={`px-3 py-1 text-xs capitalize rounded-full 
                    ${loanDetails?.status === 'approved' ? 'bg-success' :
                                loanDetails?.status === 'pending' ? 'bg-warning' :
                                    'bg-danger'
                            }`}>
                            {loanDetails?.status}
                        </span>

                        <div className='space-y-5 mt-5'>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                <div className='w-full md:w-1/2 text-xs md:text-sm space-y-1'>
                                    <p className='text-secondary'>Amount</p>
                                    <p className='text-base font-medium'>
                                        ₦{(loanDetails?.amountRequested || 0.00).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}</p>
                                </div>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Purpose</p>
                                    <p className='text-base font-medium capitalize'>{loanDetails?.purpose || '--'}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Type</p>
                                    <p className='text-base font-medium capitalize'>{loanDetails?.loanType || '--'}</p>
                                </div>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Loan tenure</p>
                                    <p className='text-base font-medium'>{loanDetails?.tenure || '--'}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Repayment interval</p>
                                    <p className='text-base font-medium'>{loanDetails?.repaymentInterval || '--'}</p>
                                </div>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Date & time</p>
                                    <p className='text-base font-medium'>{formatDateTime(loanDetails?.createdAt)}</p>
                                </div>
                            </div>
                            {loanDetails?.loanType === 'employee' &&
                                <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                                        <p className='text-secondary'>Employer's name</p>
                                        <p className='text-base font-medium'>{loanDetails?.employerName || '--'}</p>
                                    </div>
                                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                                        <p className='text-secondary'>Employer's phone number</p>
                                        <p className='text-base font-medium'>{loanDetails?.employerPhoneNumber || '--'}</p>
                                    </div>
                                </div>}
                            {loanDetails?.loanType === 'employee' &&
                                <>
                                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>Employer's address</p>
                                            <p className='text-base font-medium'>{loanDetails?.employerAddress || '--'}</p>
                                        </div>
                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>Your monthly income</p>
                                            <p className='text-base font-medium'>
                                                ₦{(loanDetails?.monthlyIncome || 0.00).toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>State</p>
                                            <p className='text-base font-medium'>{loanDetails?.state || '--'}</p>
                                        </div>
                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>LGA</p>
                                            <p className='text-base font-medium'>{loanDetails?.lga || '--'}</p>
                                        </div>
                                    </div>
                                </>
                            }
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                {loanDetails?.loanType == 'personal' || loanDetails?.loanType == 'business' &&
                                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                                        <p className='text-secondary'>Collateral</p>
                                        <p className='text-base font-medium'>{loanDetails?.collateralID || '--'}</p>
                                    </div>
                                }
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Note</p>
                                    <p className='text-base font-medium'>{loanDetails?.notes || '--'}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                {loanDetails?.loanType === 'finance' &&
                                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                                        <p className='text-secondary'>Invoice of item from vendor</p>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-base font-medium'>{data.invoice}</span>
                                            <Download className='cursor-pointer' />
                                        </div>
                                    </div>}
                                {/* <div className='w-1/2 text-xs space-y-1'>
                            <p className='text-secondary'>Note</p>
                            <p className='text-base font-medium'>{data.lga}</p>
                        </div> */}
                            </div>
                        </div>
                    </div>) : (
                        <NoContent
                            icon="loans"
                            title="Loan Unavailable"
                            description="The loan page you’re trying to access is no longer available. It may have been removed or the loan ID is invalid."
                        />
                    )
            }
        </div>
    );
};

export default LoanDetails;
