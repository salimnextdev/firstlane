import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { syncInvestmentsDetails } from '@/modules/investments/state/investmentSlice';
import { fundWalletByCoupon } from '@/modules/wallets/state/walletSlice';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import OTPInput from '@/components/FormInputs/OTPInput';
import ConfirmDetailsModal from '@/modules/investments/components/confirmDetailsModal';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const CouponModal = ({
    isOpen,
    onClose,
    data,
    title = "Fund account",
    description = "Operation completed successfully.",
    purpose = "syncing",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Proceed"
}) => {
    const dispatch = useDispatch();
    const { investment_plan: investment_plan, loading: loading, error: error } = useSelector((state) => state.investment);

    const [submitted, setSubmitted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [couponCode, setCouponCode] = useState("");

    const fetchInvestmentDetails = async () => {
        setSubmitted(true);
        try {
            await dispatch(syncInvestmentsDetails(couponCode.replace('-', ''))).unwrap();
            setIsModalOpen(true);
            onClose();
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        };
    };

    const fundWallet = async () => {
        setSubmitted(true);
        try {
            const result = await dispatch(fundWalletByCoupon(couponCode.replace('-', ''))).unwrap();
            if (result.status) {
                toast.success("Wallet funded successfully!");
                onClose();
            } else {
                toast.error("Invalid Coupon", {description: result?.message})
            }
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        };
    };

    const buttonAction = (purpose === 'syncing' ? fetchInvestmentDetails : fundWallet)
    
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <ConfirmDetailsModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                data={{
                    name: `${investment_plan?.firstname} ${investment_plan?.lastname}`,
                    amount: investment_plan?.amount,
                    coupon_code: couponCode?.replace('-', '')
                }}
            />
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white border border-gray rounded-xl md:max-w-md mx-auto">
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] hidden md:flex items-center justify-center bg-[#D8D9EA] rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="15.5" cy="11" rx="6.5" ry="2" stroke="#3E4095" stroke-width="1.5" />
                            <path d="M22 15.5C22 16.6046 19.0899 17.5 15.5 17.5C11.9101 17.5 9 16.6046 9 15.5" stroke="#3E4095" stroke-width="1.5" />
                            <path d="M22 11V19.8C22 21.015 19.0899 22 15.5 22C11.9101 22 9 21.015 9 19.8V11" stroke="#3E4095" stroke-width="1.5" />
                            <ellipse cx="8.5" cy="4" rx="6.5" ry="2" stroke="#3E4095" stroke-width="1.5" />
                            <path d="M6 11C4.10819 10.7698 2.36991 10.1745 2 9M6 16C4.10819 15.7698 2.36991 15.1745 2 14" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M6 21C4.10819 20.7698 2.36991 20.1745 2 19L2 4" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M15 6V4" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </div>
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-sm md:text-base text-secondary font-light">{description}</DialogDescription>
                    </DialogHeader>

                    <form method="post">
                        <OTPInput
                            label='Coupon code'
                            name='coupon'
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder='01AD4R'
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
                            onClick={buttonAction}
                            className={`w-full md:w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl ${couponCode.length < 6 ? 'opacity-70' : undefined}`}
                            disabled={submitted || couponCode.length < 6}
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

export default CouponModal;