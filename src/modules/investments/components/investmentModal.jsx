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
    title = "Success!", 
    description = "Operation completed successfully.",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Ok" 
}) => {
    const navigate = useNavigate();
    const GotoInv = ()=> {
        onClose();
        navigate('/investment')
    };

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
                        <div className='w-full flex justify-center gap-5'>
                            <AlertDialogCancel 
                                onClick={GotoInv}
                                className='w-1/2 h-11 border border-[#E4E7EC] text-sm my-3 px-8 py-3 rounded-md cursor-pointer'
                            >
                                {buttonCLoseText}
                            </AlertDialogCancel>
                            <AlertDialogCancel 
                                onClick={onClose}
                                className='w-1/2 h-11 bg-primary text-sm my-3 px-8 py-3 rounded-xl cursor-pointer'
                            >
                                {buttonSuccessText}
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogHeader>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default SuccessModal;