import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoanSkeletonCard = () => {
  return (
    // Main container mimicking the LoadCard's structure
    <div className='p-3 flex items-end justify-between border border-gray rounded-xl animate-pulse'>
      {/* Left section: Status, Purpose, Date */}
      <div className="space-y-1">
        {/* Skeleton for the status badge */}
        <Skeleton className='h-6 w-20 mb-2 bg-gray-200 rounded-full' />
        {/* Skeleton for the purpose text */}
        <Skeleton className="h-4 w-36 bg-gray-200 rounded-md" />
        {/* Skeleton for the date */}
        <Skeleton className="h-4 w-28 bg-gray-200 rounded-md" />
      </div>

      {/* Right section: Amount, Loan Type */}
      <div className='flex flex-col items-end gap-1'>
        {/* Skeleton for the amount requested */}
        <Skeleton className={`h-4 w-24 bg-gray-200 rounded-md`} />
        {/* Skeleton for the loan type badge */}
        <Skeleton className="h-6 w-28 bg-gray-200 rounded-full" />
      </div>
    </div>
  );
};

export default LoanSkeletonCard;
