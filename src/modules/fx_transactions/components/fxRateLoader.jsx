import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const FxRatesLoader = ({ count = 5 }) => {
    return (
        <div className='px-5 py-3 space-y-3 bg-white border border-gray-200 rounded-xl animate-pulse'>
            <Skeleton className='h-4 w-40 bg-gray-200' />
            <div className='flex items-center gap-2 md:gap-10 font-medium overflow-auto hide-scrollbar'>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className='flex items-center gap-2'>
                        {/* Currency code placeholder */}
                        <Skeleton className="h-5 w-16 bg-gray-200" />
                        <span>~</span>
                        {/* Currency value placeholder */}
                        <Skeleton className="h-5 w-20 bg-gray-200" />
                        <span className='md:hidden text-[#D0D5DD]'>|</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FxRatesLoader;