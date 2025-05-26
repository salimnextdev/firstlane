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
    options,
    buttonCLoseText = "Cancel",
    buttonSuccessText = "Ok"
}) => {
    const [checkData, setCheckData] = useState(options)
    const [selectedOption, setSelectedOption] = useState(null);
    const handleChange = (value) => {
        setSelectedOption(value);
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="z-50 p-6 px-8 bg-white border border-[#E4E7EC] rounded-xl max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-2xl">Start a chat</DialogTitle>
                        <DialogDescription className="text-base text-secondary">Select what type of support you are looking for</DialogDescription>
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

                    <div className="w-full flex justify-center gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-1/2 h-11 border border-[#E4E7EC] text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={onClose}
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

export default SupportModal;