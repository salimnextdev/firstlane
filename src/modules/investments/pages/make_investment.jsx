import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addInvestments, fetchInvestmentPlanByID } from '@/modules/investments/state/investmentSlice';
import { fetchBalance } from '@/modules/wallets/state/walletSlice';
import { getCookie } from '@/utils/cookieUtils';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import BackButton from '@/components/BackButton';

import ConfirmModal from '@/modules/investments/components/confirmModal';
import CustomInvestmentModal from '@/modules/investments/components/customInvestmentModal';
import { useInvestmentIntervals } from '@/utils/dropdownOptions';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';
import { IoIosInformationCircleOutline } from 'react-icons/io';

const MakeInvestment = () => {
    const dispatch = useDispatch();
    const { ID } = useParams();
    const user = JSON.parse(getCookie('user') || null);
    const { userProfile: userProfile } = useSelector((state) => state.auth);
    const { investment_plan: investment_plan, loading: loading, error: error } = useSelector((state) => state.investment);
    const { balance: balance, loading: balance_loading, error: balance_error } = useSelector((state) => state.wallet);
    useEffect(() => {
        if (!loading) {
            !balance && dispatch(fetchBalance(user._id));
            dispatch(fetchInvestmentPlanByID({ key: 'id', value: ID }));
        }
    }, [dispatch]);

    const { options: intervalOptions, loading: intervalLoading } = useInvestmentIntervals();

    const [confirmOpen, setConfirmOpen] = useState(false);
    const [customOpen, setCustomOpen] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        amount: 0.00,
        interval: "",
        referral: "",
    });
    useEffect(() => {
        setFormData(prevFormData => ({
            ...prevFormData,
            amount: investment_plan?.minAmount || 0.00,
        }));
    }, [investment_plan]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Manage custom rate card display
    const [showCustomRate, setShowCustomRate] = useState(false);
    useEffect(() => {
        if (formData.amount > 25000000.00) {
            setShowCustomRate(true);
        };
    }, [formData.amount]);

    const validateForm = () => {
        const errors = {};
        if (!formData.amount) errors.amount = "Amount is required";
        if (!formData.interval) errors.interval = "Interval is required";
        if (formData.amount > balance) errors.amount = "Insufficient funds";
        return errors;
    };

    const investNow = () => {
        setSubmitted(true);
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.error(error);
            });
            setSubmitted(false);
            return;
        };

        setSubmitted(false);
        setConfirmOpen(true);
    }

    const submitInvestment = async () => {
        setSubmitted(true);
        const data = {
            investmentID: investment_plan?._id,
            amount: parseFloat(formData.amount),
            repaymentInterval: formData.interval,
            refCode: formData.referral,
        };

        try {
            const resultAction = await dispatch(addInvestments(data));
            if (addInvestments.fulfilled.match(resultAction)) {
                return true;
            } else {
                toast.error(resultAction.payload.message);
                return false;
            };
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
            return false
        } finally {
            setSubmitted(false);
        }
    };

    const InsufficientBalance = balance?.available_balance < investment_plan?.minAmount
    const btnDisabled = submitted || balance_loading || InsufficientBalance;
    // const btnDisabled = submitted || balance_loading;

    return (
        <div className="space-y-4">
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={setConfirmOpen}
                submitted={submitted}
                setSubmitted={setSubmitted}
                title='Confirm Investment'
                description='Please confirm that you are making this investment for the 
                defined duration at the specified interest rate.'
                data={{
                    amount: parseFloat(formData.amount),
                    duration: investment_plan?.duration && investment_plan?.duration[0],
                    interest: investment_plan?.interestRate + "%",
                    interval: formData.interval
                }}
                buttonCLoseText="No, cancel"
                buttonSuccessText="Confirm and Invest"
                buttonSuccessAction={submitInvestment}
            />
            <CustomInvestmentModal
                isOpen={customOpen}
                onClose={setCustomOpen}
                name={userProfile?.fullname}
                title='Custom Investment Interest'
                buttonCLoseText="No, cancel"
                buttonSuccessText="Talk to support"
            />
            <BackButton />

            <h2 className="text-base md:text-2xl font-semibold">Make Investment</h2>

            <form method='post' className='w-full md:w-7/12'>
                <div className='flex items-center justify-between'>
                    <p className="text-sm text-secondary font-light">How much do you want to invest</p>
                    <p className="hidden md:block text-sm font-semibold space-x-1">
                        <span className='text-secondary font-light'>Balance:</span>
                        <span>₦{(balance?.available_balance || 0.00).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                    </p>
                </div>

                <div className='relative'>
                    <span className='absolute top-4 md:top-5.5 left-4 text-secondary'>₦</span>
                    <TextInput
                        label=''
                        name='amount'
                        type='number'
                        min={investment_plan?.minAmount}
                        max={investment_plan?.maxAmount}
                        className={`md:h-15 pl-7 pr-36 font-medium no-spinner ${InsufficientBalance ? 'border !border-[var(--firstlane-danger)]' : undefined}`}
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder='10,000.00'
                        inputMode='numeric'
                        pattern='[0-9]*'
                    />
                    <p className="block md:hidden absolute top-4.5 right-4 text-sm text-secondary space-x-1">
                        <span className='font-light'>Bal:</span>
                        <span>₦{(balance?.available_balance || 0.00).toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                    </p>
                </div>

                <div className='flex flex-col md:flex-row flex-col-reverse md:items-center justify-between mb-5'>
                    <p className="mt-2 text-sm text-secondary font-light space-x-1">
                        <span>Minimum amount that can be invested is</span>
                        <span className='font-medium'>
                            ₦{(investment_plan?.minAmount || 0.00)?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</span>
                    </p>
                    {InsufficientBalance && (
                        <div className='md:mt-2 flex items-center gap-1 text-[var(--firstlane-danger)]'>
                            <IoIosInformationCircleOutline className='w-5 h-5' />
                            <p className='my-1 text-sm font-light'>Insufficient Balance</p>
                        </div>
                    )}
                </div>

                {showCustomRate &&
                    <div className='mb-3 p-3 bg-light text-sm text-secondary font-light border border-gray rounded-lg'>
                        <p>We noticed that your investment amount is more than
                            <span className='font-medium mx-1'>₦25 million</span>
                            You can get a custom interest rate for your investment.
                            Do you want a custom investment rate?
                        </p>
                        <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-3 text-sm font-medium'>
                            <button
                                onClick={() => setShowCustomRate(false)}
                                className='h-9 md:h-8 px-2 bg-gray-50 dark:bg-[var(--firstlane-bg)] rounded-md md:border border-gray cursor-pointer'
                            >
                                No, continue with the standard rate
                            </button>
                            <button type='button' onClick={() => setCustomOpen(true)} className='h-9 md:h-8 px-2 rounded-md bg-secondary cursor-pointer'>
                                Yes, I want custom rate
                            </button>
                        </div>
                    </div>
                }

                <SelectInput
                    label='Repayment interval'
                    name='interval'
                    className='!mb-0 text-sm'
                    value={formData.interval}
                    onChange={handleChange}
                    options={intervalOptions}
                    placeholder='Select repayment interval'
                />
                <p className="mt-2 mb-5 text-sm text-secondary font-light">
                    This is the time period it would take to keep getting part of your interest until your investment is fully mature
                </p>

                <TextInput
                    label='Referral code (optional)'
                    name='referral'
                    className=''
                    value={formData.referral}
                    onChange={handleChange}
                    placeholder='000000'
                />

                <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <button
                        type='button'
                        onClick={investNow}
                        className={`w-full md:w-24 h-10 md:h-9 my-3 md:my-5 px-2 rounded-md bg-primary text-sm ${btnDisabled ? 'opacity-70' : 'cursor-pointer'}`}
                        disabled={btnDisabled}
                    >
                        {submitted ?
                            <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                            'Invest now'
                        }
                    </button>
                </div>
            </form>

        </div>
    );
};

export default MakeInvestment;
