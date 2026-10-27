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

const DeleteAccountModal = ({
    isOpen,
    onClose,
    title="It hurts to see you leave. You can always change your mind and return. Firstlane misses you.",
    buttonSuccessText="Create account",
    buttonSuccessLink="/signup"
}) => {
    const navigate = useNavigate();

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="md:p-6 md:px-8 bg-white border border-[#E4E7EC] rounded-xl">
                <div className="space-y-5 flex flex-col items-center justify-center">
                    <div
                        className='w-[64px] h-[64px] bg-[#E7F6EC] rounded-full flex items-center justify-center'
                    >
                        <Check />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base md:text-xl text-center">
                            {title}
                        </AlertDialogTitle>

                        <div className='w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium'>
                            <AlertDialogCancel
                                onClick={()=>{
                                    navigate(buttonSuccessLink);
                                    onClose();
                                }}
                                className='w-full md:w-1/2 h-11 bg-primary text-sm px-8 py-3 rounded-xl cursor-pointer select-none'
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

export default DeleteAccountModal;