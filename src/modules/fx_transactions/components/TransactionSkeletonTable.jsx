import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableRow, TableCell } from "@/components/ui/table";

const TransactionSkeletonTable = () => {
  return (
    <TableRow className="text-sm font-light border-b border-gray-200 last:border-b-0 animate-pulse">
      {/* Checkbox column */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-4 w-4 bg-gray-200 rounded-sm" />
      </TableCell>
      {/* Amount Requested column */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-5 w-24 bg-gray-200 rounded-md" />
      </TableCell>
      {/* Loan Type column */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-6 w-20 bg-gray-200 rounded-md" />
      </TableCell>
      {/* Purpose column */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-5 w-40 bg-gray-200 rounded-md" />
      </TableCell>
      {/* Amount Requested (duplicate, based on original) column */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-5 w-24 bg-gray-200 rounded-md" />
      </TableCell>
      {/* Status column */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-6 w-20 bg-gray-200 rounded-full" />
      </TableCell>
      {/* Dropdown Menu column */}
      <TableCell className="px-6 py-4">
        <Skeleton className="h-8 w-8 bg-gray-200 rounded-lg" />
      </TableCell>
    </TableRow>
  );
};

export default TransactionSkeletonTable;
