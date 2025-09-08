import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBankAccount, updateBankAccount, fetchBankAccounts, removeBankAccount } from '@/modules/auth/state/authSlice';
import { verifyAccount } from '@/modules/wallets/state/walletSlice';
import { fetchCurrency } from '@/modules/fx_transactions/state/currencySlice';

import SelectInput from '@/components/FormInputs/SelectInput';
import TextInput from '@/components/FormInputs/TextInput';

import { IoIosCheckmarkCircle } from 'react-icons/io';
import { accountTypeOptions, useBankOptions } from '@/utils/dropdownOptions';
import SearchInput from '@/components/FormInputs/searchInput';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const INITIAL_DATA = {
    prev_account_number: "",
    account_number: "",
    bank_name: "",
    account_name: "",
    bank_code: "",
    wire_routing: "",
    ach_routing: "",
    account_type: "",
    swift_code: "",
};

const LIMIT = 10;

const BankDetails = () => {
    const dispatch = useDispatch();
    const { bankAccounts: bankAccounts, loading: auth_loading, error: auth_error } = useSelector((state) => state.auth);
    const { currencies: currencies, loading: currency_loading } = useSelector((state) => state.currency);
    useEffect(() => {
        if (!auth_loading) {
            dispatch(fetchBankAccounts());
            dispatch(fetchCurrency({ page: 1, limit: LIMIT }))
        }
    }, [dispatch])

    const { bankOptions, loading, error } = useBankOptions();
    const [option, setOption] = useState('NGN');
    // const currencies = ['NGN', 'USD', 'GBP', 'EUR', 'CHF', 'CAD', 'KWD']

    const [accountLoading, setAccountLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState(INITIAL_DATA);

    useEffect(() => {
        // Reset formData when the currency changes
        setFormData(INITIAL_DATA);

        if (bankAccounts.length > 0) {
            const activeAccount = bankAccounts.find(item => item.currency === option);
            setFormData((prev) => ({
                ...prev,
                prev_account_number: activeAccount?.accountNumber || "",
                account_number: activeAccount?.accountNumber || "",
                account_name: activeAccount?.accountName || "",
                bank_name: activeAccount?.bankName || "",
                bank_code: activeAccount?.bankCode || "",
                wire_routing: activeAccount?.wireRouting || "",
                ach_routing: activeAccount?.ACHrouting || "",
                account_type: activeAccount?.accountType || "",
                swift_code: activeAccount?.swiftCode || "",
            }));
        }
    }, [bankAccounts, option]);

    useEffect(() => {
        const verifyBankDetails = async () => {
            if (
                option === 'NGN' &&
                formData.account_number &&
                formData.account_number.length === 10 &&
                formData.bank_code
            ) {
                setFormData((prev) => ({
                    ...prev,
                    account_name: "loading...",
                }));
                setAccountLoading(true);

                try {
                    const resultAction = await dispatch(verifyAccount({
                        accountNumber: formData.account_number,
                        bankCode: formData.bank_code,
                    }));

                    if (verifyAccount.fulfilled.match(resultAction)) {
                        setFormData((prev) => ({
                            ...prev,
                            account_name: resultAction.payload.data.account_name, // Access account_name from payload
                        }));
                    } else {
                        setFormData((prev) => ({
                            ...prev,
                            account_name: "",
                        }));
                    }
                } catch (error) {
                    toast.error('An unexpected error occurred during verification.');
                    setFormData((prev) => ({
                        ...prev,
                        account_name: "",
                    }));
                } finally {
                    setAccountLoading(false);
                }
            } else {
                // Optional: Clear account_name if either account_number or bank_name is missing for NGN option
                // This prevents an old account_name from lingering if inputs are cleared.
                option === 'NGN' &&
                    setFormData((prev) => ({
                        ...prev,
                        account_name: "",
                    }));
            }
        };

        // Call the async function
        verifyBankDetails();

    }, [formData.account_number, formData.bank_code, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (option === 'NGN') {
            const selectedBank = bankOptions.find(
                (option) => option.value === formData.bank_code
            );
            const newBankName = selectedBank ? selectedBank.label : ''; // Set to empty string if no match

            // Only update if the bank_name has actually changed to avoid unnecessary re-renders
            if (newBankName !== formData.bank_name) {
                setFormData((prev) => ({
                    ...prev,
                    bank_name: newBankName,
                }));
            }
        }
    }, [formData.bank_code, bankOptions]);

    const validateForm = () => {
        const errors = {};
        if (!formData.account_number) errors.account_number = "Account number is required";
        if (!formData.account_name) errors.account_name = "Account name is required";
        if (!formData.bank_name) errors.bank_name = "Bank name is required";
        return errors;
    };

    const submitBankData = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.error(error);
            });
            return;
        };

        setSubmitted(true);
        const ngnData = {
            "bankName": formData.bank_name,
            "accountNumber": formData.account_number,
            "accountName": formData.account_name,
            "bankCode": formData.bank_code,
            "currency": option
        };
        const otherData = {
            ...ngnData,
            "accountType": formData.account_type,
            "ACHrouting": formData.ach_routing,
            "wireRouting": formData.wire_routing,
            "swiftCode": formData.swift_code,
        };

        const data = option === 'NGN' ? ngnData : otherData;
        // const existingAccount = bankAccounts.find(item => item.currency === option);

        try {
            const removeCriteria1 = formData.prev_account_number.length === 10;
            const removeCriteria2 = formData.prev_account_number !== formData.account_number;
            if (removeCriteria1 && removeCriteria2) {
                await dispatch(removeBankAccount(formData.prev_account_number)).unwrap();
            };

            const resultAction = await dispatch(addBankAccount(data));
            if (addBankAccount.fulfilled.match(resultAction)) {
                toast.success("Bank details updated successfully");
            } else {
                toast.warning(resultAction.payload.message);
            }
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className='w-full flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar'>
                {currency_loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <Skeleton key={index} className="w-16 h-9 bg-gray-200 rounded-md" />
                    ))
                ) : [...currencies]
                        .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                        .map(item => (
                            <button
                                key={item?._id}
                                onClick={() => setOption(item?.code)}
                                // Ensure flex-shrink-0 is added to buttons to prevent them from shrinking and wrapping
                                className={`flex-shrink-0 w-16 h-9 ${option === item?.code ? 'bg-[#D8D9EA] text-primary' : 'border border-gray'} text-sm rounded-md cursor-pointer`}
                            >
                                {item?.code}
                            </button>
                        ))}
            </div>

            {option === 'NGN' ?
                <form onSubmit={submitBankData} method="post" className='space-y-4'>
                    <TextInput
                        label='Account number'
                        name='account_number'
                        className='text-sm'
                        value={formData.account_number}
                        onChange={handleChange}
                        placeholder='0123456789'
                    />
                    <SearchInput
                        label='Bank name'
                        name='bank_code'
                        value={formData.bank_code}
                        onChange={handleChange}
                        data={bankOptions || []}
                        placeholder='Select bank'
                    />
                    <div className='relative'>
                        <TextInput
                            label='Account holder"s name'
                            name='account_name'
                            className='text-sm bg-currency'
                            value={formData.account_name}
                            placeholder='-  -   -'
                            disabled
                        />
                        {accountLoading && <Loader rotate={360} className='absolute top-1/2 right-5 w-6 h-6 animate-spin' />}
                        {!accountLoading && formData.account_name &&
                            <IoIosCheckmarkCircle className='absolute top-1/2 right-5 w-[25px] h-[25px] text-[#0F973D]' />
                        }
                    </div>

                    <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                        <button
                            className='w-full md:w-32 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Save changes'
                            }
                        </button>
                    </div>
                </form> :

                <form onSubmit={submitBankData} method='post' className='space-y-4 text-sm'>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <TextInput
                            label='Account number'
                            name='account_number'
                            value={formData.account_number}
                            onChange={handleChange}
                            placeholder='0123456789'
                        />
                        <TextInput
                            label='Account holder"s name'
                            name='account_name'
                            value={formData.account_name}
                            onChange={handleChange}
                            placeholder='0123456789'
                        />
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <TextInput
                            label='Wire routing'
                            name='wire_routing'
                            value={formData.wire_routing}
                            onChange={handleChange}
                            placeholder='56789'
                        />
                        <TextInput
                            label='ACH routing'
                            name='ach_routing'
                            value={formData.ach_routing}
                            onChange={handleChange}
                            placeholder='012345'
                        />
                    </div>
                    <div className='flex flex-col md:flex-row items-center gap-5'>
                        <SelectInput
                            label='Account type'
                            name='account_type'
                            value={formData.account_type}
                            onChange={handleChange}
                            options={accountTypeOptions}
                            placeholder='Checking'
                        />
                        <TextInput
                            label='Swift code'
                            name='swift_code'
                            value={formData.swift_code}
                            onChange={handleChange}
                            placeholder='012345'
                        />
                    </div>
                    <TextInput
                        label='Bank name'
                        name='bank_name'
                        value={formData.bank_name}
                        onChange={handleChange}
                        placeholder='Bank name'
                    />
                    <button
                        className='w-full md:w-32 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                    >
                        {submitted ?
                            <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                            'Save changes'
                        }
                    </button>
                </form>}
        </div>
    );
};

export default BankDetails;