import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { fundWalletByLink } from '@/modules/wallets/state/walletSlice';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';

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
    
    const appOrigin = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '');
    const dispatch = useDispatch();

    const [submitted, setSubmitted] = useState(false);
    const [amount, setFundingAmount] = useState(0);

    const fundWallet = async () => {
        setSubmitted(true);
        try {
            const resultAction = await dispatch(fundWalletByLink(
                {
                    "amount": amount,
                    "redirect_url": `${appOrigin}/wallets`
                }
            ))
            if (fundWalletByLink.fulfilled.match(resultAction)) {
                const paymentUrl = resultAction.payload?.data?.link || resultAction.payload?.data;
                if (paymentUrl) {
                    // Same tab avoids duplicate app tabs: _blank leaves the original page open while
                    // Flutterwave redirects the new tab back to /wallets.
                    window.location.assign(paymentUrl);
                } else {
                    onClose();
                }
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
                        <Investment className='text-primary' />
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