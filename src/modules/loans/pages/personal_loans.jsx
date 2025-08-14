import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { addLoan } from '@/modules/loans/state/loanSlice';
import { getCookie } from '@/utils/cookieUtils';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import BackButton from '@/components/BackButton';
import { loanCollaterals, loanDurations, loanIntervals, loanReasons } from '@/utils/dropdownOptions';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import LoanSuccessModal from '../components/loanSuccessCard';

const PersonalLoans = () => {
    const dispatch = useDispatch();
    const user  = JSON.parse(getCookie('user'));

    const [isOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        loan_reason: "",
        duration: "",
        interval: "",
        collateral: "",
        others: "",
    });

    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!checked) errors.checked = "Please check the consent box";
        if (!formData.amount) errors.amount = "Loan amount is required";
        if (!formData.loan_reason) errors.loan_reason = "Loan reason is required";
        if (!formData.duration) errors.duration = "Loan duration is required";
        if (!formData.interval) errors.interval = "Loan interval is required";
        if (!formData.collateral) errors.collateral = "Loan collateral is required";
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
        const loanData = {
            amountRequested: formData.amount,
            purpose: formData.loan_reason,
            tenure: formData.duration,
            repaymentInterval: formData.interval,
            collateral: formData.collateral,
            loanType: "personal",
            userID: user._id,
        };

        try {
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
                    Apply for a personal loan
                </h2>

                <div className="fixed md:static bottom-0 md:bottom-auto z-10 w-full md:w-auto h-[71px] md:h-auto pr-10 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <button className="w-full md:w-40 h-11 md:h-9 mt-3 md:mt-0 px-3 rounded-md bg-primary text-sm text-white cursor-pointer">
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
                    <SelectInput
                        label="Collateral?"
                        name="collateral"
                        className='text-sm'
                        value={formData.collateral}
                        onChange={handleChange}
                        options={loanCollaterals}
                        placeholder="Select collateral"
                    />
                    <TextInput
                        label='If Others, please specify'
                        name='others'
                        className='text-sm'
                        value={formData.others}
                        onChange={handleChange}
                        placeholder="Select name"
                    />
                </div>
            </div>

            <div className='flex md:items-center gap-4 text-sm pr-8 text-secondary font-light'>
                <input onChange={()=> setChecked(!checked)} type="checkbox" name='checked' className='w-5 h-5 accent-[#3E4095] cursor-pointer' />
                <p>I declare that the above information capture, is correct and complete in every respect and any failure by me to pay any amount which is due and outstanding under this agreement, I will pay additional 12% par annum</p>
            </div>

        </form>
    );
};

export default PersonalLoans;
