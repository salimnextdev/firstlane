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

const SupportModal = ({
    isOpen,
    onClose,
    selectedOption,
    handleChange,
    options,
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Ok",
    buttonSuccessAction
}) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="z-50 md:p-6 md:px-8 bg-white border border-gray rounded-xl md:max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl md:text-2xl">Start a chat</DialogTitle>
                        <DialogDescription className="text-sm md:text-base text-secondary font-light">
                            Select what type of support you are looking for
                        </DialogDescription>
                    </DialogHeader>

                    <form method="post" className='space-y-3'>
                        {options.map((item, index) => (
                            <RadioInput
                                key={item + index}
                                label={item}
                                checked={selectedOption === item}
                                onChange={() => handleChange(item)}
                            />
                        ))}
                    </form>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-gray text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={buttonSuccessAction}
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

export default SupportModal;