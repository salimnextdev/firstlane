import React, { useState } from 'react';
import { ReactComponent as Copy } from '@/assets/icons/copy.svg';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

import TransactionInput from '@/components/FormInputs/TransactionInput';

const ConfirmModal = ({
    isOpen,
    onClose,
    data,
    title = "Confirm FX Transaction",
    buttonCLoseText = "No, Cancel",
    buttonSuccessText = "I have paid"
}) => {

    const [buy, setBuy] = useState('$8');
    const [sell, setSell] = useState('₦100000');

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="z-50 p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl max-w-md mx-auto">
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] bg-[#D8D9EA] flex items-center justify-center rounded-full">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6.0268C9.483 3.17323 11.9665 1 14.9575 1C18.2947 1 21 3.70532 21 7.0425C21 10.0335 18.8268 12.517 15.9732 13" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7 21C10.3137 21 13 18.3137 13 15C13 11.6863 10.3137 9 7 9C3.68629 9 1 11.6863 1 15C1 18.3137 3.68629 21 7 21Z" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 8C1 4.68286 3.68286 2 7 2L6.14286 3.71429" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 14C21 17.3171 18.3171 20 15 20L15.8571 18.2857" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                    </DialogHeader>

                    <div className='space-y-3'>
                        <TransactionInput
                            label='You are selling'
                            name='sell'
                            currency='NGN'
                            value={sell}
                            onchange={(e) => setSell(e.target.value)}
                        />
                        <TransactionInput
                            label='You buy'
                            name='buy'
                            currency='USD'
                            value={buy}
                            onchange={(e) => setBuy(e.target.value)}
                        />
                    </div>

                    <div className='space-y-4 text-xs text-secondar'>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-1'>
                                <p>Account number</p>
                                <p className='text-base text-black font-medium'>{data.acc_number}</p>
                            </div>
                            <Copy className="cursor-pointer" />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-1'>
                                <p>Bank name</p>
                                <p className='text-base text-black font-medium'>{data.bank_name}</p>
                            </div>
                            <Copy className="cursor-pointer" />
                        </div>
                        <div className='space-y-1'>
                            <p>Account name</p>
                            <p className='text-base text-black font-medium'>{data.acc_name}</p>
                        </div>
                        <div className='flex items-center gap-2 text-black'>
                            <p>Copy all</p>
                            <Copy className="cursor-pointer" />
                        </div>
                    </div>

                    <p className='text-xs text-secondary'>
                        Please click on the
                        <span className='mx-1 font-medium'>“I have paid”</span>
                        button to confirm that you have made the payment.
                    </p>

                    <div className="w-full flex justify-center gap-5">
                        <button
                            onClick={onClose}
                            className="w-1/2 h-11 border border-[#E4E7EC] text-xs px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </button>
                        <button
                            onClick={onClose}
                            className="w-1/2 h-11 bg-primary text-white text-xs px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmModal;