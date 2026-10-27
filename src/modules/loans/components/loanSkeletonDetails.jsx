import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoanSkeletonDetails = ({ employee, finance }) => {
    return (
        // Outer container mimicking the loan details card structure
        <div className='p-5 border border-gray rounded-xl animate-pulse'>
            {/* Skeleton for the status badge */}
            <Skeleton className='h-6 w-24 mb-4 bg-gray-200 rounded-full' />

            {/* Inner content area with loan details skeletons */}
            <div className='space-y-5 mt-5'>
                {/* Amount and Purpose row */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                    {/* Amount */}
                    <div className='w-full md:w-1/2 text-xs md:text-sm space-y-1'>
                        <Skeleton className='h-4 w-20 bg-gray-200 rounded-md' /> {/* Label: Amount */}
                        <Skeleton className='h-6 w-32 bg-gray-200 rounded-md' /> {/* Value: ₦X,XXX.XX */}
                    </div>
                    {/* Purpose */}
                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                        <Skeleton className='h-4 w-20 bg-gray-200 rounded-md' /> {/* Label: Purpose */}
                        <Skeleton className='h-6 w-48 bg-gray-200 rounded-md' /> {/* Value: loanDetails?.purpose */}
                    </div>
                </div>

                {/* Type and Loan tenure row */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                    {/* Type */}
                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                        <Skeleton className='h-4 w-20 bg-gray-200 rounded-md' /> {/* Label: Type */}
                        <Skeleton className='h-6 w-32 bg-gray-200 rounded-md' /> {/* Value: loanDetails?.loanType */}
                    </div>
                    {/* Loan tenure */}
                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                        <Skeleton className='h-4 w-28 bg-gray-200 rounded-md' /> {/* Label: Loan tenure */}
                        <Skeleton className='h-6 w-24 bg-gray-200 rounded-md' /> {/* Value: loanDetails?.tenure */}
                    </div>
                </div>

                {/* Repayment interval and Date & time row */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                    {/* Repayment interval */}
                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                        <Skeleton className='h-4 w-36 bg-gray-200 rounded-md' /> {/* Label: Repayment interval */}
                        <Skeleton className='h-6 w-32 bg-gray-200 rounded-md' /> {/* Value: loanDetails?.repaymentInterval */}
                    </div>
                    {/* Date & time */}
                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                        <Skeleton className='h-4 w-24 bg-gray-200 rounded-md' /> {/* Label: Date & time */}
                        <Skeleton className='h-6 w-40 bg-gray-200 rounded-md' /> {/* Value: formatDateTime(loanDetails?.createdAt) */}
                    </div>
                </div>

                {/* Employer's name and Employer's phone number row */}
                {employee &&
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        {/* Employer's name */}
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <Skeleton className='h-4 w-32 bg-gray-200 rounded-md' /> {/* Label: Employer's name */}
                            <Skeleton className='h-6 w-48 bg-gray-200 rounded-md' /> {/* Value: data.employer_name */}
                        </div>
                        {/* Employer's phone number */}
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <Skeleton className='h-4 w-40 bg-gray-200 rounded-md' /> {/* Label: Employer's phone number */}
                            <Skeleton className='h-6 w-32 bg-gray-200 rounded-md' /> {/* Value: data.employer_phone */}
                        </div>
                    </div>}

                {/* Employer's address and Your monthly income row */}
                {employee &&
                    <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                        {/* Employer's address */}
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <Skeleton className='h-4 w-32 bg-gray-200 rounded-md' /> {/* Label: Employer's address */}
                            <Skeleton className='h-6 w-full bg-gray-200 rounded-md' /> {/* Value: data.employer_address (full width for address) */}
                        </div>
                        {/* Your monthly income */}
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <Skeleton className='h-4 w-36 bg-gray-200 rounded-md' /> {/* Label: Your monthly income */}
                            <Skeleton className='h-6 w-32 bg-gray-200 rounded-md' /> {/* Value: ₦X,XXX.XX */}
                        </div>
                    </div>}

                {/* Collateral and Note row */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                    {/* Collateral */}
                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                        <Skeleton className='h-4 w-24 bg-gray-200 rounded-md' /> {/* Label: Collateral */}
                        <Skeleton className='h-6 w-32 bg-gray-200 rounded-md' /> {/* Value: loanDetails?.collateral */}
                    </div>
                    {/* Note */}
                    <div className='w-full md:w-1/2 text-xs space-y-1'>
                        <Skeleton className='h-4 w-16 bg-gray-200 rounded-md' /> {/* Label: Note */}
                        <Skeleton className='h-6 w-40 bg-gray-200 rounded-md' /> {/* Value: data.note */}
                    </div>
                </div>

                {/* Invoice of item from vendor row */}
                <div className='flex flex-col md:flex-row md:items-center justify-between gap-5'>
                    {/* Invoice of item from vendor */}
                    {finance &&
                        <div className='w-full md:w-1/2 text-xs space-y-1'>
                            <Skeleton className='h-4 w-48 bg-gray-200 rounded-md' /> {/* Label: Invoice of item from vendor */}
                            <div className='flex items-center gap-2'>
                                <Skeleton className='h-6 w-24 bg-gray-200 rounded-md' /> {/* Value: data.invoice */}
                                <Skeleton className='h-6 w-6 bg-gray-200 rounded-md' /> {/* Download icon */}
                            </div>
                        </div>}
                    {/* The commented out div is intentionally omitted as it's not part of the active structure */}
                </div>
            </div>
        </div>
    );
};

export default LoanSkeletonDetails;