import React from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton component path

/**
 * ChatHeaderSkeleton component displays a loading skeleton for the chat header.
 * It mimics the avatar, name, and details in the header.
 */
const ChatHeaderSkeleton = () => {
  return (
    <div className='flex items-center gap-3 animate-pulse'>
      {/* Skeleton for the back arrow (visible on mobile) */}
      <Skeleton className='h-6 w-6 md:hidden bg-gray-200 rounded-md' />
      {/* Skeleton for the avatar */}
      <Skeleton className='w-[40px] h-[40px] bg-gray-200 rounded-full' />
      <div className='flex md:flex-col items-center md:items-start gap-3 md:gap-0 text-sm'>
        {/* Skeleton for the main name/title */}
        <Skeleton className='h-5 w-24 bg-gray-200 rounded-md' />
        {/* Skeleton for the type and ID (partially hidden on desktop) */}
        <p className='flex items-center gap-3 text-xs'>
          <Skeleton className='h-4 w-16 bg-gray-200 rounded-md' />
          <Skeleton className='h-4 w-0.5 bg-gray-200 rounded-md md:hidden' />
          <Skeleton className='h-4 w-20 bg-gray-200 rounded-md md:hidden' />
        </p>
      </div>
    </div>
  );
};

/**
 * ChatBubbleSkeleton component displays a loading skeleton for a single chat message bubble.
 * It can render different types (text or file) and alignments (left or right).
 * @param {string} type - 'text' or 'file'
 * @param {string} alignment - 'left' or 'right'
 */
const ChatBubbleSkeleton = ({ type, alignment }) => {
  const isLeft = alignment === 'left';
  const bubbleBg = 'bg-gray-200';
  const textAlignment = isLeft ? 'justify-start' : 'justify-end';
  const borderRadiusStyle = isLeft
    ? { borderTopLeftRadius: 0 }
    : { borderBottomRightRadius: 0 };

  return (
    <div className={`w-full flex ${textAlignment}`}>
      <div className='w-11/12 lg:w-8/12 flex items-start gap-2'>
        {/* Left avatar (only for left-aligned messages on desktop) */}
        {isLeft && (
          <div className='w-1/12 hidden md:block'>
            <Skeleton className='w-[40px] h-[40px] bg-gray-200 rounded-full' />
          </div>
        )}
        <div className='w-full space-y-1 font-light'>
          <div className={`w-full p-3 rounded-xl md:rounded-2xl ${bubbleBg}`} style={borderRadiusStyle}>
            {type === 'file' ? (
              // File message skeleton
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3 text-sm'>
                  <Skeleton className='h-6 w-6 bg-gray-300 rounded-md' /> {/* File icon */}
                  <div className='space-y-1'>
                    <Skeleton className='h-4 w-32 bg-gray-300 rounded-md' /> {/* Filename */}
                    <Skeleton className='h-3 w-40 bg-gray-300 rounded-md' /> {/* File details */}
                  </div>
                </div>
                <Skeleton className='h-6 w-6 bg-gray-300 rounded-md' /> {/* Upload icon */}
              </div>
            ) : (
              // Text message skeleton
              <div className='text-sm leading-relaxed space-y-2'>
                <Skeleton className='h-4 w-full bg-gray-300 rounded-md' />
                <Skeleton className='h-4 w-11/12 bg-gray-300 rounded-md' />
                <Skeleton className='h-4 w-3/4 bg-gray-300 rounded-md' />
              </div>
            )}
          </div>
          {/* Timestamp skeleton */}
          <div className={`flex items-center ${isLeft ? 'justify-start' : 'justify-end'} text-xs`}>
            <Skeleton className='h-3 w-24 bg-gray-200 rounded-md' />
          </div>
        </div>
        {/* Right checkmark (only for right-aligned messages on desktop) */}
        {!isLeft && (
          <div className='hidden md:block w-[40px] h-[40px] flex items-center justify-center'>
            <Skeleton className='w-5 h-5 bg-gray-200 rounded-full' /> {/* Check icon */}
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * SupportChatSkeleton component displays a complete loading skeleton for a chat interface.
 * It includes the header, a "Today" divider, and various types of chat bubbles.
 */
const SupportChatSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Chat Header Skeleton */}
      <ChatHeaderSkeleton />

      {/* Chat Area Skeleton */}
      <div className={`mt-5 w-full space-y-5 h-[65vh] md:h-[60vh] overflow-hidden`}> {/* overflow-hidden to prevent scrollbar during load */}
        {/* "Today" divider skeleton */}
        <div className='flex items-center justify-center font-light animate-pulse'>
          <Skeleton className="h-5 w-16 bg-gray-200 rounded-full" />
        </div>

        {/* Left-aligned text message skeleton */}
        <ChatBubbleSkeleton type="text" alignment="left" />

        {/* Left-aligned file message skeleton */}
        <ChatBubbleSkeleton type="file" alignment="left" />

        {/* Right-aligned text message skeleton (multiple instances for variety) */}
        <ChatBubbleSkeleton type="text" alignment="right" />
        <ChatBubbleSkeleton type="text" alignment="right" />

        {/* Right-aligned file message skeleton */}
        <ChatBubbleSkeleton type="file" alignment="right" />
      </div>
    </div>
  );
};

export default SupportChatSkeleton;