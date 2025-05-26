import React, { useState } from 'react';

import { ReactComponent as Bank } from '@/assets/icons/bank.svg';
import { ReactComponent as Payment } from '@/assets/icons/payment.svg';
import { ReactComponent as Coupon } from '@/assets/icons/coupon.svg';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";

import FundAccountModal from '@/modules/investments/components/fundAccountModal';
import CouponModal from '@/modules/investments/components/couponModal';
import RadioCheckInput from '@/components/FormInputs/RadioCheckInput';

const FundOptionsModal = ({
    isOpen,
    onClose,
    option,
    buttonCLoseText = 'Close',
    buttonSuccessText = 'Proceed'
}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isBankModalOpen, setIsBankModalOpen] = useState(false);
    const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(option);

    const handleModal = () => {
        setIsModalOpen(true);
        onClose();

        if (selectedOption === "bank_transfer") {
            setIsBankModalOpen(true);
        } else if (selectedOption === "coupon_code") {
            setIsCouponModalOpen(true);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            {isModalOpen && selectedOption === "bank_transfer" && <FundAccountModal
                isOpen={isBankModalOpen}
                onClose={setIsBankModalOpen}
                data={{
                    amount: 140000.00,
                    acc_number: "0123456789",
                    acc_name: "Alison Eyo",
                    bank_name: "Paystack Titan",
                }}
            />}

            {isModalOpen && selectedOption === "coupon_code" && <CouponModal
                isOpen={isCouponModalOpen}
                onClose={setIsCouponModalOpen}
                title="Fund account"
                description="You can select either of the options below to fund your account. "
            />}
            <DialogContent className="z-50 p-6 bg-white border border-[#E4E7EC] rounded-xl max-w-md mx-auto">
                <div className="space-y-5">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Fund Account</DialogTitle>
                        <DialogDescription className="text-base text-secondary">
                            You can select either of the options below to fund your account.
                        </DialogDescription>
                    </DialogHeader>

                    <div className='space-y-4 text-sm text-secondar'>
                        <div className='flex items-center gap-3'>
                            <p><Bank /></p>
                            <div className='space-y-1'>
                                <p className='text-base font-medium'>Bank Transfer</p>
                                <p className='text-sm text-secondary'>You make payment to our account from your general bank account</p>
                            </div>
                            <RadioCheckInput
                                name="fund_option"
                                value="bank_transfer"
                                checked={selectedOption === "bank_transfer"}
                                onChange={() => setSelectedOption("bank_transfer")}
                            />
                        </div>
                        <div className='flex items-center gap-3'>
                            <p><Payment /></p>
                            <div className='space-y-1'>
                                <p className='text-base font-medium'>Bank Payment</p>
                                <p className='text-sm text-secondary'>You make payment to our account from your general bank account</p>
                            </div>
                            <RadioCheckInput
                                name="fund_option"
                                value="bank_payment"
                                checked={selectedOption === "bank_payment"}
                                onChange={() => setSelectedOption("bank_payment")}
                            />
                        </div>
                        <div className='flex items-center gap-3'>
                            <Coupon />
                            <div className='space-y-1'>
                                <p className='text-base font-medium'>Coupon Code</p>
                                <p className='text-sm text-secondary'>Your coupon carries the same value as your investment amount</p>
                            </div>
                            <RadioCheckInput
                                name="fund_option"
                                value="coupon_code"
                                checked={selectedOption === "coupon_code"}
                                onChange={() => setSelectedOption("coupon_code")}
                            />
                        </div>
                    </div>

                    <div className="w-full flex justify-center gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-1/2 h-11 border border-[#E4E7EC] text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={handleModal}
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

export default FundOptionsModal;