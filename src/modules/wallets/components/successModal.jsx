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

// Backend may use _id (Mongo) or id (display id) on transaction objects.
const getTransactionRouteId = (tx) => tx?._id ?? tx?.id ?? null;

const SuccessModal = ({
    isOpen,
    onClose,
    type,
    title = "Transfer successful",
    amount,
    name,
    transaction,
    buttonCLoseText = "View reciept",
    buttonSuccessText = `Return to ${type === 'send' ? 'Wallets' : 'Investment'}`
}) => {
    const navigate = useNavigate();

    const handleViewReceipt = () => {
        onClose();
        const txId = getTransactionRouteId(transaction);
        // Route must match App.jsx: /wallets/receipt/:ID (plural "wallets")
        if (txId) {
            navigate(`/wallets/receipt/${txId}`);
        } else {
            navigate(type === 'send' ? '/wallets' : '/investment');
        }
    };

    const handleReturnHome = () => {
        onClose();
        navigate(type === 'send' ? '/wallets' : '/investment');
    };

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="md:p-6 md:px-8 bg-white border border-gray rounded-xl">
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
                            You have successfully {type === 'send' ? 'sent' : 'withdrawn'} a sum of
                            ₦<span className='font-medium'>
                                {amount.toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                })}
                            </span> to &nbsp;
                            {name ? <span className='font-medium'>{name}</span> : "your account"}.
                        </AlertDialogDescription>
                        <div className='w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium'>
                            <AlertDialogCancel
                                onClick={handleViewReceipt}
                                className='w-full md:w-1/2 h-11 border border-gray text-sm px-8 py-3 rounded-md cursor-pointer'
                            >
                                {buttonCLoseText}
                            </AlertDialogCancel>
                            <AlertDialogCancel
                                onClick={handleReturnHome}
                                className='w-full md:w-1/2 h-11 bg-primary text-sm px-8 py-3 rounded-xl cursor-pointer'
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