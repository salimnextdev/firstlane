import React, { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";

import InvestmentModal from '@/modules/investments/components/investmentModal';
import { Loader } from 'lucide-react';

const ConfirmModal = ({
    isOpen,
    onClose,
    submitted,
    setSubmitted,
    data,
    title = "Success!",
    description = "Operation completed successfully.",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Ok",
    buttonSuccessAction,
}) => {

    const [success, setSuccess] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {success ? <InvestmentModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                success={success}
                title='Investment successful'
                description={
                    `You have invested a sum of 
                    ₦${data?.amount?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} 
                for a period of ${data.duration} at an interest 
                rate of ${data.interest} with a repayment interval of 1 ${data.interval}. 
                You can view your investments or return home. `}
                buttonCLoseText="Go to My Investments"
                buttonSuccessText="Return Home"
            /> :
            <InvestmentModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                success={success}
                title='Investment failed'
                description='Oops! Your investment failed due to insufficient balance. You can topup your wallet and try investing again'
                buttonCLoseText="Cancel"
                buttonSuccessText="Fund Wallet"
            />}
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white rounded-xl md:max-w-md mx-auto">
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

                    <div className='bg-light p-5 space-y-3 border border-gray rounded-xl'>
                        <div className='flex items-center gap-2 text-secondary font-light'>
                            <p>Amount:</p>
                            <p className="font-medium">
                                ₦{data?.amount?.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                        <div className='flex items-center gap-2 text-secondary font-light'>
                            <p>Duration:</p>
                            <p className="font-medium">{data.duration}</p>
                        </div>
                        <div className='flex items-center gap-2 text-secondary font-light'>
                            <p>Interest rate:</p>
                            <p className="font-medium">{data.interest}</p>
                        </div>
                        <div className='flex items-center gap-2 text-secondary font-light'>
                            <p>Repayment interval:</p>
                            <p className="font-medium capitalize">{data.interval}</p>
                        </div>
                    </div>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-gray text-sm py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={async () => {
                                const success = await buttonSuccessAction();
                        
                                if (success) {
                                    onClose();
                                    setSuccess(true);
                                } else {
                                    onClose();
                                    setSuccess(false);
                                }
                                
                                setIsModalOpen(true);
                            }}
                            className="w-full md:w-1/2 h-11 bg-primary text-white text-sm py-3 cursor-pointer rounded-xl"
                            disabled={submitted}
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

export default ConfirmModal;