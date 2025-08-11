import React, { useEffect, useState } from 'react';
import { ReactComponent as Copy } from '@/assets/icons/copy.svg';

import { useDispatch } from 'react-redux';
import { addFXTransaction } from '@/modules/fx_transactions/state/fxSlice';
import { getCookie } from '@/utils/cookieUtils';

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose
} from "@/components/ui/dialog";

import TransactionInput from '@/components/FormInputs/TransactionInput';
import AccountFormModal from '@/modules/fx_transactions/components/accountFormModal';
import { copyToClipboard } from '@/utils/copyToClipboard';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const ConfirmModal = ({
    isOpen,
    onClose,
    data,
    rate,
    type,
    title = "Confirm FX Transaction",
    buttonCLoseText = "No, Cancel",
    buttonSuccessText = "I have paid"
}) => {
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [buy, setBuy] = useState('');
    const [sell, setSell] = useState('');

    useEffect(() => {
        const rateBuyValue = parseFloat(rate?.baseCurrency?.value) || 0;
        const rateSellValue = parseFloat(rate?.targetCurrency?.value) || 0;
        // setSell(parseFloat(rate?.baseCurrency?.value.toFixed(2)));
        // setBuy((parseFloat(rate?.baseCurrency?.value) * rateSellValue).toFixed(2));

        if (type === 'Buy') {
            setSell(parseFloat(rate?.baseCurrency?.value.toFixed(2)));
            setBuy((parseFloat(rate?.baseCurrency?.value) / rateBuyValue).toFixed(2));
        } else if (type === 'Sell') {
            setSell(parseFloat(rate?.baseCurrency?.value.toFixed(2)));
            setBuy((parseFloat(rate?.baseCurrency?.value) * rateSellValue).toFixed(2));
        }
    }, [isOpen, rate, type]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle number conversion, prevent NaN
        const numericValue = parseFloat(value) || 0;

        const rateBuyValue = parseFloat(rate?.baseCurrency?.value) || 0;
        const rateSellValue = parseFloat(rate?.targetCurrency?.value) || 0;
        // const rateValue = parseFloat(rate?.targetCurrency?.value) || 0;

        if (type === 'Sell' && name === 'sell') {
            setSell(value);
            setBuy((value * rateSellValue).toFixed(2));
        } else if (type === 'Buy' && name === 'sell') {
            setSell(value);
            setBuy((value / rateBuyValue).toFixed(2));
        }
    };

    const validateForm = () => {
        const errors = {};
        if (!buy) errors.buy = "Amount is required";
        if (!sell) errors.sell = "Amount is required";
        return errors;
    };

    const createFX = async () => {
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.error(error);
            });
            setSubmitted(false);
            return;
        };
        setSubmitted(true);

        const data = {
            "userID": user?._id,
            "fromCurrency": {
                "currencyID": rate?.baseCurrency?.currencyID?._id,
                "value": sell
            },
            "toCurrency": {
                "currencyID": rate?.targetCurrency?.currencyID?._id,
                "value": buy
            },
            "fxRateID": rate?._id,
            "type": type?.toLowerCase()
        };

        try {
            const resultAction = await dispatch(addFXTransaction(data));
            if (addFXTransaction.fulfilled.match(resultAction)) {
                setIsModalOpen(true);
                onClose();
            } else {
                toast.error(resultAction.payload.message);
                return;
            };
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
            return false;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <AccountFormModal
                isOpen={isModalOpen}
                onClose={setIsModalOpen}
                type={type}
                rate={rate}
            />
            <DialogContent
                className="z-50 md:p-6 md:px-8 bg-white border border-gray rounded-xl 
            md:!max-w-[680px] h-[90vh] md:h-auto mx-auto overflow-y-auto">
                <div className="space-y-5">
                    <div className="w-[48px] h-[48px] bg-[#D8D9EA] hidden md:flex items-center justify-center rounded-full">
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 6.0268C9.483 3.17323 11.9665 1 14.9575 1C18.2947 1 21 3.70532 21 7.0425C21 10.0335 18.8268 12.517 15.9732 13" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7 21C10.3137 21 13 18.3137 13 15C13 11.6863 10.3137 9 7 9C3.68629 9 1 11.6863 1 15C1 18.3137 3.68629 21 7 21Z" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M1 8C1 4.68286 3.68286 2 7 2L6.14286 3.71429" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M21 14C21 17.3171 18.3171 20 15 20L15.8571 18.2857" stroke="#3E4095" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                    <DialogHeader>
                        <DialogTitle className="text-base md:text-2xl text-left">{title}</DialogTitle>
                    </DialogHeader>

                    <div className='space-y-3'>
                        <TransactionInput
                            // label={type === 'Buy' ? 'You are selling' : 'You are buying'}
                            label={'You are selling'}
                            name='sell'
                            symbol={rate?.baseCurrency?.currencyID?.symbol || '₦'}
                            currency={rate?.baseCurrency?.currencyID?.code || 'NGN'}
                            value={sell}
                            onChange={handleChange}
                            disabled={type === 'Sell' && true}
                        />
                        <TransactionInput
                            // label={type === 'Buy' ? 'To buy' : 'By selling'}
                            label={'To Recieve'}
                            name='buy'
                            symbol={rate?.targetCurrency?.currencyID?.symbol || '$'}
                            currency={rate?.targetCurrency?.currencyID?.code || 'USD'}
                            value={buy}
                            onChange={handleChange}
                            disabled={type === 'Buy' && true}
                        />
                    </div>

                    {type === 'Buy' && <div className='space-y-4 text-sm text-secondary'>
                        <div className='w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-8'>
                            <div className='w-full md:w-1/2 flex items-center justify-between'>
                                <div className='space-y-1 text-xs'>
                                    <p>Account number</p>
                                    <p className='text-base font-medium'>{data.acc_number}</p>
                                </div>
                                <Copy onClick={() => copyToClipboard(data.acc_number)} className="cursor-pointer" />
                            </div>
                            <div className='w-full md:w-1/2 flex items-center justify-between'>
                                <div className='space-y-1 text-xs'>
                                    <p>Account holder's name</p>
                                    <p className='text-base font-medium'>{data.acc_name}</p>
                                </div>
                                <Copy onClick={() => copyToClipboard(data.acc_name)} className="cursor-pointer" />
                            </div>
                        </div>
                        <div className='w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-8'>
                            <div className='w-full md:w-1/2 flex items-center justify-between'>
                                <div className='space-y-1 text-xs'>
                                    <p>Wire routing</p>
                                    <p className='text-base font-medium'>{data.wire}</p>
                                </div>
                                <Copy onClick={() => copyToClipboard(data.wire)} className="cursor-pointer" />
                            </div>
                            <div className='w-full md:w-1/2 flex items-center justify-between'>
                                <div className='space-y-1 text-xs'>
                                    <p>ACH routing</p>
                                    <p className='text-base font-medium'>{data.ach}</p>
                                </div>
                                <Copy onClick={() => copyToClipboard(data.ach)} className="cursor-pointer" />
                            </div>
                        </div>
                        <div className='w-full flex flex-col md:flex-row md:items-center gap-3 md:gap-8'>
                            <div className='w-full md:w-1/2 flex items-center justify-between'>
                                <div className='space-y-1 text-xs'>
                                    <p>Account type</p>
                                    <p className='text-base font-medium'>{data.type}</p>
                                </div>
                                <Copy onClick={() => copyToClipboard(data.type)} className="cursor-pointer" />
                            </div>
                            <div className='w-full md:w-1/2 flex items-center justify-between'>
                                <div className='space-y-1 text-xs'>
                                    <p>Account name</p>
                                    <p className='text-base font-medium'>{data.bank_name}</p>
                                </div>
                                <Copy onClick={() => copyToClipboard(data.bank_name)} className="cursor-pointer" />
                            </div>
                        </div>

                        <div className='flex items-center gap-2 font-normal'>
                            <p>Copy all</p>
                            <Copy onClick={() => copyToClipboard(data)} className="cursor-pointer" />
                        </div>
                    </div>}

                    {type === 'Sell' && <div className='space-y-4 text-sm text-secondary'>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-1 text-xs'>
                                <p>Account number</p>
                                <p className='text-base font-medium'>{data.acc_number}</p>
                            </div>
                            <Copy onClick={() => copyToClipboard(data.acc_number)} className="cursor-pointer" />
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-1 text-xs'>
                                <p>Bank name</p>
                                <p className='text-base font-medium'>{data.bank_name}</p>
                            </div>
                            <Copy onClick={() => copyToClipboard(data.bank_name)} className="cursor-pointer" />
                        </div>
                        <div className='space-y-1 text-xs'>
                            <p>Account name</p>
                            <p className='text-base font-medium'>{data.acc_name}</p>
                        </div>
                        <div className='flex items-center gap-2 font-normal'>
                            <p>Copy all</p>
                            <Copy onClick={() => copyToClipboard(data)} className="cursor-pointer" />
                        </div>
                    </div>}

                    <p className='text-sm md:text-base text-secondary font-light'>
                        Please click on the
                        <span className='mx-1 font-medium'>“I have paid”</span>
                        button to confirm that you have made the payment.
                    </p>

                    <div className="w-full flex flex-col md:flex-row flex-col-reverse md:justify-center gap-2 md:gap-5 font-medium">
                        <DialogClose
                            onClick={onClose}
                            className="w-full md:w-1/2 h-11 border border-gray text-sm px-8 py-3 cursor-pointer rounded-md"
                        >
                            {buttonCLoseText}
                        </DialogClose>
                        <button
                            onClick={createFX}
                            className="w-full md:w-1/2 h-11 bg-primary text-white text-sm px-8 py-3 cursor-pointer rounded-xl"
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                buttonSuccessText
                            }
                        </button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ConfirmModal;