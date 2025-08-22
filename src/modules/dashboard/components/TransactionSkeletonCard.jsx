import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const TransactionSkeletonCard = () => {
    return (
        <div className='p-3 flex items-center justify-between border border-gray-200 rounded-xl'>
            <div className="flex items-center gap-2">
                {/* Avatar placeholder */}
                <Skeleton className="w-[36px] h-[36px] bg-gray-200 rounded-full" />
                <div className="space-y-1">
                    {/* Full name placeholder */}
                    <Skeleton className="h-4 w-24 bg-gray-200" />
                    {/* Date placeholder */}
                    <Skeleton className="h-3 w-32 bg-gray-200" />
                </div>
            </div>
            <div className='flex flex-col items-end gap-1'>
                {/* Amount placeholder */}
                <Skeleton className="h-5 w-20 bg-gray-200" />
                {/* Status placeholder */}
                <Skeleton className="h-6 w-16 bg-gray-200 rounded-full" />
            </div>
        </div>
    )
}

export default TransactionSkeletonCard;