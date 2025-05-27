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
    title = "KYC verification submitted",
    description = "Your KYC verification has been submitted and it is currently under review. Sit tight and we would get back to you soonest.",
    buttonCLoseText = "Ok, Close",
}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose} className='backdrop-blur-sm bg-white/30'>
            <AlertDialogContent className="p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl">
                <div className="space-y-5">
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
                        <AlertDialogCancel
                            onClick={onClose}
                            className='w-full h-11 border border-[#E4E7EC] text-sm my-3 px-8 py-3 rounded-md cursor-pointer'
                        >
                            {buttonCLoseText}
                        </AlertDialogCancel>
                    </AlertDialogHeader>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SuccessModal;