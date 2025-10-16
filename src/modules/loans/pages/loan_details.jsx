import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLoanByID, repayAllLoan, repayLoan } from '@/modules/loans/state/loanSlice';
import { getCookie } from '@/utils/cookieUtils';

import { ReactComponent as Download } from '@/assets/icons/download.svg';
import BackButton from '@/components/BackButton';
import { useParams } from 'react-router-dom';
import { formatDateTime } from '@/utils/datetimeFormats';
import LoanSkeletonDetails from '../components/loanSkeletonDetails';
import NoContent from '@/components/NoContent';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

const LoanDetails = () => {
    const dispatch = useDispatch();
    const { ID } = useParams();
    const { loanDetails: loanDetails, loading: loading, error: error } = useSelector((state) => state.loan);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchLoanByID({ key: 'id', value: ID }));
        }
    }, [dispatch]);

    const makeLoanRepayment = async (option) => {
        if (option === 'partial') {
            await dispatch(repayLoan(loanDetails?._id)).unwrap();
            toast.success("Loan Repayment", {
                description: `You have successfully repaid the ${loanDetails?.repaymentInterval} sum of 
            ${loanDetails?.payments?.[0]?.amount?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`,
            })
        } else {
            await dispatch(repayAllLoan(loanDetails?._id)).unwrap();
            toast.success("Loan Repayment", {
                description: `You have successfully repaid the sum of 
            ${(loanDetails?.payments?.[0]?.amount * loanDetails?.tenureValue)?.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}`,
            })
        }
    };

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
                    ${['approved', 'paid'].includes(loanDetails?.status?.toLowerCase()) ? 'bg-success' :
                                loanDetails?.status === 'pending' ? 'bg-warning' :
                                    'bg-danger'
                            }`}>
                            {loanDetails?.status}
                        </span>

                        <div className='space-y-5 mt-5'>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
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
                                    <p className='text-base font-medium capitalize'>{loanDetails?.tenure || '--'}</p>
                                </div>
                            </div>
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Repayment interval</p>
                                    <p className='text-base font-medium capitalize'>{loanDetails?.repaymentInterval || '--'}</p>
                                </div>
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Date & time</p>
                                    <p className='text-base font-medium'>{formatDateTime(loanDetails?.createdAt)}</p>
                                </div>
                            </div>
                            {loanDetails?.loanType?.toLowerCase() === 'employee' &&
                                <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                                        <p className='text-secondary'>Employer's name</p>
                                        <p className='text-base font-medium capitalize'>{loanDetails?.employerName || '--'}</p>
                                    </div>
                                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                                        <p className='text-secondary'>Employer's phone number</p>
                                        <p className='text-base font-medium'>{loanDetails?.employerPhoneNumber || '--'}</p>
                                    </div>
                                </div>}
                            {loanDetails?.loanType?.toLowerCase() === 'employee' &&
                                <>
                                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>Employer's address</p>
                                            <p className='text-base font-medium capitalize'>{loanDetails?.employerAddress || '--'}</p>
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
                                            <p className='text-base font-medium capitalize'>{loanDetails?.state || '--'}</p>
                                        </div>
                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>LGA</p>
                                            <p className='text-base font-medium capitalize'>{loanDetails?.lga || '--'}</p>
                                        </div>
                                    </div>
                                </>
                            }

                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                {loanDetails?.loanType?.toLowerCase() === 'asset-finance' && (
                                    <>
                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>Invoice of item from vendor</p>

                                            {loanDetails?.vendorInvoice ? (
                                                <a
                                                    href={loanDetails.vendorInvoice}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className='flex items-center gap-2 no-underline'
                                                >
                                                    <span className='block text-base font-medium truncate'>
                                                        {loanDetails.vendorInvoice?.split('/')?.pop()}
                                                    </span>
                                                    <Download className='cursor-pointer' />
                                                </a>
                                            ) : (
                                                <span className="text-gray-400">No invoice uploaded</span>
                                            )}
                                        </div>

                                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                                            <p className='text-secondary'>Proof of payment</p>

                                            {loanDetails?.proofOfPayment && (
                                                <a
                                                    href={loanDetails.proofOfPayment}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className='flex items-center gap-2 no-underline'
                                                >
                                                    <span className='block text-base font-medium truncate'>
                                                        {loanDetails.proofOfPayment?.split('/')?.pop()}
                                                    </span>
                                                    <Download className='cursor-pointer' />
                                                </a>
                                            )}
                                        </div>
                                    </>
                                )}

                            </div>

                            
                            <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                                {(loanDetails?.loanType?.toLowerCase() === 'personal' || loanDetails?.loanType === 'business') &&
                                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                                        <p className='text-secondary'>Collateral</p>
                                        <p className='text-base font-medium capitalize'>{loanDetails?.collateralID || '--'}</p>
                                    </div>
                                }
                                <div className='w-full md:w-1/2 text-xs space-y-1'>
                                    <p className='text-secondary'>Note</p>
                                    <p className='text-base font-medium'>{loanDetails?.notes || '--'}</p>
                                </div>
                            </div>
                        </div>

                        {loanDetails?.status?.toLowerCase() === 'approved' && (
                            <div className='flex flex-col md:flex-row items-center gap-3 md:gap-5 mt-5'>
                                <button
                                    className='w-full md:w-auto h-11 md:h-9 px-3 rounded-md bg-primary text-sm text-white cursor-pointer'
                                    onClick={() => makeLoanRepayment('partial')}
                                >
                                    Repay {loanDetails?.repaymentInterval} ₦{Number(loanDetails?.payments?.[0]?.amount).toLocaleString()}
                                </button>

                                <button
                                    className='w-full md:w-auto h-11 md:h-9 px-3 rounded-md bg-secondary text-sm text-white cursor-pointer'
                                    onClick={() => makeLoanRepayment('complete')}
                                >
                                    Repay Full ₦{Number(loanDetails?.payments?.[0]?.amount * loanDetails?.tenureValue).toLocaleString()}
                                </button>
                            </div>
                        )}

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
