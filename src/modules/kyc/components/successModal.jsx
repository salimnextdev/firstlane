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
    const navigate = useNavigate();
    const GotoDashboard = () => {
        navigate('/dashboard');
        onClose();
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="md:p-6 md:px-8 bg-white border border-[#E4E7EC] rounded-xl">
                <div className="space-y-5">
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
                        <AlertDialogCancel
                            onClick={GotoDashboard}
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