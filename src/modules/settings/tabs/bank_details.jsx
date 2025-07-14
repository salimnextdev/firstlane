import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { verifyAccount } from '@/modules/wallets/state/walletSlice';

import SelectInput from '@/components/FormInputs/SelectInput';
import TextInput from '@/components/FormInputs/TextInput';

import { IoIosCheckmarkCircle } from 'react-icons/io';
import { accountTypeOptions, useBankOptions } from '@/utils/dropdownOptions';
import SearchInput from '@/components/FormInputs/searchInput';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const BankDetails = () => {
    const dispatch = useDispatch();

    const { bankOptions, loading, error } = useBankOptions();
    const [option, setOption] = useState('NGN');
    const currencies = ['NGN', 'USD', 'GBP', 'EUR', 'CHF', 'CAD', 'KWD']

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        account_number: "",
        bank_name: "",
        account_name: "",
    });
    useEffect(() => {
        const verifyBankDetails = async () => {
            if (formData.account_number && formData.bank_name) {
                try {
                    const resultAction = await dispatch(verifyAccount({
                        accountNumber: formData.account_number,
                        bankCode: formData.bank_name,
                    }));

                    if (verifyAccount.fulfilled.match(resultAction)) {
                        setFormData((prev) => ({
                            ...prev,
                            account_name: resultAction.payload.account_name, // Access account_name from payload
                        }));
                    } else {
                        setFormData((prev) => ({
                            ...prev,
                            account_name: "", // Clear account name on failure
                        }));
                    }
                } catch (error) {
                    // This catch block handles errors that occur outside of the thunk's promise rejection,
                    // e.g., network errors before the thunk even gets dispatched.
                    toast.error('An unexpected error occurred during verification.');
                    setFormData((prev) => ({
                        ...prev,
                        account_name: "", // Clear account name on unexpected error
                    }));
                }
            } else {
                // Optional: Clear account_name if either account_number or bank_name is missing
                // This prevents an old account_name from lingering if inputs are cleared.
                setFormData((prev) => ({
                    ...prev,
                    account_name: "",
                }));
            }
        };

        // Call the async function
        verifyBankDetails();

    }, [formData.account_number, formData.bank_name, dispatch]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="space-y-4">
            <div className='w-full flex items-center gap-2 md:gap-3 overflow-x-auto hide-scrollbar'>
                {currencies.map(item => (
                    <button
                        key={item}
                        onClick={() => setOption(item)}
                        // Ensure flex-shrink-0 is added to buttons to prevent them from shrinking and wrapping
                        className={`flex-shrink-0 w-16 h-9 ${option === item ? 'bg-[#D8D9EA] text-primary' : 'border border-gray'} text-sm rounded-md cursor-pointer`}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {option === 'NGN' ?
                <form method="post" className='space-y-4'>
                    <TextInput
                        label='Account number'
                        name='account_number'
                        className='text-sm'
                        value={formData.account_number}
                        onChange={handleChange}
                        placeholder='0123456789'
                    />
                    <SearchInput
                        label='Bank name'
                        name='bank_name'
                        value={formData.bank_name}
                        onChange={handleChange}
                        data={bankOptions || []}
                        placeholder='Select bank'
                    />
                    <div className='relative'>
                        <TextInput
                            label='Account holder"s name'
                            name='account_name'
                            className='text-sm bg-currency'
                            value={formData.account_name}
                            placeholder='Ayoola Sani'
                            disabled
                        />
                        <IoIosCheckmarkCircle className='absolute top-1/2 right-5 w-[25px] h-[25px] text-[#0F973D]' />
                    </div>

                    <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                        <button
                            className='w-full md:w-32 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                        >
                            Save changes
                        </button>
                    </div>
                </form> :

                <form method='post' className='space-y-4 text-sm'>
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
                            options={accountTypeOptions}
                            placeholder='Checking'
                        />
                        <TextInput
                            label='Swift code'
                            name='code'
                            placeholder='012345'
                        />
                    </div>
                    <SearchInput
                        label='Bank name'
                        name='bank_name'
                        value={formData.bank_name}
                        onChange={handleChange}
                        data={bankOptions || []}
                        placeholder='Select bank'
                    />

                    <div className="fixed md:static bottom-0 z-10 w-full h-[71px] pr-10 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                        <button
                            className='w-full md:w-32 h-11 md:h-9 my-3 md:my-0 px-3 rounded-md bg-primary text-sm cursor-pointer'
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Save changes'
                            }
                        </button>
                    </div>
                </form>}
        </div>
    );
};

export default BankDetails;