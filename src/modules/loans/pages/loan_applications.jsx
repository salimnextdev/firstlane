import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoans, filterLoans } from '@/modules/loans/state/loanSlice';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import BackButton from '@/components/BackButton';

import { ReactComponent as Dot } from '@/assets/icons/dot.svg';

import LoanCard from "@/modules/loans/components/LoanCard";
import TableFilter from '@/components/TableFilter';
import Pagination from '@/components/Pagination';
import NoContent from '@/components/NoContent';
import LoanSkeletonCard from '../components/loanSkeletonCard';
import LoanSkeletonTable from '../components/loanSkeletonTable';
import { formatDateTime } from '@/utils/datetimeFormats';

const LIMIT = 10;

const LoanApplications = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchTerm } = useSelector((state) => state.search);
    const { loans: loans, metaData: metaData, loading: loading, error: error } = useSelector((state) => state.loan);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchLoans({ page: 1, limit: LIMIT }));
        }
    }, [dispatch]);

    const [showDropdown, setShowDropdown] = useState(null);
    const [selectedInvestments, setSelectedInvestments] = useState([]);

    // const [fLoans, setFilteredLoans] = useState([]);
    // useEffect(()=> {
    //     setFilteredLoans(
    //         !searchTerm ? loans : loans.filter((loan) => (
    //             loan.loanType?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    //             loan.purpose?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
    //             loan.status?.toLowerCase()?.includes(searchTerm.toLowerCase())
    //             ))
    //     );
    // }, [searchTerm, loans]);

    const fLoans = !searchTerm ? loans : loans.filter((loan) => (
        loan.amount == searchTerm ||
        loan.loanType?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        loan.purpose?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        loan.status?.toLowerCase()?.includes(searchTerm.toLowerCase())
    ));

    const handleSelectAll = (checked) => {
        if (checked) {
            setSelectedInvestments(loans.map(loan => loan?._id));
        } else {
            setSelectedInvestments([]);
        }
    };

    const handleSelectInvestment = (loanId, checked) => {
        if (checked) {
            setSelectedInvestments([...selectedInvestments, loanId]);
        } else {
            setSelectedInvestments(selectedInvestments.filter(id => id !== loanId));
        }
    };

    const isAllSelected = loans.length > 0 && selectedInvestments.length === loans.length;

    const [filters, setFilters] = useState({
        types: '',
        statuses: '',
        datePeriod: '',
        // currencyPairs: '',
    });

    const filterOptions = {
        types: ['Personal', 'Business', 'Employee', 'Asset-finance'],
        statuses: ['Approved', 'Pending', 'Failed'],
        datePeriod: ['Today', 'Last 7 days', 'Last 30 days', 'Last 90 days', 'Last 360 days'],
        // currencyPairs: ['USD/EUR', 'GBP/USD', 'JPY/CAD'],
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            types: '',
            statuses: '',
            datePeriod: '',
            currencyPairs: '',
        });
    };
    const keyRenamingMap = {
        types: 'loanType',
        statuses: 'status'
    };

    const filterData = Object.fromEntries(
        Object.entries(filters)
            .filter(([key, value]) => value !== '')
            .map(([key, value]) => {
                const newKey = keyRenamingMap[key] || key;
                return [newKey, value.toLowerCase()];
            })
    );

    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setTotalPages(metaData?.totalPage);
    }, [loans]);

    useEffect(() => {
        if (Object.keys(filterData).length > 0) {
            dispatch(filterLoans({ credentials: filterData, page: currentPage, limit: LIMIT }));
        } else {
            dispatch(fetchLoans({ page: currentPage, limit: LIMIT }));
        }
    }, [currentPage, filters]);

    // useEffect(() => {
    //     Object.keys(filterData).length > 0 && dispatch(filterLoans({ credentials: filterData, page: 1, limit: LIMIT }));
    // }, [filters]);

    return (
        <div className="space-y-5">
            <BackButton />

            {/* DESKTOP ::::  Loan Application Table */}
            <div className="hidden md:block w-full border border-gray rounded-lg">
                <div className="flex items-center justify-between px-5 py-3">
                    <h2 className="md:text-[20px] font-medium text-tertiary">Loan Applications</h2>
                    <div className="flex items-center space-x-2">
                        <TableFilter
                            filterOptions={filterOptions}
                            filters={filters}
                            onFilterChange={handleFilterChange}
                            onClearFilters={handleClearFilters}
                        />
                    </div>
                </div>

                {(loading || fLoans.length) > 0 ? (
                    <Table className="w-full overflow-x-auto">
                        <TableHeader className="bg-light">
                            <TableRow className="border-b border-gray">
                                <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                    <input
                                        type="checkbox"
                                        checked={isAllSelected}
                                        onChange={e => handleSelectAll(e.target.checked)}
                                        className="h-4 w-4 accent-[#3E4095] rounded border border-gray-300 cursor-pointer"
                                    />
                                </TableHead>
                                <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                    Amount
                                </TableHead>
                                <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                    Type
                                </TableHead>
                                <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                    Purpose
                                </TableHead>
                                <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                    Date & Time
                                </TableHead>
                                <TableHead className="text-left px-6 py-3 text-xs font-normal">
                                    Status
                                </TableHead>
                                <TableHead className="text-left px-6 py-3 text-xs font-normal"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="">
                            {loading ? (
                                // Render 6 skeleton table rows when loading is true
                                Array.from({ length: 6 }).map((_, index) => (
                                    <LoanSkeletonTable key={index} />
                                ))
                            ) : fLoans.map(loan => (
                                <TableRow key={loan._id} className="text-sm font-light border-b border-gray-200 last:border-b-0">
                                    <TableCell className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedInvestments.includes(loan._id)}
                                            onChange={e => handleSelectInvestment(loan._id, e.target.checked)}
                                            className="h-4 w-4 accent-[#3E4095] rounded border-gray-300 cursor-pointer"
                                        />
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        ₦{loan?.amountRequested?.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })}
                                    </TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-normal rounded-full bg-gray-100 text-gray-600 capitalize">
                                            {loan?.loanType}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4">{loan?.purpose}</TableCell>
                                    <TableCell className="px-6 py-4">{formatDateTime(loan?.createdAt)}</TableCell>
                                    <TableCell className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-normal capitalize rounded-full
                                                ${loan?.status === 'approved' ? 'bg-success' :
                                                    loan?.status === 'pre-approved' ? 'bg-neutral' :
                                                        loan?.status === 'pending' ? 'bg-warning' :
                                                            'bg-danger'
                                                }`}
                                        >
                                            {loan?.status}
                                        </span>
                                    </TableCell>
                                    <TableCell className="px-6 py-4 relative">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <button
                                                    className="border border-gray-200 p-1 rounded-lg w-8 h-8 flex items-center justify-center
                                                focus-visible:outline-none focus-visible:ring-0 cursor-pointer"
                                                    aria-label="Open menu" // Added for accessibility
                                                >
                                                    <Dot className="" />
                                                </button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-40 z-10 bg-white text-left rounded-xl border border-gray-200 cursor-pointer">
                                                <DropdownMenuItem onClick={() => navigate(`/loans/applications/${loan.id}`)}>
                                                    <span className='font-light cursor-pointer'>View details</span>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <NoContent icon="loans" title="No loan applications" description="Start your loan application journey by creating your first loan application." />
                )}
            </div>

            {/* MOBILE ::::  Loan Application Table */}
            <div className='md:hidden space-y-4'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Loan Applications</p>
                    {/* <div className="border border-gray-200 p-1 rounded-lg w-8 h-8 flex items-center justify-center">
                        <Filter className="" />
                    </div> */}
                    <TableFilter
                        filterOptions={filterOptions}
                        filters={filters}
                        onFilterChange={handleFilterChange}
                        onClearFilters={handleClearFilters}
                    />
                </div>

                {(loading || fLoans.length) > 0 ? (
                    <div className='space-y-2' id='mobile_transaction_card'>
                        {loading ? (
                            // Render 6 skeleton cards when loading is true
                            Array.from({ length: 6 }).map((_, index) => (
                                <LoanSkeletonCard key={index} />
                            ))
                        ) : fLoans.map((loan, index) => (
                            <div key={index} onClick={() => navigate(`/loans/applications/${loan.id}`)}>
                                <LoanCard loan={loan} />
                            </div>

                        ))}
                    </div>
                ) : (
                    <NoContent icon="loans" title="No loan applications" description="Start your loan application journey by creating your first loan application." />
                )}
            </div>

            {/* Pagination */}
            <Pagination
                className={`flex ${(fLoans.length == 0 || loading) && 'hidden'}`}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default LoanApplications;
