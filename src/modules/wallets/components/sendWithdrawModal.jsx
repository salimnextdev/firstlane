import React, { useState } from 'react';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";
import RadioInput from '@/components/FormInputs/RadioInput';
import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import SendOTPModal from '@/modules/wallets/components/OTPModal';

const SendMoneyModal = ({
    isOpen,
    onClose,
    type,
    title = "Send Money",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Send Money"
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <SendOTPModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                type={type}
            />
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white border border-[#E4E7EC] rounded-xl md:max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
                    </DialogHeader>

                    <form method="post" className='space-y-4'>
                        <TextInput
                            label='Amount'
                            name='amount'
                            placeholder='₦0.00'
                        />
                        <TextInput
                            label='Account number'
                            name='account_number'
                            placeholder='01234567890'
                        />
                        <SelectInput
                            label='Bank name'
                            name='account_number'
                            options={[]}
                            placeholder='Select bank'
                        />
                        <div className='relative'>
                            <TextInput
                                label='Account name'
                                name='account_number'
                                className='bg-[#F0F2F5]'
                                value=''
                                placeholder='Ayoola Sani'
                                disabled
                            />
                            <IoIosCheckmarkCircle className='absolute top-1/2 right-5 w-[25px] h-[25px] text-[#0F973D]' />
                        </div>
                        <TextInput
                            label='Description (optional)'
                            name='description'
                            placeholder='A transaction description'
                        />
                    </form>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-[#E4E7EC] text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={()=> {
                                setIsModalOpen(true);
                                onClose();
                            }}
                            className="w-full md:w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SendMoneyModal;