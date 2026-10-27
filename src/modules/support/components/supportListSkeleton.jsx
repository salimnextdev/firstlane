import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton component path

/**
 * ListItemSkeleton component displays a single loading skeleton for a list item.
 * It mimics the layout of an individual item in a list (e.g., a message or ticket item).
 */
const ListItemSkeleton = () => {
  return (
    // Main container mimicking the list item's structure
    <div className={`flex items-center justify-between py-2 md:p-3 rounded-md animate-pulse`}>
      {/* Left section: Avatar and text content */}
      <div className='flex items-center gap-3'>
        {/* Skeleton for the circular avatar */}
        <Skeleton className='w-[40px] h-[40px] bg-gray-200 rounded-full' />
        <div className='text-sm font-light space-y-1'>
          {/* Skeleton for "Admin | #ID" line */}
          <p className='font-medium space-x-3'>
            <Skeleton className='h-4 w-16 bg-gray-200 rounded-md inline-block' /> {/* Admin text */}
            <Skeleton className='h-4 w-0.5 bg-gray-200 rounded-md inline-block' />   {/* | separator */}
            <Skeleton className='h-4 w-20 bg-gray-200 rounded-md inline-block' /> {/* ID text */}
          </p>
          {/* Skeleton for the subject line */}
          <Skeleton className='h-4 w-full bg-gray-200 rounded-md' /> {/* Subject text */}
        </div>
      </div>
      {/* Right section: Time and badge */}
      <div className='text-xs font-light space-y-1 flex flex-col items-end'>
        {/* Skeleton for the time */}
        <Skeleton className='h-4 w-12 bg-gray-200 rounded-md' /> {/* Time */}
        {/* Skeleton for the badge */}
        <Skeleton className='w-[29px] h-[17px] bg-gray-200 rounded-full mt-1' /> {/* Badge */}
      </div>
    </div>
  );
};

/**
 * SupportListSkeleton component displays multiple loading skeletons for a list section.
 * It's useful when loading a collection of items, like a list of messages or tickets.
 */
const SupportListSkeleton = ({ count = 7 }) => {
  return (
    <div className="space-y-2"> {/* Adjust space-y based on your actual list spacing */}
      {Array.from({ length: count }).map((_, index) => (
        <ListItemSkeleton key={index} />
      ))}
    </div>
  );
};

export default SupportListSkeleton;
