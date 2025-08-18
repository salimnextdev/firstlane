import React, { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { sendMoney } from '@/modules/wallets/state/walletSlice';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import SuccessModal from '@/modules/wallets/components/successModal';
import OTPInput from '@/components/FormInputs/OTPInput';

import { resendOTP } from '@/utils/genericFunc';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const SendOTPModal = ({
    isOpen,
    onClose,
    type,
    formData,
    clearFormData,
    title = "Send Money",
    email = "adam.jude@mail.com",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Confirm OTP"
}) => {
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [submitted, setSubmitted] = useState(false);
    const [OTP, setOTP] = useState('');
    const handleChange = (e) => {
        setOTP(e.target.value);
    };

    const [countdown, setCountdown] = useState(50);
    const [resend, setResend] = useState(false);

    useEffect(() => {
        if (countdown === 0) {
            setResend(true);
            return;
        }

        const timer = setTimeout(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [countdown]);

    const handleResend = () => {
        if (!resend) return;
        resendOTP(dispatch, email, "Withdrawal");
        setCountdown(50);
        setResend(false);
    };

    const transferMoney = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const data = {
            "amount": formData.amount,
            "account_number": formData.account_number,
            "account_bank": formData.bank_code,
            "narration": formData.description,
            "otp": OTP.replace('-', '')
        };

        try {
            const resultAction = await dispatch(sendMoney(data));
            if (sendMoney.fulfilled.match(resultAction)) {
                setIsModalOpen(true);
                onClose();
                // Clear formdata
                clearFormData();
                setOTP('');
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
            <SuccessModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                type={type}
                amount={formData.amount}
                name={type === "send" ? formData.account_name : ""}
            />
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white border border-gray rounded-xl md:max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-sm md:text-base text-secondary font-light">
                            An OTP code has been sent to your email, <span className='font-medium'>{email}</span>, to confirm your money transfer.
                        </DialogDescription>
                    </DialogHeader>

                    <form method="post" className='space-y-4'>
                        <OTPInput
                            label='OTP code'
                            name='otp'
                            value={OTP}
                            onChange={handleChange}
                            placeholder='000-000'
                        />

                        <div className="flex items-center justify-between text-sm">
                            <p className="text-secondary">
                                {!resend && `${countdown}secs`}
                            </p>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={!resend}
                                className={`text-primary font-medium ${!resend ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                                    }`}
                            >
                                Resend OTP
                            </button>
                        </div>
                    </form>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-gray text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={transferMoney}
                            // className="h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                            className={`w-full md:w-1/2 h-11 bg-primary text-sm rounded-xl ${OTP.length !== 7 ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} hover:bg-opacity-90 transition`}
                            disabled={OTP.length !== 7}
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

export default SendOTPModal;