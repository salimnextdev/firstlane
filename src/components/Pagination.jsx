import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalPages, currentPage, onPageChange, className }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind's 'md' breakpoint
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisibleButtons = isMobile ? 5 : 7; // Total max buttons (including 1, totalPages, and one ellipsis)
    const boundaryBuffer = isMobile ? 2 : 3; // How many pages visible at start/end before ellipsis (e.g., 1,2,3 for desktop)

    // Case 1: Total pages are few, show all.
    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Always include the first page
    pages.push(1);

    // Determine if currentPage is near start, near end, or in the middle.
    const isNearStart = currentPage <= boundaryBuffer; // e.g., mobile: current <= 3 (1,2,3)
    const isNearEnd = currentPage >= totalPages - (boundaryBuffer - 1); // e.g., mobile: current >= totalPages - 2 (18,19,20 for total 20)

    if (isNearStart) {
      // Example: 1 2 3 ... 20 (mobile) / 1 2 3 4 ... 20 (desktop)
      for (let i = 2; i <= maxVisibleButtons - 2; i++) { // -2 for 1 and totalPages
        pages.push(i);
      }
      pages.push('ellipsis');
    } else if (isNearEnd) {
      // Example: 1 ... 18 19 20 (mobile) / 1 ... 17 18 19 20 (desktop)
      pages.push('ellipsis');
      for (let i = totalPages - (maxVisibleButtons - 3); i <= totalPages - 1; i++) { // -3 for 1, totalPages, and ellipsis
        pages.push(i);
      }
    } else {
      // Middle Case: 1 ... currentPage ... totalPages
      // On mobile, this will specifically be: 1 ... currentPage totalPages (only one ellipsis)
      // On desktop, it will be: 1 ... current-N ... current+N ... totalPages (two ellipses if range is wide)

      pages.push('ellipsis'); // Always add the first ellipsis for the middle case

      if (isMobile) {
        // Mobile specific: only show currentPage in the middle
        pages.push(currentPage);
        // Do NOT add a second ellipsis here for mobile
      } else {
        // Desktop: show multiple pages around currentPage
        const desktopPagesAroundCurrent = Math.floor((maxVisibleButtons - 5) / 2); // 5 for 1, 2xEllipsis, totalPages
        let startMiddle = currentPage - desktopPagesAroundCurrent;
        let endMiddle = currentPage + desktopPagesAroundCurrent;

        // Adjust to ensure the range fits within (2, totalPages-1)
        startMiddle = Math.max(2, startMiddle);
        endMiddle = Math.min(totalPages - 1, endMiddle);

        // Fill middle numbers
        for (let i = startMiddle; i <= endMiddle; i++) {
          pages.push(i);
        }

        // Add second ellipsis for desktop if needed
        if (endMiddle < totalPages - 1) {
          pages.push('ellipsis');
        }
      }
    }

    // Always include the last page
    pages.push(totalPages);

    // Final cleanup for potential duplicates and ensuring a single ellipsis rule (for general case, if logic creates more)
    const uniqueAndCleaned = [];
    const seenNumbers = new Set();
    let lastPushedWasEllipsis = false;

    for (const page of pages) {
        if (page === 'ellipsis') {
            // Only add ellipsis if the last element wasn't already an ellipsis
            // AND if there's actually a gap it represents (e.g., don't add between 1 and 2)
            const lastNum = uniqueAndCleaned[uniqueAndCleaned.length - 1];
            const nextNumInSource = pages[pages.indexOf(page) + 1];

            if (!lastPushedWasEllipsis &&
                !(typeof lastNum === 'number' && typeof nextNumInSource === 'number' && nextNumInSource === lastNum + 1)) {
                uniqueAndCleaned.push(page);
                lastPushedWasEllipsis = true;
            }
        } else if (typeof page === 'number') {
            if (!seenNumbers.has(page)) {
                uniqueAndCleaned.push(page);
                seenNumbers.add(page);
            }
            lastPushedWasEllipsis = false;
        }
    }

    return uniqueAndCleaned;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className={`flex items-center justify-center space-x-2 p-3 text-sm border border-gray rounded-lg ${className}`}>
      <button
        className="w-9 h-9 flex items-center justify-center border border-gray rounded-md hover:bg-gray-50 disabled:opacity-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((pageNum, index) => (
        pageNum === 'ellipsis' ? (
          <div key={`ellipsis-${index}`} className="w-9 h-9 flex items-center justify-center text-[#98A2B3]">
            ...
          </div>
        ) : (
          <button
            key={pageNum}
            className={`w-9 h-9 flex items-center justify-center rounded-md ${
              pageNum === currentPage
                ? 'bg-light border border-gray-200'
                : 'text-[#98A2B3] hover:bg-gray-50'
            }`}
            onClick={() => onPageChange(pageNum)}
            aria-current={pageNum === currentPage ? 'page' : undefined}
            aria-label={`Page ${pageNum}`}
          >
            {pageNum}
          </button>
        )
      ))}

      <button
        className="w-9 h-9 flex items-center justify-center border border-gray rounded-md hover:bg-gray-50 disabled:opacity-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;