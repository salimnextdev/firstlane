import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logout } from '@/assets/icons/logout.svg';

import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const LogoutModal = ({
    isOpen,
    onClose,
    title = "Logout from this account",
    description = "By logging out, you would temporarily miss all the financial action available here. Are you sure you want to logout?",
    buttonCLoseText = "Yes, logout",
    buttonSuccessText = "No, cancel"
}) => {
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose} className='backdrop-blur-sm bg-white/30'>
            <AlertDialogContent className="p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl">
                <div className="space-y-5">
                    <div
                        className='w-[64px] h-[64px] bg-[#FBEAEA] rounded-full flex items-center justify-center'
                    >
                        <Logout className='' />
                    </div>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-2xl">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-base text-secondary">
                            {description}
                        </AlertDialogDescription>
                        <div className='w-full flex justify-center gap-5'>
                            <button
                                onClick={onClose}
                                className='w-1/2 h-11 bg-[#CB1A14] text-white text-sm font-normal my-3 px-8 py-3 rounded-md cursor-pointer'
                            >
                                {buttonCLoseText}
                            </button>
                            <AlertDialogCancel
                                onClick={onClose}
                                className='w-1/2 h-11 border border-[#E4E7EC] text-sm my-3 px-8 py-3 rounded-xl cursor-pointer'
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

export default LogoutModal;