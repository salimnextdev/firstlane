import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

const WalletSkeletonTable = () => {
    return (
        <TableRow className="text-sm border-b border-gray-200 last:border-b-0 animate-pulse">
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
    );
};

export default WalletSkeletonTable;