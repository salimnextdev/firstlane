import React from 'react';

import { RiEyeCloseLine } from 'react-icons/ri';
import { ReactComponent as Copy } from '@/assets/icons/copy.svg';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";

const FundAccountModal = ({
    isOpen,
    onClose,
    data
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="z-50 p-6 bg-white border border-[#E4E7EC] rounded-xl max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Fund Account</DialogTitle>
                    </DialogHeader>

                    <div className='bg-black text-white p-5 rounded-xl'>
                        <p className="text-sm text-gray-300 mb-2">Available balance</p>
                        <div className='flex items-center gap-5'>
                            <p className="text-2xl font-semibold">₦{data.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            })}</p>
                            <RiEyeCloseLine className="w-6 h-6 text-[#98A2B3] cursor-pointer" />
                        </div>
                    </div>

                    <div className='space-y-4 text-sm text-secondar'>
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
                    <DialogClose className="w-full h-11 bg-primary text-sm my-3 px-8 py-3 cursor-pointer rounded-md">
                        Close
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default FundAccountModal;