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
    description = "Your transaction has been sent to the admin to. Afterwards, you will receive your exchange.",
    buttonCLoseText = "Close",
    buttonSuccessText = "Go to FX Transactions" 
}) => {

    const navigate = useNavigate();
    const Goto = () => {
        onClose();
        navigate('/fx-transactions');
    }
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose} className='backdrop-blur-sm bg-white/30'>
            <AlertDialogContent className="p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl">
                <div className="py-6 space-y-5">
                    <div 
                        className='w-[48px] h-[48px] bg-[#E7F6EC] rounded-full flex items-center justify-center'
                    >
                        <Check className='' />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-secondary">
                            {description}
                        </AlertDialogDescription>
                        <div className='w-full flex justify-center gap-5 font-medium'>
                            <AlertDialogCancel 
                                onClick={onClose}
                                className='w-1/2 h-11 border border-[#E4E7EC] text-sm my-3 py-3 rounded-md cursor-pointer'
                            >
                                {buttonCLoseText}
                            </AlertDialogCancel>
                            <button 
                                onClick={Goto}
                                className='w-1/2 h-11 bg-primary text-sm my-3 py-3 rounded-xl cursor-pointer'
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