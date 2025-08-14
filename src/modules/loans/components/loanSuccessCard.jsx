import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ReactComponent as Check } from '@/assets/icons/check.svg';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";

const LoanSuccessModal = ({
    isOpen,
    onClose,
    title = "Loan application successful",
    description = "You have successfully made your loan application and \
    it is currently under review. You can track your loan progress on the \
    'Loan applications' in the loan section",
    buttonCLoseText = "Go to Loans",
    buttonSuccessText = "Go to Loans applications"
}) => {
    const navigate = useNavigate();
    const GoToLoans = () => {
        onClose();
        navigate('/loans')
    };
    const GoToLoanApplications = () => {
        onClose();
        navigate('/loans/applications')
    };
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="z-50 md:p-6 bg-white border border-gray rounded-xl md:max-w-md mx-auto">
                <div className="space-y-5">
                    <div
                        className='w-[48px] h-[48px] bg-[#E7F6EC] rounded-full flex items-center justify-center'
                    >
                        <Check className='' />
                    </div>
                    <DialogHeader className="text-left">
                        <DialogTitle className="text-xl md:text-2xl">{title}</DialogTitle>
                        <DialogDescription className="text-sm md:text-base text-secondary font-light">
                            {description}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 mt-3 font-medium">
                        <DialogClose
                            onClick={GoToLoans}
                            className="w-full md:w-5/12 h-11 border border-gray text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={GoToLoanApplications}
                            className="w-full md:w-7/12 h-11 bg-primary text-white text-sm px-4 py-3 cursor-pointer rounded-xl"
                        >
                            {buttonSuccessText}
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default LoanSuccessModal;