import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBankAccounts, fetchUserProfile } from '@/modules/auth/state/authSlice';
import { verifyAccount } from '@/modules/wallets/state/walletSlice';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SearchInput from '@/components/FormInputs/searchInput';
import SuccessModal from '@/modules/fx_transactions/components/successModal';

import { IoIosCheckmarkCircle } from 'react-icons/io';
import { accountTypeOptions, useBankOptions } from '@/utils/dropdownOptions';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

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

const AccountFormModal = ({
    isOpen,
    onClose,
    rate,
    type,
    title = "Enter your receiving bank details",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Proceed"
}) => {
    const dispatch = useDispatch();
    const { bankAccounts: bankAccounts, loading: auth_loading, error: auth_error } = useSelector((state) => state.auth);
    const { userProfile: userProfile, loading: user_loading, error: user_error } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!auth_loading || !user_loading) {
            dispatch(fetchBankAccounts());
            dispatch(fetchUserProfile());
        }
    }, [dispatch]);

    // Helps to determine which bank details to use based on the type of transaction
    const option = type === 'Buy' ? 'NGN' : (rate?.targetCurrency?.currencyID?.code || 'USD');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { bankOptions, loading, error } = useBankOptions();
    const [accountLoading, setAccountLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState(INITIAL_DATA);

    useEffect(() => {
        if (bankAccounts.length > 0) {
            const activeAccount = bankAccounts.find(item => item.currency === option);
            setFormData((prev) => ({
                ...prev,
                prev_account_number: activeAccount?.accountNumber || "",
                account_number: activeAccount?.accountNumber,
                account_name: activeAccount?.accountName,
                bank_name: activeAccount?.bankName,
                bank_code: activeAccount?.bankCode,
                wire_routing: activeAccount?.wireRouting,
                ach_routing: activeAccount?.ACHrouting,
                account_type: activeAccount?.accountType,
                swift_code: activeAccount?.swiftCode,
            }));
        }
    }, [bankAccounts, type]);

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

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <SuccessModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
            />
            <DialogContent
                className={`z-50 md:p-6 md:px-8 bg-white border border-gray rounded-xl 
                md:!max-w-[680px] ${type === 'Sell' && 'h-[90vh]'} md:h-auto mx-auto`}
            >
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] bg-[#D8D9EA] hidden md:flex items-center justify-center rounded-full">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6.0268C9.483 3.17323 11.9665 1 14.9575 1C18.2947 1 21 3.70532 21 7.0425C21 10.0335 18.8268 12.517 15.9732 13" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7 21C10.3137 21 13 18.3137 13 15C13 11.6863 10.3137 9 7 9C3.68629 9 1 11.6863 1 15C1 18.3137 3.68629 21 7 21Z" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 8C1 4.68286 3.68286 2 7 2L6.14286 3.71429" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 14C21 17.3171 18.3171 20 15 20L15.8571 18.2857" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-base md:text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-sm md:text-base text-secondary font-light">
                            This is where your exchanged money would be paid into
                        </DialogDescription>
                    </DialogHeader>

                    {type === 'Sell' && <form method='post' className='space-y-3'>
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
                    </form>}

                    {type === 'Buy' && <form method='post' className='space-y-2 text-sm'>
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
                    </form>}


                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-gray text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                onClose();
                            }}
                            className="w-full md:w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AccountFormModal;