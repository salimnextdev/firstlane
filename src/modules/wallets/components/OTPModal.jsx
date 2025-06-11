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
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white border border-[#E4E7EC] rounded-xl md:max-w-md mx-auto">
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
                            className="w-full md:w-1/2 h-11 border border-[#E4E7EC] text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                onClose();
                            }}
                            // className="h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                            className={`w-full md:w-1/2 h-11 bg-primary text-sm rounded-xl ${resend ? "opacity-70 cursor-not-allowed" : "cursor-pointer"} hover:bg-opacity-90 transition`}
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