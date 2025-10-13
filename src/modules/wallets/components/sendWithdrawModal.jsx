import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchBankAccounts, sendCodeToEmail } from '@/modules/auth/state/authSlice';
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
import SearchInput from '@/components/FormInputs/searchInput';
import { IoIosCheckmarkCircle, IoIosInformationCircleOutline } from 'react-icons/io';
import SendOTPModal from '@/modules/wallets/components/OTPModal';
import { useBankOptions } from '@/utils/dropdownOptions';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { getCookie } from '@/utils/cookieUtils';
import { calculateTransferFee } from '@/utils/genericFunc';

const INITIAL_DATA = {
    amount: "",
    account_number: "",
    bank_name: "",
    account_name: "",
    bank_code: "",
    description: "",
};

const SendMoneyModal = ({
    isOpen,
    onClose,
    type,
    title = "Send Money",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Send Money"
}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);
    const { bankAccounts: bankAccounts, verify_loading: auth_loading, verify_error: auth_error } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!auth_loading) {
            dispatch(fetchBankAccounts());
        }
    }, [dispatch])

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { bankOptions, loading, error } = useBankOptions();
    const [accountLoading, setAccountLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState(INITIAL_DATA);
    const clearFormData = () => setFormData(INITIAL_DATA);


    useEffect(() => {
        if (bankAccounts.length > 0) {
            const activeAccount = bankAccounts.find(item => item.currency === 'NGN');
            setFormData((prev) => ({
                ...prev,
                account_number: activeAccount?.accountNumber || "",
                account_name: activeAccount?.accountName || "",
                bank_name: activeAccount?.bankName || "",
                bank_code: activeAccount?.bankCode || "",
            }));
        }
    }, [bankAccounts]);

    useEffect(() => {
        const verifyBankDetails = async () => {
            if (
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
                setFormData((prev) => ({
                    ...prev,
                    account_name: "",
                }));
            }
        };

        // Call the async function
        verifyBankDetails();

    }, [formData.account_number, formData.bank_code, dispatch]);

    const [fee, setFee] = useState(0);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        // const numericValue = value.replace(/[^0-9]/g, ''); // Force 
        if (name === 'amount') {
            const calculatedFee = calculateTransferFee(Number(value));
            console.log(calculatedFee);
            setFee(calculatedFee);
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.amount) errors.amount = "Amount is required";
        if (!formData.account_number) errors.account_number = "Account number is required";
        if (!formData.account_name) errors.account_name = "Account name is required";
        if (!formData.bank_code) errors.bank_code = "Bank name is required";
        return errors;
    };

    const sendUserOTP = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.error(error);
            });
            return;
        };

        setSubmitted(true);
        const data = {
            email: user?.email || "",
            type: "Withdrawal"
        };

        try {
            const resultAction = await dispatch(sendCodeToEmail(data));
            if (sendCodeToEmail.fulfilled.match(resultAction)) {
                setIsModalOpen(true);
                onClose();
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
        <Dialog open={isOpen} onOpenChange={onClose}>
            <SendOTPModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                formData={formData}
                email={user?.email}
                type={type}
                clearFormData={clearFormData}
            />
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white border border-gray rounded-xl md:max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
                    </DialogHeader>

                    <form method="post" className='space-y-4'>
                        <div>
                            <div className='relative'>
                                <span className='absolute top-9 md:top-10.5 left-4 text-secondary'>₦</span>
                                <TextInput
                                    label='Amount'
                                    name='amount'
                                    type='number'
                                    className={`md:h-15 pl-7 pr-36 font-medium no-spinner`}
                                    value={formData.amount}
                                    onChange={handleChange}
                                    placeholder='0.00'
                                    inputMode='numeric'
                                    pattern='[0-9]*'
                                />
                                <p className="absolute top-9 md:top-10.5 right-4 text-sm text-secondary space-x-1">
                                    <span className='font-light'>Fee:</span>
                                    <span>-₦{(fee || 0.00).toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    })}</span>
                                </p>
                            </div>
                            {/* Help Text */}
                            <div className='mt-1 flex items-start gap-1 text-[var(--firstlane-warning)]'>
                                {/* <IoIosInformationCircleOutline className='w-5 h-5' /> */}
                                <p className='text-sm font-light'>
                                    A transfer fee applies to all withdrawals.
                                    VAT is included in the total fee.
                                </p>
                            </div>
                        </div>

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
                                className='text-xs bg-currency'
                                value={formData.account_name}
                                placeholder='-  -   -'
                                disabled
                            />
                            {accountLoading && <Loader rotate={360} className='absolute top-1/2 right-5 w-6 h-6 animate-spin' />}
                            {!accountLoading && formData.account_name &&
                                <IoIosCheckmarkCircle className='absolute top-1/2 right-5 w-[25px] h-[25px] text-[#0F973D]' />
                            }
                        </div>
                        <TextInput
                            label='Description (optional)'
                            name='description'
                            value={formData.description}
                            onChange={handleChange}
                            placeholder='A transaction description'
                        />
                    </form>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-gray text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={sendUserOTP}
                            className="w-full md:w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                            disabled={submitted}
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                buttonSuccessText
                            }
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SendMoneyModal;