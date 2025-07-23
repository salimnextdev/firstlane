import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const InvestmentSkeletonCard = ({ plan = true }) => (
    <div className='p-3 md:p-5 bg-light md:bg-white text-sm border border-gray rounded-xl'>
        {/* Investment Duration Skeleton */}
        <Skeleton className='h-3 w-28 mb-1 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "Investment Duration" label */}
        <Skeleton className='h-6 w-3/4 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "XX days (YY months)" */}

        <div className='flex gap-10 my-4'>
            {/* Investment Starts At Skeleton */}
            <div className='space-y-1 text-xs'>
                <Skeleton className='h-3 w-24 mb-1 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "Investment starts at" label */}
                <Skeleton className='h-5 w-32 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "₦X,XXX.XX" */}
            </div>
            {/* Interest Starts At Skeleton */}
            <div className='space-y-1 text-xs'>
                <Skeleton className='h-3 w-24 mb-1 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "Interest starts at" label */}
                <Skeleton className='h-5 w-16 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "YY.Y%" */}
            </div>
        </div>

        {!plan &&
            <div className='flex gap-10 my-4'>
                {/* Investment Balance Skeleton */}
                <div className='space-y-1 text-xs'>
                    <Skeleton className='h-3 w-24 mb-1 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "Investment starts at" label */}
                    <Skeleton className='h-5 w-32 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "₦X,XXX.XX" */}
                </div>
                {/* Interest Earned Skeleton */}
                <div className='space-y-1 text-xs'>
                    <Skeleton className='h-3 w-24 mb-1 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "Interest starts at" label */}
                    <Skeleton className='h-5 w-16 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "YY.Y%" */}
                </div>
            </div>
        }

        {!plan ?
            <div className='space-y-1 text-xs'>
                <Skeleton className='h-3 w-24 mb-1 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "Investment starts at" label */}
                <Skeleton className='h-5 w-16 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for "₦X,XXX.XX" */}
            </div> :

            <div>
                {/* Invest Button Skeleton */}
                < Skeleton className='h-8 w-28 bg-gray-200 md:bg-gray-100 rounded-md' /> {/* Placeholder for the "Invest" button */}
            </div>
        }
    </div>
);

export default InvestmentSkeletonCard;