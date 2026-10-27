import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, TableCell } from "@/components/ui/table";

const TransactionSkeletonTable = () => {
    return (
        <TableRow
          className="text-sm border-b border-gray-200 last:border-b-0 animate-pulse"
        >
          {/* User Profile column */}
          <TableCell className="flex-1">
            <div className="flex items-center gap-2">
              {/* Avatar placeholder */}
              <Skeleton className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="space-y-1">
                {/* Full name placeholder */}
                <Skeleton className="h-4 w-24 bg-gray-200" />
                {/* Email placeholder */}
                <Skeleton className="h-3 w-32 bg-gray-200" />
              </div>
            </div>
          </TableCell>
          {/* Amount column */}
          <TableCell className="flex-1">
            <Skeleton className="h-5 w-24 bg-gray-200 rounded-md" />
          </TableCell>
          {/* Transaction Type column */}
          <TableCell className="flex-1">
            <Skeleton className="h-6 w-24 bg-gray-200 rounded-full" />
          </TableCell>
          {/* Date column */}
          <TableCell className="flex-1">
            <Skeleton className="h-5 w-28 bg-gray-200 rounded-md" />
          </TableCell>
          {/* Status column */}
          <TableCell className="flex-1">
            <Skeleton className="h-6 w-20 bg-gray-200 rounded-full" />
          </TableCell>
          {/* Dropdown Menu column */}
          <TableCell className="w-16 px-6 py-4 relative flex-shrink-0">
            <Skeleton className="h-8 w-8 bg-gray-200 rounded-lg" />
          </TableCell>
        </TableRow>
    )
}

export default TransactionSkeletonTable;