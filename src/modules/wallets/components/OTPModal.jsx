import React, { useState, useEffect } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import TextInput from '@/components/FormInputs/TextInput';
import ConfirmDetailsModal from '@/modules/investments/components/confirmDetailsModal';
import SuccessModal from '@/modules/wallets/components/successModal';
import OTPInput from '@/components/FormInputs/OTPInput';

const SendOTPModal = ({
    isOpen,
    onClose,
    type,
    title = "Send Money",
    email = "adam.jude@mail.com",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Confirm OTP"
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [OTP, setOTP] = useState();
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
        setCountdown(50);
        setResend(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <SuccessModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                type={type}
                amount={100000}
                name={type === "send" ? "Ayoola Sani" : ""}
            />
            <DialogContent className="z-50 p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-base text-secondary">
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

                    <div className="w-full flex justify-center gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-1/2 h-11 border border-[#E4E7EC] text-sm my-3 px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                onClose();
                            }}
                            // className="h-11 bg-primary text-white text-sm my-3 px-8 py-3 cursor-pointer rounded-xl"
                            className={`w-1/2 h-11 my-3 bg-primary text-sm rounded-xl ${resend ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} hover:bg-opacity-90 transition`}
                            disabled={resend}
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SendOTPModal;