import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addInvestments, fetchInvestmentPlanByID } from '../state/investmentSlice';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import BackButton from '@/components/BackButton';

import ConfirmModal from '@/modules/investments/components/confirmModal';
import CustomInvestmentModal from '@/modules/investments/components/customInvestmentModal';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const MakeInvestment = () => {
    const dispatch = useDispatch();
    const { ID } = useParams();
    const { investment_plan: investment_plan, loading: loading, error: error } = useSelector((state) => state.investment);
    useEffect(() => {
        if (!loading) {
            dispatch(fetchInvestmentPlanByID({ key: 'id', value: ID }));
        }
    }, [dispatch]);

    const [balance, setBalance] = useState(1000000.00);
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [customOpen, setCustomOpen] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        amount: 0.00,
        interval: "",
    });
    useEffect(()=> {
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

    const validateForm = () => {
        const errors = {};
        if (!formData.amount) errors.amount = "Amount is required";
        if (!formData.interval) errors.interval = "Interval is required";
        if (formData.amount > balance) errors.amount = "Insufficient funds";
        return errors;
    };
    const submitInvestment = async (e) => {
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
            investmentID: investment_plan?._id,
            amount: formData.amount,
            repaymentInterval: formData.interval
        };

        try {
            const resultAction = await dispatch(addInvestments(data));
            if (addInvestments.fulfilled.match(resultAction)) {
                setConfirmOpen(true);
            } else {
                toast.warning(resultAction.payload.message);
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
        <div className="space-y-4">
            <ConfirmModal
                isOpen={confirmOpen}
                onClose={setConfirmOpen}
                title='Confirm Investment'
                description='Please confirm that you are making this investment for the 
                defined duration at the specified interest rate.'
                data={{ amount: '10000', duration: "360 days", interest: "3%", interval: "Monthly" }}
                buttonCLoseText="No, cancel"
                buttonSuccessText="Confirm and Invest"
            />
            <CustomInvestmentModal
                isOpen={customOpen}
                onClose={setCustomOpen}
                name={'Micheal Jordan'}
                title='Custom Investment Interest'
                buttonCLoseText="No, cancel"
                buttonSuccessText="Talk to support"
            />
            <BackButton />

            <h2 className="text-base md:text-2xl font-semibold">Make Investment</h2>

            <form onSubmit={submitInvestment} method='post' className='w-full md:w-7/12'>
                <div className='flex items-center justify-between'>
                    <p className="text-sm text-secondary font-light">How much do you want to invest</p>
                    <p className="hidden md:block text-sm font-semibold space-x-1">
                        <span className='text-secondary font-light'>Balance:</span>
                        <span>₦{1000000.00.toLocaleString(undefined, {
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
                        className='md:h-15 pl-7 pr-36 font-medium no-spinner'
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder='10,000.00'
                        inputMode='numeric'
                        pattern='[0-9]*'
                    />
                    <p className="block md:hidden absolute top-4.5 right-4 text-sm text-secondary space-x-1">
                        <span className='font-light'>Bal:</span>
                        <span>₦{balance.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}</span>
                    </p>
                </div>

                <p className="mt-2 mb-5 text-sm text-secondary font-light space-x-1">
                    <span>Minimum amount that can be invested is</span>
                    <span className='font-medium'>₦{investment_plan?.minAmount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })}</span>
                </p>
                
                {balance > 25000000.00 &&
                    <div className='mb-3 p-3 bg-gray-100 text-sm text-secondary font-light border border-gray rounded-lg'>
                        <p>We noticed that your investment amount is more than
                            <span className='font-medium mx-1'>₦25 million</span>
                            You can get a custom interest rate for your investment.
                            Do you want a custom investment rate?
                        </p>
                        <div className='flex flex-col md:flex-row md:items-center gap-2 md:gap-3 mt-3 text-sm font-medium'>
                            <button className='h-9 md:h-8 px-2 bg-white text-black rounded-md md:border border-gray cursor-pointer'>
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
                    options={[
                        { label: "Daily", value: "daily" },
                        { label: "Weekly", value: "weekly" },
                        { label: "Monthly", value: "monthly" },
                        { label: "Yearly", value: "yearly" },
                    ]}
                    placeholder='Select repayment interval'
                />
                <p className="mt-2 text-sm text-secondary font-light">
                    This is the time period it would take to keep getting part of your interest until your investment is fully mature
                </p>

                <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <button
                        // type='button'
                        // onClick={() => setConfirmOpen(true)}
                        className='w-full md:w-24 h-10 md:h-9 my-3 md:my-5 px-2 rounded-md bg-primary text-sm cursor-pointer'
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
