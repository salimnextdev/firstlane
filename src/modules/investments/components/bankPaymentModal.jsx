import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { fundWalletByLink } from '@/modules/wallets/state/walletSlice';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";

import TextInput from '@/components/FormInputs/TextInput';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const BankPaymentModal = ({
    isOpen,
    onClose,
    title,
    description,
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Proceed"
}) => {
    const BASE_URL = import.meta.env.VITE_BASE_URL
    const dispatch = useDispatch();

    const [submitted, setSubmitted] = useState(false);
    const [amount, setFundingAmount] = useState(0);

    const fundWallet = async () => {
        setSubmitted(true);
        try {
            const resultAction = await dispatch(fundWalletByLink(
                {
                    "amount": amount,
                    "redirect_url": `${BASE_URL}/wallets`
                }
            ))
            if (fundWalletByLink.fulfilled.match(resultAction)) {
                const paymentUrl = resultAction.payload?.data?.link || resultAction.payload?.data;
                if (paymentUrl) {
                    window.open(paymentUrl, "_blank");
                }
                onClose();
            } else {
                toast.error(resultAction.payload?.message || "Unable to initiate payment");
            }
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        };
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
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
                        <TextInput
                            label='Amount'
                            type='number'
                            name='amount'
                            value={amount}
                            onChange={(e) => setFundingAmount(e.target.value)}
                            min={100}   // ensures only positive numbers >= 1
                            step="any"
                            placeholder='10000'
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
                            onClick={fundWallet}
                            className={`w-full md:w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl ${amount <= 0 ? 'opacity-70' : undefined}`}
                            disabled={submitted || amount <= 0}
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

export default BankPaymentModal;