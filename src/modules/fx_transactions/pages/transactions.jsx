import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { fetchFXRates, fetchFXTransactions } from '@/modules/fx_transactions/state/fxSlice';
import { fetchCurrency } from '@/modules/fx_transactions/state/currencySlice';

import { IoIosInformationCircleOutline, IoIosSearch } from 'react-icons/io';
import { BsArrowRight } from 'react-icons/bs';
import { BiError } from "react-icons/bi";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';

import ConfirmModal from '@/modules/fx_transactions/components/confirmTransaction';
import CountrySelect from '@/components/FormInputs/CountrySelect';

import TableFilter from '@/components/TableFilter';
import Pagination from '@/components/Pagination';
import NoContent from '@/components/NoContent';
import TransactionSkeletonTable from '../components/TransactionSkeletonTable';
import FxRatesLoader from '../components/fxRateLoader';
import { formatDateTime } from '@/utils/datetimeFormats';

const LIMIT = 10;

const FXTransactions = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { searchTerm } = useSelector((state) => state.search);
    const {
        fx_transactions: fx_transactions,
        metaData: metaData,
        fx_rates: fx_rates,
        loading: loading, error: error,
        rates_loading: rates_loading, rates_error: rates_error
    } = useSelector((state) => state.fx);
    const { currencies: currencies } = useSelector((state) => state.currency);

    useEffect(() => {
        if (!loading || !rates_loading) {
            dispatch(fetchFXTransactions({ page: 1, limit: LIMIT }));
            dispatch(fetchFXRates({ page: 1, limit: LIMIT }));
            dispatch(fetchCurrency({ page: 1, limit: LIMIT }))
        }
    }, [dispatch]);

    const [currencyPairs, setCurrencyPairs] = useState([]);
    useEffect(() => {
        setCurrencyPairs(fx_rates.map(rate =>
            `${rate?.baseCurrency?.currencyID?.code}/${rate?.targetCurrency?.currencyID?.code}`
        ));
    }, [fx_rates]);

    // Filter transactions based on global search or page search
    const transactions = !searchTerm ? fx_transactions : fx_transactions.filter((transaction) => (
        transaction?.fromCurrency?.value == searchTerm ||
        transaction?.toCurrency?.value == searchTerm ||
        transaction?.fromCurrency?.currencyID?.code?.toLowerCase(searchTerm.toLowerCase()) ||
        transaction?.toCurrency?.currencyID?.code?.toLowerCase(searchTerm.toLowerCase()) ||
        transaction?.status?.toLowerCase()?.includes(searchTerm.toLowerCase())
    ));

    const [isOpen, setIsOpen] = useState(false);
    const [option, setOption] = useState('Sell');
    const [buy, setBuy] = useState(0.00);
    const [sell, setSell] = useState(0.00);
    const [buyCurrency, setBuyCurrency] = useState('NGN');
    const [sellCurrency, setSellCurrency] = useState('USD');
    const [selectedRate, setSelectedRate] = useState(null);
    useEffect(() => {
        const rate = fx_rates.find(rate =>
            (rate?.baseCurrency?.currencyID?.code === sellCurrency &&
                rate?.targetCurrency?.currencyID?.code === buyCurrency) ||
            (rate?.baseCurrency?.currencyID?.code === buyCurrency &&
                rate?.targetCurrency?.currencyID?.code === sellCurrency)
        );

        if (buyCurrency === rate?.baseCurrency?.currencyID?.code) {
            setBuy(rate?.baseCurrency?.value || 0.00);
            setSell(rate?.targetCurrency?.value || 0.00);
            setSelectedRate({
                _id: rate?._id,
                baseCurrency: rate?.targetCurrency,
                targetCurrency: rate?.baseCurrency
            });
            setOption('Sell');
        } else {
            setBuy(rate?.targetCurrency?.value || 0.00);
            setSell(rate?.baseCurrency?.value || 0.00);
            setSelectedRate({
                _id: rate?._id,
                baseCurrency: rate?.baseCurrency,
                targetCurrency: rate?.targetCurrency
            });
            setOption('Buy');
        }
    }, [buyCurrency, sellCurrency, fx_rates]);

    const updateSell = (e) => {
        const { name, value } = e.target;
        setSell(value);
        const rateBuyValue = parseFloat(selectedRate?.baseCurrency?.value) || 0;
        const rateSellValue = parseFloat(selectedRate?.targetCurrency?.value) || 0;

        if (option === 'Sell') {
            setBuy((value * rateSellValue).toFixed(2));
        } else if (option === 'Buy') {
            setBuy((value / rateBuyValue).toFixed(2));
        }
    };

    const [filters, setFilters] = useState({
        statuses: '',
        currencyPairs: '',
    });

    const filterOptions = {
        statuses: ['Successful', 'Pending', 'Failed'],
        // currencyPairs: ['USD/EUR', 'GBP/USD', 'JPY/CAD'],
        currencyPairs: currencyPairs,
    };

    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    const handleClearFilters = () => {
        setFilters({
            statuses: '',
            currencyPairs: '',
        });
    };

    const [totalPages, setTotalPages] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        setTotalPages(metaData?.totalPage);
    }, [fx_transactions]);

    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            // dispatch(filterLoans({ credentials: filters, page: currentPage, limit: LIMIT }));
        } else {
            dispatch(fetchFXTransactions({ page: currentPage, limit: LIMIT }));
        }
    }, [currentPage, filters]);

    return (
        <div className="relative space-y-3 md:space-y-6">
            <ConfirmModal
                isOpen={isOpen}
                onClose={setIsOpen}
                type={option}
                rate={selectedRate}
                fx={{
                    buy: buy,
                    sell: sell
                }}
                data={{
                    acc_number: "0123456789",
                    acc_name: "Firstlane Multi Investment LTD",
                    bank_name: "City Morgage Bank",
                    type: "Checking",
                    wire: "567890",
                    ach: "012345",
                }}
            />
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-2'>
                <div>
                    <h2 className="text-xl md:text-2xl font-semibold">FXTransactions</h2>
                    <p className="text-sm text-gray-500 my-1 font-light">Track and manage your FX transactions safely 💰</p>
                </div>
                {/* <div className='flex items-center gap-3'>
                    <button
                        onClick={() => setOption('Buy')}
                        className={`w-16 h-9 ${option === 'Buy' ? 'bg-[#D8D9EA] text-primary' : 'border border-gray'} text-sm rounded-md cursor-pointer`}
                    >
                        Buy
                    </button>
                    <button
                        onClick={() => setOption('Sell')}
                        className={`w-16 h-9 ${option === 'Sell' ? 'bg-[#D8D9EA] text-primary' : 'border border-gray'} text-sm rounded-md cursor-pointer`}
                    >
                        Sell
                    </button>
                </div> */}
            </div>

            <div className='space-y-3'>
                {/* Stat Cards */}
                <div className='space-y-2 md:space-y-3'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        <div className='p-5 space-y-3 bg-white border border-gray rounded-xl'>
                            {/* <p className="text-sm text-secondary">{option === 'Buy' ? 'By selling' : 'To buy'}</p> */}
                            <p className="text-sm text-secondary">You sell</p>
                            <div className='flex items-center justify-between'>
                                <div className='w-[60%] md:w-[80%] flex items-center gap-0.5'>
                                    <p className="text-2xl md:text-[28px] font-semibold text-secondary">
                                        <span className='mr-1 text-black dark:text-gray-500'>
                                            {selectedRate?.baseCurrency?.currencyID?.symbol || '₦'}
                                        </span>
                                        {/* {sell?.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }) || "0.00"} */}
                                    </p>
                                    <input
                                        type="text"
                                        className='w-full text-2xl md:text-[28px] font-semibold text-secondary focus:outline-none'
                                        value={sell?.toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }) || "0.00"}
                                        onChange={(e) => updateSell(e)}
                                        disabled={buy == 0.00 || sell == 0.00}
                                    />
                                </div>
                                <CountrySelect
                                    currencies={currencies}
                                    loading={rates_loading}
                                    value={sellCurrency}
                                    onChange={(c) => setSellCurrency(c.code)}
                                />
                            </div>
                        </div>
                        <div className='p-5 space-y-3 bg-white border border-gray rounded-xl'>
                            {/* <p className="text-sm text-secondary">{option === 'Buy' ? 'By selling' : 'To buy'}</p> */}
                            <p className="text-sm text-secondary">You Receive</p>
                            <div className='flex items-center justify-between'>
                                <p className="text-2xl md:text-[28px] font-semibold text-secondary">
                                    <span className='mr-1 text-black dark:text-gray-500'>
                                        {selectedRate?.targetCurrency?.currencyID?.symbol || '$'}
                                    </span>
                                    {buy?.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }) || "0.00"}</p>
                                <CountrySelect
                                    currencies={currencies}
                                    loading={rates_loading}
                                    value={buyCurrency}
                                    onChange={(c) => setBuyCurrency(c.code)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Info Prompt to help the user under the action they want to take */}
                    {(buy !== 0.00 || sell !== 0.00) && !rates_loading &&
                        <div className='flex flex-col md:flex-row md:items-center gap-1 md:gap-2 p-2 px-5 text-sm bg-warning rounded-md'>
                            <IoIosInformationCircleOutline className='w-5 h-5' />
                            {`You're about to exchange 
                            ${selectedRate?.baseCurrency?.currencyID?.symbol} ${selectedRate?.baseCurrency?.value}
                            (${selectedRate?.baseCurrency?.currencyID?.name}) for
                            ${selectedRate?.targetCurrency?.currencyID?.symbol} ${selectedRate?.targetCurrency?.value}
                            (${selectedRate?.targetCurrency?.currencyID?.name}).
                            This means you'll receive 
                            ${selectedRate?.targetCurrency?.currencyID?.symbol} ${buy}
                            in return for selling 
                            ${selectedRate?.baseCurrency?.currencyID?.symbol} ${sell}
                            at the current exchange rate.`}
                        </div>
                    }

                    {/* Error Prompt when no currency pair is found  */}
                    {(buy === 0.00 || sell === 0.00) && !rates_loading &&
                        <div className='flex flex-col md:flex-row md:items-center gap-1 md:gap-2 p-2 px-5 text-sm bg-danger rounded-md'>
                            <BiError className='w-5 h-5' />
                            The foreign exchange rate for the selected currency pair is currently unavailable. Please verify the currency codes or try again later.
                        </div>
                    }
                    <button
                        onClick={() => setIsOpen(true)}
                        className={`px-4 h-11 md:h-9 bg-primary text-sm rounded-md cursor-pointer 
                            ${rates_loading || (buy == 0.00 || sell == 0.00) && 'opacity-70'}`}
                        disabled={rates_loading || (buy == 0.00 || sell == 0.00)}
                    >
                        {/* {option} Naira */}
                        Sell {selectedRate?.baseCurrency?.currencyID?.name}
                    </button>
                </div>

                {rates_loading ?
                    <FxRatesLoader /> :
                    (<div className='px-5 py-3 space-y-3 bg-currency border border-gray rounded-xl'>
                        <p className='text-sm text-secondary font-light'>Current exchange rates</p>
                        <div className='flex items-center gap-2 md:gap-10 font-medium overflow-auto'>
                            {fx_rates.map((rate, index) => (
                                <div key={index} className='flex items-center gap-2'>
                                    <p>
                                        {rate?.targetCurrency?.value}
                                        {rate?.targetCurrency?.currencyID?.code}
                                    </p>
                                    <span>~</span>
                                    <p>{rate?.baseCurrency?.value.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</p>
                                    <span className='md:hidden text-[#D0D5DD]'>|</span>
                                </div>
                            ))}
                        </div>
                    </div>)
                }
            </div>

            <Link to={'/fx-transactions/all'} className='md:hidden flex items-center gap-2 text-sm bg-light p-2 px-3 rounded-lg border border-gray'>
                <span className='font-medium'>View all FX Transactions</span>
                <BsArrowRight className='w-4 h-4 text-secondary' />
            </Link>

            {/* Recent Transactions Table */}
            {(loading || transactions.length) > 0 ? (
                <div className="hidden md:block w-full rounded-lg border border-gray bg-white">
                    <div className="">
                        <div className="flex items-center justify-between p-4">
                            <h2 className="text-nowrap text-xl font-medium text-tertiary">Recent FX Transactions</h2>
                            <div className="w-full flex items-center justify-end gap-2">
                                <div className="w-4/12 relative">
                                    <IoIosSearch className="w-5 h-5 absolute top-2.5 left-3 text-gray-600" />
                                    <input
                                        type="text"
                                        placeholder="Search here..."
                                        className="w-full h-[40px] pl-10 pr-4 rounded-md border border-gray text-sm focus:outline-gray-200"
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
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-light border-b border-gray">
                                        <TableHead className="w-12 p-4">
                                            <Checkbox className="!accent-[var(--firstlane-primary)]" />
                                        </TableHead>
                                        <TableHead className="font-medium text-xs">Sell amount</TableHead>
                                        <TableHead className="font-medium text-xs">Buy amount</TableHead>
                                        <TableHead className="font-medium text-xs">Currency pair</TableHead>
                                        <TableHead className="font-medium text-xs">Exchange rate</TableHead>
                                        <TableHead className="font-medium text-xs">Date & time</TableHead>
                                        <TableHead className="font-medium text-xs">Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody className='text-sm text-secondary'>
                                    {loading ? (
                                        Array.from({ length: 6 }).map((_, index) => (
                                            <TransactionSkeletonTable key={index} />
                                        ))
                                    ) : transactions.map((transaction) => (
                                        <TableRow key={transaction?._id} className="text-sm border-b border-gray-200">
                                            <TableCell className="p-4">
                                                <Checkbox />
                                            </TableCell>
                                            <TableCell className="font-light">
                                                {transaction?.fromCurrency.currencyID?.symbol}
                                                {transaction?.fromCurrency?.value?.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </TableCell>
                                            <TableCell className="font-light">
                                                {transaction?.toCurrency.currencyID?.symbol}
                                                {transaction?.toCurrency?.value?.toLocaleString(undefined, {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </TableCell>
                                            <TableCell className="font-light">
                                                {transaction?.fromCurrency.currencyID?.code}/
                                                {transaction?.toCurrency.currencyID?.code}
                                            </TableCell>
                                            <TableCell className="font-light">
                                                {transaction?.toCurrency.currencyID?.symbol}{transaction?.fxRateID?.targetCurrency?.value}/
                                                {transaction?.fromCurrency.currencyID?.symbol}{transaction?.fxRateID?.baseCurrency?.value}
                                            </TableCell>
                                            <TableCell className="font-light">
                                                {formatDateTime(transaction?.createdAt)}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`px-3 py-1 text-xs font-normal capitalize rounded-full
                                                ${transaction?.status === 'completed' ? 'bg-success' :
                                                            transaction?.status === 'pending' ? 'bg-warning' :
                                                                'bg-danger'
                                                        }`}
                                                >
                                                    {transaction?.status}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>) : (
                <NoContent
                    className="hidden md:flex"
                    icon="fx transactions"
                    title="No FX Transactions"
                    description="There are no foreign exchange transactions to display at the moment."
                />
            )}

            {/* Pagination */}
            <Pagination
                className={`hidden md:flex ${(transactions.length == 0 || loading) && 'hidden'}`}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default FXTransactions;

const transactions = [
    {
        id: 1,
        sent_amount: "10,000.00",
        buy_amount: "100",
        currency_pair: "USD/NGN",
        exchange_rate: "$1/₦1,600.00",
        dateTime: "12th Aug, 2026 | 8:23AM",
        status: "successful"
    }
];