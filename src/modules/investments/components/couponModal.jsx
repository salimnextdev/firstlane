import React, { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import TextInput from '@/components/FormInputs/TextInput';
import ConfirmDetailsModal from '@/modules/investments/components/confirmDetailsModal';

const CouponModal = ({
    isOpen,
    onClose,
    data,
    title = "Fund account",
    description = "Operation completed successfully.",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Proceed"
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <ConfirmDetailsModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                data={{ name: 'Chibuzor Nnamdi', amount: 10000000.00}}
            />
            <DialogContent className="z-50 p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl max-w-md mx-auto">
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] flex items-center justify-center bg-[#D8D9EA] rounded-full">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <ellipse cx="15.5" cy="11" rx="6.5" ry="2" stroke="#3E4095" stroke-width="1.5" />
                            <path d="M22 15.5C22 16.6046 19.0899 17.5 15.5 17.5C11.9101 17.5 9 16.6046 9 15.5" stroke="#3E4095" stroke-width="1.5" />
                            <path d="M22 11V19.8C22 21.015 19.0899 22 15.5 22C11.9101 22 9 21.015 9 19.8V11" stroke="#3E4095" stroke-width="1.5" />
                            <ellipse cx="8.5" cy="4" rx="6.5" ry="2" stroke="#3E4095" stroke-width="1.5" />
                            <path d="M6 11C4.10819 10.7698 2.36991 10.1745 2 9M6 16C4.10819 15.7698 2.36991 15.1745 2 14" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M6 21C4.10819 20.7698 2.36991 20.1745 2 19L2 4" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M15 6V4" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                    </div>
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-secondary">{description}</DialogDescription>
                    </DialogHeader>

                    <form method="post">
                        <TextInput 
                            label='Coupon code'
                            name='coupon'
                            placeholder='01AD4R'
                        />
                    </form>

                    <div className="w-full flex justify-center gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-1/2 h-11 border border-[#E4E7EC] text-xs my-3 px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={()=> {
                                setIsModalOpen(true);
                                onClose();
                            }}
                            className="w-1/2 h-11 bg-primary text-white text-xs my-3 px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CouponModal;