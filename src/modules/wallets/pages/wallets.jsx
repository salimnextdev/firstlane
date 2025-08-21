import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance, fetchTransactions } from '@/modules/wallets/state/walletSlice';
import { getCookie } from '@/utils/cookieUtils';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from '@/components/ui/checkbox';

import { IoIosSearch } from 'react-icons/io';
import { BsArrowRight } from 'react-icons/bs';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';
import { ReactComponent as WalletPlus } from '@/assets/icons/wallet-plus.svg';
import { ReactComponent as Money } from '@/assets/icons/money.svg';
import { ReactComponent as EyeOpen } from '@/assets/icons/eye-open.svg';
import { ReactComponent as EyeClose } from '@/assets/icons/eye-close.svg';
import { ReactComponent as Dot } from '@/assets/icons/dot.svg';

import SendMoneyModal from '@/modules/wallets/components/sendWithdrawModal';
import FundAccountModal from '@/modules/investments/components/fundAccountModal';
import WalletCard from '@/modules/wallets/components/WalletCard';
import WalletSkeletonTable from '@/modules/wallets/components/walletSkeletonTable';
import WalletSkeletonCard from '@/modules/wallets/components/walletSkeletonCard';
import TableFilter from '@/components/TableFilter';
import Pagination from '@/components/Pagination';
import NoContent from '@/components/NoContent';

import { Loader } from 'lucide-react';
import { formatDateTime } from '@/utils/datetimeFormats';
import { filterTransactions } from '@/utils/filters';

const LIMIT = 10;

const Wallets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);

    const {
        balance: balance,
        transactions: all_transactions,
        metaData: metaData,
        loading: loading,
        error: error,
        transaction_loading: transaction_loading,
        transaction_error: transaction_error,
    } = useSelector((state) => state.wallet);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchBalance(user?._id));
            dispatch(fetchTransactions({
                userID: user?._id,
                page: 1,
                limit: LIMIT,
            }))
        }
    }, [dispatch]);

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [statsView, setStatsView] = useState(true);
    const [modal, setModal] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const openModal = (type) => {
        setModal(type);
        setIsOpen(true);
    };    

    const [filters, setFilters] = useState({
        statuses: '',
        paymentTypes: '',
    });

    const filterOptions = {
        statuses: ['Successful', 'Pending', 'Failed'],
        paymentTypes: ['Wallet funding', 'Money sent'],
    };

    useEffect(() => {
        const filtered = filterTransactions({
            transactions: all_transactions,
            filters,
            search,
        });

        setTransactions(filtered);
    }, [filters, search, all_transactions]);


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            statuses: '',
            paymentTypes: '',
        });
    };

    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    useEffect(() => {
        setTotalPages(parseInt(metaData?.total_pages || 0));
        // setCurrentPage(parseInt(metaData?.current_page));
    }, [transactions]);

    useEffect(() => {
        dispatch(fetchTransactions({
            userID: user?._id,
            page: currentPage,
            limit: LIMIT
        }));
    }, [currentPage]);

    return (
        <div className="relative space-y-3 md:space-y-6">
            {modal === "fund_wallet" &&
                <FundAccountModal
                    isOpen={isOpen}
                    onClose={setIsOpen}
                />
            }
            {modal === "send_money" &&
                <SendMoneyModal
                    isOpen={isOpen}
                    onClose={setIsOpen}
                    type='send'
                />
            }

            <div>
                <h2 className="text-xl md:text-2xl font-semibold">Wallets</h2>
                <p className="text-sm text-gray-500 my-1 font-light">Fund, send and receive money into your wallet easily 💰</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black text-white p-5 rounded-xl">
                <div className="flex justify-between">
                    <div className=''>
                        <p className="text-sm text-gray-300 mb-2">Wallet balance</p>
                        <div className='flex items-center gap-5 justify-between mt-5'>
                            <p className="text-xl md:text-2xl font-semibold">
                                {statsView ? (
                                    loading ? (
                                        <Loader rotate={360} className='w-8 h-8 animate-spin mx-auto' />
                                    ) : (
                                        // Add an explicit check if balance?.available_balance is NOT a number
                                        typeof balance?.available_balance === 'number'
                                            ? '₦' + (balance.available_balance ?? 0.00).toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })
                                            : '₦0.00' // Or '₦...' or another temporary placeholder
                                    )
                                ) : (
                                    '*************'
                                )}
                            </p>
                            {loading ? null : statsView ?
                                <EyeClose
                                    onClick={() => setStatsView(!statsView)}
                                    className="text-secondary cursor-pointer"
                                /> :
                                <EyeOpen
                                    onClick={() => setStatsView(!statsView)}
                                    className="text-secondary cursor-pointer"
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className='hidden md:block border-l-3 border-[#344054]'>
                    <div className='flex items-center justify-between md:px-32'>
                        <button
                            onClick={() => openModal("fund_wallet")}
                            className='space-y-2 flex flex-col items-center text-sm text-white cursor-pointer select-none'
                            disabled={loading}
                        >
                            <div className='w-[48px] h-[48px] flex items-center justify-center bg-light !text-black rounded-full'>
                                <WalletPlus />
                            </div>
                            <p className='cursor-pointer'>Fund wallet</p>
                        </button>
                        <button
                            onClick={() => openModal("send_money")}
                            className='space-y-2 flex flex-col items-center text-sm text-white cursor-pointer select-none'
                            disabled={loading}
                        >
                            <div className='w-[48px] h-[48px] flex items-center justify-center bg-light !text-black rounded-full'>
                                <Money />
                            </div>
                            <p className='cursor-pointer'>Send money</p>
                        </button>
                    </div>
                </div>
            </div>


            <div className='w-full md:hidden flex items-center gap-3 text-sm'>
                <div
                    onClick={() => openModal("fund_wallet")}
                    className='w-full flex items-center justify-center gap-2 bg-light p-2 px-3 rounded-lg border border-gray select-none'
                >
                    <WalletPlus />
                    <p>Fund wallet</p>
                </div>
                <div
                    onClick={() => openModal("send_money")}
                    className='w-full flex items-center justify-center gap-2 bg-light p-2 px-3 rounded-lg border border-gray select-none'
                >
                    <Money />
                    <p>Send money</p>
                </div>
            </div>

            {/* Recent Transactions Table */}
            <div className="hidden md:block w-full rounded-lg border border-gray bg-white">
                <div className="">
                    <div className="flex items-center justify-between p-4">
                        <h2 className="text-nowrap text-xl font-medium text-tertiary">Recent Wallet Transactions</h2>
                        <div className="w-full flex items-center justify-end gap-2">
                            <div className="w-4/12 relative">
                                <IoIosSearch className="w-5 h-5 absolute top-2.5 left-3 text-gray-600" />
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="w-full h-[40px] pl-10 pr-4 rounded-md border border-gray text-sm focus:outline-gray-200"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>

                            <TableFilter
                                filterOptions={filterOptions}
                                filters={filters}
                                onFilterChange={handleFilterChange}
                                onClearFilters={handleClearFilters}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto text-secondary">
                        {(transaction_loading || transactions.length) > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-light border-b border-gray">
                                        <TableHead className="w-12 p-4">
                                            <Checkbox className="!accent-[var(--firstlane-primary)]" />
                                        </TableHead>
                                        <TableHead className="font-medium text-xs">Amount</TableHead>
                                        <TableHead className="font-medium text-xs">Payment type</TableHead>
                                        <TableHead className="font-medium text-xs">Date & time</TableHead>
                                        <TableHead className="font-medium text-xs">Status</TableHead>
                                        <TableHead className="font-medium text-xs"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className='text-sm text-secondary'>
                                    {transaction_loading ? (
                                        Array.from({ length: LIMIT }).map((_, index) => (
                                            <WalletSkeletonTable key={index} />
                                        ))
                                    ) : transactions.map((transaction) => (
                                        <TableRow key={transaction?.reference} className="text-sm border-b border-gray">
                                            <TableCell className="p-4">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="font-light">₦{transaction?.amount?.toLocaleString(undefined, {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2,
                                            })}</TableCell>
                                            <TableCell className="font-light">
                                                <span className="px-3 py-1 text-xs font-normal rounded-full bg-gray-100 text-gray-600">
                                                    {transaction?.type == "D" ? "Money sent" : "Money received"}
                                                </span>
                                            </TableCell>
                                            <TableCell className="font-light">{formatDateTime(transaction?.date)}</TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 text-xs font-normal capitalize rounded-full
                                                ${transaction.status === 'successful' ? 'bg-success' :
                                                            transaction.status === 'pending' ? 'bg-warning' :
                                                                'bg-danger'
                                                        }`}
                                                >
                                                    {transaction.status}
                                                </span>
                                            </TableCell>
                                            <TableCell className="w-[5%] px-6 py-4 relative">
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
                                                        <DropdownMenuItem onClick={() => navigate(`/wallets/all/${transaction?.reference}`)}>
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
                            <NoContent
                                icon="wallets"
                                title="No wallet transactions found"
                                description="We couldn't find any wallet transactions to display at the moment."
                                className="hidden md:flex"
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* MOBILE ::::  Wallet Cards */}
            <div className='md:hidden space-y-4'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Wallet transactions</p>
                    <Link to={'/wallets/all'} className='flex items-center gap-2 text-sm'>
                        <span className='font-light'>View all</span>
                        <BsArrowRight className='w-4 h-4 text-secondary' />
                    </Link>
                </div>

                {(transaction_loading || transactions.length) > 0 ? (
                    <div className='space-y-2' id='mobile_transaction_card'>
                        {transaction_loading ? (
                            Array.from({ length: LIMIT }).map((_, index) => (
                                <WalletSkeletonCard key={index} />
                            ))
                        ) : transactions.map((transaction, index) => (
                            <div key={index} onClick={() => navigate(`/wallets/all/${transaction?.reference}`)}>
                                <WalletCard transaction={transaction} />
                            </div>

                        ))}
                    </div>
                ) : (
                    <NoContent
                        icon="wallets"
                        title="No wallet transactions found"
                        description="We couldn't find any wallet transactions to display at the moment."
                    />

                )}
            </div>

            {/* Pagination */}
            <Pagination
                className={`${(transactions.length == 0 || transaction_loading) ? 'hidden' : 'hidden md:flex'}`}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Wallets;
