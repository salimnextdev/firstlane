import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
/**
 * NotificationItemSkeleton component displays a single loading skeleton for a notification item.
 * It mimics the layout of an individual notification in the list.
 */
const NotificationItemSkeleton = () => {
  return (
    <div className="flex items-start gap-2 px-4 py-2 rounded-xl animate-pulse">
      {/* Icon and unread indicator section */}
      <div className="relative">
        <div className='w-2/12'>
          {/* Skeleton for the icon circle */}
          <Skeleton className="w-[44px] h-[44px] bg-gray-200 rounded-full" />
        </div>
        {/* Skeleton for the unread dot (optional, as it only appears if not read) */}
        {/* <Skeleton className="absolute top-0 right-0 bg-gray-300 w-3 h-3 rounded-full" /> */}
      </div>
      {/* Notification content section */}
      <div className="flex-grow space-y-1">
        {/* Skeleton for the action text (optional) */}
        <Skeleton className="h-4 w-24 bg-gray-200 rounded-md" />
        {/* Skeleton for the main details text */}
        <Skeleton className="h-4 w-full bg-gray-200 rounded-md" />
        {/* Skeleton for the time text */}
        <Skeleton className="h-4 w-28 bg-gray-200 rounded-md mt-1" />
      </div>
    </div>
  );
};

const NotificationSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-4">
      {/* Notifications list skeleton */}
      <div className="">
        {Array.from({ length: count }).map((_, index) => (
          <NotificationItemSkeleton key={index} />
        ))}
      </div>

      {/* Pagination section skeleton */}
      <div className="flex items-center justify-between px-4 py-2 text-sm md:text-base text-secondary animate-pulse">
        {/* Skeleton for "Showing X out of Y" text */}
        <Skeleton className="h-4 w-36 md:w-48 inline-block bg-gray-200 rounded-md" />

        {/* Skeleton for pagination buttons */}
        <div className="float-right flex space-x-2">
          <Skeleton className="w-[36px] h-[36px] bg-gray-200 rounded-lg" /> {/* Left arrow button */}
          <Skeleton className="w-[36px] h-[36px] bg-gray-200 rounded-lg" /> {/* Right arrow button */}
        </div>
      </div>
    </div>
  );
};

export default NotificationSkeleton;
