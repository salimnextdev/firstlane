import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const WalletSkeletonCard = () => {
    return (
        <div className='p-3 flex items-end justify-between border border-gray-200 rounded-xl bg-white animate-pulse'>
            {/* Left side: Amount and Date placeholders */}
            <div className="space-y-1">
                {/* Amount placeholder */}
                <Skeleton className="h-6 w-32 bg-gray-200" />
                {/* Date placeholder */}
                <Skeleton className="h-4 w-24 bg-gray-200" />
            </div>
            {/* Right side: Status and Type placeholders */}
            <div className='flex flex-col items-end gap-1'>
                {/* Status placeholder */}
                <Skeleton className="h-4 w-20 bg-gray-200" />
                {/* Type badge placeholder */}
                <Skeleton className="h-6 w-24 bg-gray-200 rounded-full" />
            </div>
        </div>
    );
};

export default WalletSkeletonCard;