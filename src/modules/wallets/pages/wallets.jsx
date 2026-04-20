import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBalance, fetchTransactions } from '@/modules/wallets/state/walletSlice';
import { getCookie } from '@/utils/cookieUtils';
import { toast } from 'sonner';

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

import { IoIosRefresh, IoIosSearch } from 'react-icons/io';
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
import { getTransactionType, verifyWalletTransaction } from '@/utils/genericFunc';
import FundOptionsModal from '@/modules/investments/components/fundOptionsModal';

const LIMIT = 10;

const Wallets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const reference = searchParams.get('tx_ref');
    const user = JSON.parse(getCookie('user') || null);
    const userId = user?._id || user?.userID;

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const [verifyingReference, setVerifyingReference] = useState(null);

    // After card checkout, Flutterwave redirects here with ?tx_ref=...
    // Verify, then refetch balance + transactions and clean the URL.
    useEffect(() => {
        if (!reference || !userId) return;

        let cancelled = false;

        (async () => {
            setVerifyingReference(reference);
            try {
                await verifyWalletTransaction(dispatch, reference).unwrap();
                if (cancelled) return;
                await dispatch(fetchBalance(userId));
                await dispatch(fetchTransactions({ userID: userId, page: 1, limit: LIMIT }));
                if (cancelled) return;
                setCurrentPage(1);
                navigate('/wallets', { replace: true });
                toast.success('Wallet updated', {
                    description: 'Your balance and transactions are up to date.',
                });
            } catch (error) {
                if (!cancelled) {
                    toast.error('Payment verification failed', {
                        description: error?.message || 'Could not confirm this payment.',
                    });
                }
            } finally {
                if (!cancelled) setVerifyingReference(null);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [reference, userId, dispatch, navigate]);

    const handleVerifyTransactionClick = async (txReference) => {
        if (!txReference || verifyingReference) return;
        setVerifyingReference(txReference);
        try {
            await verifyWalletTransaction(dispatch, txReference).unwrap();
            if (userId) {
                await dispatch(fetchBalance(userId));
                await dispatch(fetchTransactions({ userID: userId, page: currentPage, limit: LIMIT }));
            }
        } catch (error) {
            toast.error('Verification failed', {
                description: error?.message || 'Could not verify this transaction.',
            });
        } finally {
            setVerifyingReference(null);
        }
    };

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
        if (userId) {
            dispatch(fetchBalance(userId));
        }
    }, [dispatch, userId]);

    const refreshBalance = async () => {
        if (!userId) return;
        await dispatch(fetchBalance(userId));
        await dispatch(fetchTransactions({ userID: userId, page: currentPage, limit: LIMIT }));
    };

    const [transactions, setTransactions] = useState([]);
    const [search, setSearch] = useState('');
    const [statsView, setStatsView] = useState(true);
    const [modal, setModal] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const openModal = (type) => {
        setModal(type);
        setIsOpen(true);
    };

    // Removed status filter since all wallet transactions are automatically sucessfull
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

    useEffect(() => {
        if (!transaction_loading && userId) {
            dispatch(fetchTransactions({
                userID: userId,
                page: currentPage,
                limit: LIMIT
            }));
        }
    }, [currentPage, dispatch, userId]);

    return (
        <div className="relative space-y-3 md:space-y-6">
            {modal === "fund_wallet" &&
                // <FundAccountModal
                //     isOpen={isOpen}
                //     onClose={setIsOpen}
                // />
                <FundOptionsModal
                isOpen={isOpen}
                onClose={setIsOpen}
                option="bank_transfer"
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
                    <div className='w-full'>
                        <p className="text-sm text-gray-300 mb-2">Wallet balance</p>
                        <div className='flex items-center justify-between mt-5'>
                            <div className='flex items-center gap-5 justify-between'>
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

                            {!loading &&
                                <p onClick={refreshBalance}>
                                    <IoIosRefresh className='w-7 h-7 text-secondary cursor-pointer' />
                                </p>
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
                                    ) : transactions.map((transaction, index) => (
                                        <TableRow key={index} className="text-sm border-b border-gray">
                                            <TableCell className="font-light">
                                                ₦{transaction?.amount?.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2,
                                                }) || '--'}</TableCell>
                                            <TableCell className="font-light">
                                                <span className="px-3 py-1 text-xs font-normal rounded-full bg-gray-100 text-gray-600 capitalize">
                                                    {getTransactionType(transaction?.type, transaction?.remarks)}
                                                </span>
                                            </TableCell>
                                            <TableCell className="font-light">
                                                {formatDateTime(transaction?.createdAt || transaction?.date) || '--'}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.status?.toLowerCase() === 'pending' ?
                                                    <span
                                                        className={`px-3 py-1 text-xs font-normal capitalize rounded-full bg-neutral inline-flex items-center justify-center min-w-[4.5rem] min-h-[1.75rem] ${verifyingReference === transaction?.reference ? 'cursor-wait opacity-80' : 'cursor-pointer'}`}
                                                        onClick={() => handleVerifyTransactionClick(transaction?.reference)}
                                                        role="button"
                                                        tabIndex={0}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault();
                                                                handleVerifyTransactionClick(transaction?.reference);
                                                            }
                                                        }}
                                                    >
                                                        {verifyingReference === transaction?.reference ? (
                                                            <Loader className="w-4 h-4 animate-spin" aria-label="Verifying" />
                                                        ) : (
                                                            'verify'
                                                        )}
                                                    </span> :
                                                    <span
                                                        className={`px-3 py-1 text-xs font-normal capitalize rounded-full
                                                ${['completed', 'paid'].includes(transaction?.status) ? 'bg-success' :
                                                    transaction.status === 'pending' ? 'bg-warning' :
                                                        'bg-danger'
                                                }`}
                                                    >
                                                        {transaction?.status || 'N/A'}
                                                    </span>}
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
                                                        <DropdownMenuItem onClick={() => navigate(`/wallets/all/${transaction?._id}`)}>
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
                            <div key={index} onClick={() => navigate(`/wallets/all/${transaction?._id}`)}>
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
                totalPages={metaData?.totalPage}
                currentPage={currentPage || parseInt(metaData?.current_page)}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default Wallets;
