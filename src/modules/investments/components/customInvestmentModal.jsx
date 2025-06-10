import React from 'react';
import { ReactComponent as Check } from '@/assets/icons/check.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";

const CustomInvestmentModal = ({
    isOpen,
    onClose,
    name,
    title = "Custom!",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Ok"
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white border border-[#E4E7EC] rounded-xl md:max-w-md mx-auto">
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] bg-[#D8D9EA] rounded-full hidden md:flex items-center justify-center">
                        <Investment />
                    </div>
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-sm md:text-base text-secondary font-light">
                            Thank you <span className='font-medium'>{name}</span> for your interest in having a custom interest on your investment. 
                            You can click the button below to continue conversation with our support team 
                            that would help you through your process.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-[#E4E7EC] text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CustomInvestmentModal;