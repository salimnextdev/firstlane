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
import SelectInput from '@/components/FormInputs/SelectInput';

import SuccessModal from '@/modules/fx_transactions/components/successModal';
import { IoIosCheckmarkCircle } from 'react-icons/io';

const AccountFormModal = ({
    isOpen,
    onClose,
    data,
    type,
    title = "Enter your receiving bank details",
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Proceed"
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        account_number: ''
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <SuccessModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
            />
            <DialogContent className="z-50 p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl md:!max-w-[680px] mx-auto">
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] bg-[#D8D9EA] flex items-center justify-center rounded-full">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6.0268C9.483 3.17323 11.9665 1 14.9575 1C18.2947 1 21 3.70532 21 7.0425C21 10.0335 18.8268 12.517 15.9732 13" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7 21C10.3137 21 13 18.3137 13 15C13 11.6863 10.3137 9 7 9C3.68629 9 1 11.6863 1 15C1 18.3137 3.68629 21 7 21Z" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 8C1 4.68286 3.68286 2 7 2L6.14286 3.71429" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 14C21 17.3171 18.3171 20 15 20L15.8571 18.2857" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-base text-secondary">
                            This is where your exchanged money would be paid into
                        </DialogDescription>
                    </DialogHeader>

                    {type === 'Buy' && <form method='post' className='space-y-3'>
                        <TextInput
                            label='Account number'
                            name='account_number'
                            placeholder='0123456789'
                        />
                        <SelectInput
                            label='Bank name'
                            name='bank_name'
                            options={[
                                { label: "UBA", value: "UBA" },
                                { label: "Eco Bank", value: "Eco Bank" },
                            ]}
                            placeholder='Select bank'
                        />
                        <div className='relative'>
                            <TextInput
                                label='Account holder"s name'
                                name='account_name'
                                className='bg-[#F0F2F5]'
                                value=''
                                placeholder='Ayoola Sani'
                                disabled
                            />
                            <IoIosCheckmarkCircle className='absolute top-1/2 right-5 w-[25px] h-[25px] text-[#0F973D]' />
                        </div>
                    </form>}

                    {type === 'Sell' && <form method='post' className='space-y-3'>
                        <div className='flex flex-col md:flex-row items-center gap-5'>
                            <TextInput
                                label='Account number'
                                name='account_number'
                                placeholder='0123456789'
                            />
                            <TextInput
                                label='Account holder"s name'
                                name='account_name'
                                placeholder='0123456789'
                            />
                        </div>
                        <div className='flex flex-col md:flex-row items-center gap-5'>
                            <TextInput
                                label='Wire routing'
                                name='wire_routing'
                                placeholder='56789'
                            />
                            <TextInput
                                label='ACH routing'
                                name='ach_routing'
                                placeholder='012345'
                            />
                        </div>
                        <div className='flex flex-col md:flex-row items-center gap-5'>
                            <SelectInput
                                label='Account type'
                                name=''
                                options={[
                                    { label: "Savings", value: "Savings" },
                                    { label: "Current", value: "Current" },
                                ]}
                                placeholder='Checking'
                            />
                            <TextInput
                                label='Swift code'
                                name='code'
                                placeholder='012345'
                            />
                        </div>
                        <SelectInput
                            label='Bank name'
                            name='bank_name'
                            options={[
                                { label: "UBA", value: "UBA" },
                                { label: "Eco Bank", value: "Eco Bank" },
                            ]}
                            placeholder='Select bank'
                        />
                    </form>}


                    <div className="w-full flex justify-center gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-1/2 h-11 border border-[#E4E7EC] text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={() => {
                                setIsModalOpen(true);
                                onClose();
                            }}
                            className="w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AccountFormModal;