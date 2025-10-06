import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { uploadFile } from '@/modules/kyc/state/kycSlice';
import { addLoan } from '@/modules/loans/state/loanSlice';
import { getCookie } from '@/utils/cookieUtils';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import FileInput from '@/components/FormInputs/FileInput';
import BackButton from '@/components/BackButton';
import LoanSuccessModal from '../components/loanSuccessCard';
import { useBankOptions, useLoanDropdowns } from '@/utils/dropdownOptions';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import SearchInput from '@/components/FormInputs/searchInput';
import { fetchAdminSettings } from '@/modules/settings/state/adminSettingsSlice';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { verifyAccount } from '@/modules/wallets/state/walletSlice';

const FinanceLoans = () => {
    const {
        loanReasons: { options: loanReasons, loading: loadingReasons, error: errorReasons },
        loanDurations: { options: loanDurations, loading: loadingDurations, error: errorDurations },
        loanIntervals: { options: loanIntervals, loading: loadingIntervals, error: errorIntervals },
        loanCollaterals: { options: loanCollaterals, loading: loadingCollaterals, error: errorCollaterals },
    } = useLoanDropdowns();

    const { bankOptions, loading, error } = useBankOptions();

    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user'));

    const { settings, loading: settings_loading, error: settings_error } = useSelector((state) => state.admin_settings);
    useEffect(() => {
        if (!settings || !settings_loading) {
            dispatch(fetchAdminSettings());
        }
    }, [dispatch]);

    const [isOpen, setIsModalOpen] = useState(false);
    const [accountLoading, setAccountLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        loan_reason: "",
        duration: "",
        interval: "",
        collateral: "",
        account_number: "",
        bank_name: "",
        bank_code: "",
        account_name: "",
        invoice: null,
        referral: "",
    });

    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? { file: files[0] } : value,
        }));
    };

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
            }
        };

        // Call the async function
        verifyBankDetails();

    }, [formData.account_number, formData.bank_code, dispatch]);

    useEffect(() => {
        const selectedBank = bankOptions.find(
            (option) => option.value === formData.bank_code
        );
        const newBankName = selectedBank ? selectedBank.label : '';

        // Only update if the bank_name has actually changed to avoid unnecessary re-renders
        if (newBankName !== formData.bank_name) {
            setFormData((prev) => ({
                ...prev,
                bank_name: newBankName,
            }));
        }
    }, [formData.bank_code, bankOptions]);

    const validateForm = () => {
        const errors = {};
        if (!checked) errors.checked = "Please check the consent box";
        if (!formData.amount) errors.amount = "Loan amount is required";
        if (!formData.loan_reason) errors.loan_reason = "Loan reason is required";
        if (!formData.duration) errors.duration = "Loan duration is required";
        if (!formData.interval) errors.interval = "Loan interval is required";
        if (!formData.invoice) errors.invoice = "Vendor's invoice is required";
        if (!formData.account_number) errors.account_number = "Vendor's account number is required";
        if (!formData.account_name) errors.account_name = "Vendor's account is not valid";
        if (!formData.bank_code) errors.bank_code = "Vendor's bank name is required";
        return errors;
    };

    const submitLoan = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.warning(error);
            });
            return;
        };

        setSubmitted(true);

        try {
            let documentUpload;
            if (formData.invoice && formData.invoice.file instanceof File) {
                documentUpload = await dispatch(uploadFile({ files: formData.invoice.file }));

                if (!uploadFile.fulfilled.match(documentUpload)) {
                    toast.error('Document Upload Failed',
                        { description: documentUpload.payload.message }
                    );
                    return;
                }
            } else { documentUpload = formData.invoice };

            const loanData = {
                amountRequested: formData.amount,
                purpose: formData.loan_reason,
                tenure: formData.duration,
                repaymentInterval: formData.interval,
                vendorInvoice: documentUpload.payload?.data[0]?.url || documentUpload,
                vendorAccountNumber: formData.account_number,
                vendorBankName: formData.bank_name,
                vendorBankCode: formData.bank_code,
                loanType: "asset-finance",
                userID: user._id,
                refCode: formData.referral,
            };

            const resultAction = await dispatch(addLoan(loanData));
            if (addLoan.fulfilled.match(resultAction)) {
                toast.success("Loan application submitted successfully");
                setIsModalOpen(true);
            } else {
                toast.error(resultAction.payload.message);
                return;
            };
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <form onSubmit={submitLoan} method='post' className="space-y-5">
            <LoanSuccessModal
                isOpen={isOpen}
                onClose={setIsModalOpen}
            />
            <BackButton />

            <div className="w-full flex items-center justify-between gap-4">
                <h2 className="text-base md:text-2xl font-medium">
                    Apply for an asset finance loan
                </h2>

                <div className="fixed md:static left-0 bottom-0 md:bottom-auto z-10 w-full md:w-auto h-[71px] md:h-auto px-5 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <button
                        className={`w-full md:w-40 h-11 md:h-9 mt-3 md:mt-0 px-3 rounded-md bg-primary text-sm text-white cursor-pointer ${(submitted || !settings) && 'opacity-70'}`}
                        disabled={submitted || !settings}
                    >
                        {submitted ?
                            <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                            'Submit application'
                        }
                    </button>
                </div>
            </div>

            <div className='md:bg-gray md:p-5 space-y-3 md:border border-gray rounded-xl'>
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label="How much do you want?"
                        name="amount"
                        className='text-sm'
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="1234567890"
                    />
                    <SelectInput
                        label="Why do you want this loan?"
                        name="loan_reason"
                        className='text-sm'
                        value={formData.loan_reason}
                        onChange={handleChange}
                        options={loanReasons}
                        placeholder="Select purpose"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <SelectInput
                        label="How long before you pay?"
                        name="duration"
                        className='text-sm'
                        value={formData.duration}
                        onChange={handleChange}
                        options={loanDurations}
                        placeholder="Select tenure"
                    />
                    <SelectInput
                        label="What is the payment interval?"
                        name="interval"
                        className='text-sm'
                        value={formData.interval}
                        onChange={handleChange}
                        options={loanIntervals}
                        placeholder="Select repayment"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label="Vendor account number"
                        name="account_number"
                        className='text-sm'
                        value={formData.account_number}
                        onChange={handleChange}
                        placeholder="0000000000"
                        maxLength={10}
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <SearchInput
                        label="Vendor bank name"
                        name='bank_code'
                        value={formData.bank_code}
                        onChange={handleChange}
                        data={bankOptions || []}
                        placeholder='Select bank'
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <div className='w-full relative'>
                        <TextInput
                            label='Vendor holder"s name'
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

                    <TextInput
                        label='Referral code (optional)'
                        name='referral'
                        value={formData.referral}
                        onChange={handleChange}
                        placeholder='000000'
                    />
                </div>

                <FileInput
                    label='Invoice of item from vendor'
                    name='invoice'
                    className='w-full md:w-1/2'
                    value={formData.invoice}
                    onChange={handleChange}
                    accept=".pdf,image/*"
                />

                <p className='md:w-1/2 mt-2 text-sm text-secondary'>
                    You need to upload an invoice of the asset you want to purchase which would contain the account details of the vendor of this asset.
                </p>
            </div>

            <div className='flex md:items-center gap-4 md:pr-8 text-sm text-secondary font-light'>
                <input onChange={() => setChecked(!checked)} type="checkbox" name='checked' className='w-5 h-5 accent-[#3E4095] cursor-pointer' />
                <p>I declare that the above information capture, is correct and complete in every respect and any failure by me to pay any amount
                    which is due and outstanding under this agreement, I will pay additional {settings?.loanSettings?.assetFinanceLoanInterestRate || '--'}% per annum</p>
            </div>

        </form>
    );
};

export default FinanceLoans;
