import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Check } from '@/assets/icons/check.svg';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const SuccessModal = ({ 
    isOpen, 
    onClose, 
    title = "FX Transaction successful", 
    description = "Your transaction has been sent to the admin. Afterwards, you will receive your exchange.",
    buttonCLoseText = "Close",
    buttonSuccessText = "Go to FX Transactions" 
}) => {
    const navigate = useNavigate();
    const Goto = () => {
        const isMobile = window.innerWidth <= 768;
        isMobile ? navigate('/fx-transactions/all') : navigate('/fx-transactions');
        onClose();
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="md:p-6 md:px-8 bg-white border border-gray rounded-xl">
                <div className="md:py-6 space-y-5">
                    <div 
                        className='w-[48px] h-[48px] bg-[#E7F6EC] rounded-full flex items-center justify-center'
                    >
                        <Check className='' />
                    </div>
                    <AlertDialogHeader className="text-left">
                        <AlertDialogTitle className="text-xl md:text-2xl">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm md:text-base text-secondary font-light">
                            {description}
                        </AlertDialogDescription>
                        
                        <div className='w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium'>
                            <AlertDialogCancel 
                                onClick={onClose}
                                className='w-full md:w-1/2 h-11 border border-gray text-sm py-3 rounded-md cursor-pointer'
                            >
                                {buttonCLoseText}
                            </AlertDialogCancel>
                            <button 
                                onClick={Goto}
                                className='w-full md:w-1/2 h-11 bg-primary text-sm py-3 rounded-xl cursor-pointer'
                            >
                                {buttonSuccessText}
                            </button>
                        </div>
                    </AlertDialogHeader>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SuccessModal;