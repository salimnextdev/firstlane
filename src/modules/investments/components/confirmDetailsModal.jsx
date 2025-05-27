import React, { useState } from 'react';
import { ReactComponent as Check } from '@/assets/icons/check.svg';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import InvestmentModal from '@/modules/investments/components/investmentModal';

const ConfirmDetailsModal = ({
    isOpen,
    onClose,
    data,
    title = "Confirm details",
    description = "Please confirm that the details below are yours and the investment amount is accurate.",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Confirm and sync"
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <InvestmentModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                title='Investment sync successful'
                description="You investment has now been synced to Firstlane's digital applicaion. 
                You can access the details of the investment from the comfort of your home."
                buttonCLoseText="Go to My Investments"
                buttonSuccessText="Return Home"
            />
            <DialogContent className="z-50 p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl max-w-md mx-auto">
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#D8D9EA] rounded-full">
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
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-base text-secondary">{description}</DialogDescription>
                    </DialogHeader>

                    <div className='bg-[#F9FAFB] p-5 space-y-3 border border-[#E4E7EC] rounded-xl'>
                        <div className='flex items-center gap-2 text-secondary'>
                            <p>Name:</p>
                            <p className="text-gray-700 font-medium">{data.name}</p>
                        </div>
                        <div className='flex items-center gap-2 text-secondary'>
                            <p>Investment amount:</p>
                            <p className="text-gray-700 font-medium">₦{data.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                        </div>
                    </div>

                    <div className="w-full flex justify-center gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-1/2 h-11 border border-[#E4E7EC] text-sm my-3 px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={()=> {
                                setIsModalOpen(true);
                                onClose();
                            }}
                            className="w-1/2 h-11 bg-primary text-white text-sm my-3 px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmDetailsModal;