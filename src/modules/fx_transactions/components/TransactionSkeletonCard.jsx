import React from "react";

const TransactionSkeletonCard = () => {
    return (
        <div className='space-y-2 p-3 border border-gray-200 rounded-xl animate-pulse'>
            {/* Status badge placeholder */}
            <div className='h-6 w-20 bg-gray-300 rounded-full mb-2'></div>

            <div className="flex items-center justify-between">
                {/* Buy amount section placeholders */}
                <div className="space-y-1">
                    <div className="h-3 w-16 bg-gray-300 rounded"></div>
                    <div className='h-4 w-20 bg-gray-300 rounded'></div>
                </div>
                {/* Sell amount section placeholders */}
                <div className="text-right space-y-1">
                    <div className="h-3 w-16 bg-gray-300 rounded ml-auto"></div>
                    <div className='h-4 w-20 bg-gray-300 rounded ml-auto'></div>
                </div>
            </div>

            {/* Time and currency pair placeholders */}
            <div className='flex items-center justify-between'>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
                <div className="h-3 w-16 bg-gray-300 rounded"></div>
            </div>
        </div>
    )
}

export default TransactionSkeletonCard