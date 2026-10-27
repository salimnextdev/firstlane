import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeCookie } from '@/utils/cookieUtils';

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
    buttonSuccessText = "Yes, logout",
    buttonCLoseText = "No, cancel"
}) => {
    const navigate = useNavigate();

    const logout = () =>{
        removeCookie('token');
        removeCookie('user');
        navigate('/signin');
    };
    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="md:p-6 md:px-8 bg-white border border-[#E4E7EC] rounded-xl">
                <div className="space-y-5">
                    <div
                        className='w-[64px] h-[64px] bg-[#FBEAEA] rounded-full flex items-center justify-center'
                    >
                        <Logout className='' />
                    </div>
                    <AlertDialogHeader className="text-left">
                        <AlertDialogTitle className="text-xl md:text-2xl">
                            {title}
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm md:text-base text-secondary font-light">
                            {description}
                        </AlertDialogDescription>

                        <div className='w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium'>
                            <button
                                onClick={logout}
                                className='w-full md:w-1/2 h-11 bg-[#CB1A14] text-white text-sm px-8 py-3 rounded-md cursor-pointer select-none'
                            >
                                {buttonSuccessText}
                            </button>
                            <AlertDialogCancel
                                onClick={onClose}
                                className='w-full md:w-1/2 h-11 border border-[#E4E7EC] text-sm px-8 py-3 rounded-xl cursor-pointer select-none'
                            >
                                {buttonCLoseText}
                            </AlertDialogCancel>
                        </div>
                    </AlertDialogHeader>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default LogoutModal;