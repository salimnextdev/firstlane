import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addLoan } from '@/modules/loans/state/loanSlice';
import { uploadFile } from '@/modules/kyc/state/kycSlice';
import { getCookie } from '@/utils/cookieUtils';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import SearchInput from '@/components/FormInputs/searchInput';
import FileInput from '@/components/FormInputs/FileInput';
import PlacesInput from '@/components/FormInputs/PlacesInput';
import BackButton from '@/components/BackButton';
import { useLoanDropdowns } from '@/utils/dropdownOptions';

import { toast } from 'sonner';
import { Loader } from 'lucide-react';

import { GetCountries, GetState } from 'react-country-state-city';
import LoanSuccessModal from '../components/loanSuccessCard';
import StatesInput from '@/components/FormInputs/StatesInput';
import LGAInput from '@/components/FormInputs/LGAInputs';
import { fetchAdminSettings } from '@/modules/settings/state/adminSettingsSlice';

const EmployeeLoans = () => {
    const {
        loanReasons: { options: loanReasons, loading: loadingReasons, error: errorReasons },
        loanDurations: { options: loanDurations, loading: loadingDurations, error: errorDurations },
        loanIntervals: { options: loanIntervals, loading: loadingIntervals, error: errorIntervals },
    } = useLoanDropdowns();

    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user'));

    const { settings, loading: settings_loading, error: settings_error } = useSelector((state) => state.admin_settings);
    useEffect(() => {
        if (!settings || !settings_loading) {
            dispatch(fetchAdminSettings());
        }
    }, [dispatch]);

    const [isOpen, setIsModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        amount: "",
        loan_reason: "",
        duration: "",
        interval: "",
        others: "",
        employer_name: "",
        employer_phone: "",
        employer_grade: "",
        employer_income: "",
        address: "",
        nationality: "",
        state: "",
        lga: "",
        referral: "",
        bank_statement: null,
    });

    const [checked, setChecked] = useState(false);

    const [countriesList, setCountriesList] = useState([]);
    const [stateList, setStateList] = useState([]);
    useEffect(() => {
        setFormData(prev => ({ ...prev, nationality: "nigeria" })); // Default value

        GetCountries().then((result) => {
            // format coutries list to match my SearchInput data format
            setCountriesList(result.map(item => ({ ...item, label: item.name, value: item.name })));
        });
    }, [dispatch]);
    useEffect(() => {
        const countryID = formData.nationality && countriesList.find(item => item.name === formData.nationality);
        if (countryID) {
            GetState(parseInt(countryID.id)).then((result) => {
                setStateList(result.map(item => ({ ...item, label: item.name, value: item.name })));
            });
        };
    }, [dispatch, formData.nationality]);

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        if (name == 'nationality' && value !== 'Nigeria') {
            setFormData((prev) => ({
                ...prev,
                state: 'others',
                lga: 'others',
            }));
            toast.warning("States and LGA are disabled for countries other than Nigeria");
        }
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? { file: files[0] } : value,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!checked) errors.checked = "Please check the consent box";
        if (!formData.amount) errors.amount = "Loan amount is required";
        if (!formData.loan_reason) errors.loan_reason = "Loan reason is required";
        if (!formData.duration) errors.duration = "Loan duration is required";
        if (!formData.interval) errors.interval = "Loan interval is required";
        if (!formData.employer_name) errors.employer_name = "Employer's name is required";
        if (!formData.employer_phone) errors.employer_phone = "Employer's phone is required";
        if (!formData.employer_income) errors.employer_income = "Employer's income is required";
        if (!formData.address) errors.address = "Employer's address is required";
        if (!formData.state) errors.state = "State is required";
        if (!formData.lga) errors.lga = "LGA is required";
        if (!formData.bank_statement) errors.bank_statement = "Bank statement is required";
        return errors;
    };

    const submitLoan = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.warning(error);
            });
            return;
        };

        setSubmitted(true);

        try {
            let bankStatementUrl;
            if (formData.bank_statement && formData.bank_statement.file instanceof File) {
                const uploadResult = await dispatch(uploadFile(formData.bank_statement.file)).unwrap();
                bankStatementUrl = uploadResult?.data?.[0]?.url;
                if (!bankStatementUrl) {
                    toast.error('Document Upload Failed', {
                        description: 'Upload succeeded but no file URL was returned.',
                    });
                    return;
                }
            } else {
                bankStatementUrl = formData.bank_statement;
            };

            const loanData = {
                amountRequested: formData.amount,
                purpose: formData.loan_reason,
                tenure: formData.duration,
                repaymentInterval: formData.interval,

                employerName: formData.employer_name,
                employerPhoneNumber: formData.employer_phone,
                employerGrade: formData.employer_grade,
                monthlyIncome: formData.employer_income,
                employerAddress: formData.address?.display_name || formData.address,
                state: formData.state,
                lga: formData.lga,
                bankStatement: bankStatementUrl,

                loanType: "employee",
                userID: user._id,
                refCode: formData.referral,
            };

            await dispatch(addLoan(loanData)).unwrap();
            toast.success("Loan application submitted successfully");
            setIsModalOpen(true);
        } catch (error) {
            toast.error("An error occured", {
                description: error?.message || 'Something went wrong while submitting your loan application.',
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <form onSubmit={submitLoan} method='post' className="space-y-5">
            <LoanSuccessModal
                isOpen={isOpen}
                onClose={setIsModalOpen}
            />
            <BackButton />

            <div className="w-full flex items-center justify-between gap-4">
                <h2 className="text-base md:text-2xl font-medium">
                    Apply for an employee loan
                </h2>

                <div className="fixed md:static left-0 bottom-0 md:bottom-auto z-10 w-full md:w-auto h-[71px] md:h-auto px-5 md:px-0 bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <button
                        className={`w-full md:w-40 h-11 md:h-9 mt-3 md:mt-0 px-3 rounded-md bg-primary text-sm text-white cursor-pointer ${(submitted || !settings) && 'opacity-70'}`}
                        disabled={submitted || !settings}
                    >
                        {submitted ?
                            <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                            'Submit application'
                        }
                    </button>
                </div>
            </div>


            <div className='md:bg-gray md:p-5 space-y-3 md:border border-gray rounded-xl'>
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label="How much do you want?"
                        name="amount"
                        className='text-sm'
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="1234567890"
                    />
                    <SelectInput
                        label="Why do you want this loan?"
                        name="loan_reason"
                        className='text-sm'
                        value={formData.loan_reason}
                        onChange={handleChange}
                        options={loanReasons}
                        placeholder="Select purpose"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <SelectInput
                        label="How long before you pay?"
                        name="duration"
                        className='text-sm'
                        value={formData.duration}
                        onChange={handleChange}
                        options={loanDurations}
                        placeholder="Select tenure"
                    />
                    <SelectInput
                        label="What is the payment interval?"
                        name="interval"
                        className='text-sm'
                        value={formData.interval}
                        onChange={handleChange}
                        options={loanIntervals}
                        placeholder="Select repayment"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label='Employer"s name'
                        name='employer_name'
                        className='text-sm'
                        value={formData.employer_name}
                        onChange={handleChange}
                        placeholder="Ventures studio group"
                    />
                    <TextInput
                        label='Employer"s phone number'
                        name='employer_phone'
                        className='text-sm'
                        value={formData.employer_phone}
                        onChange={handleChange}
                        placeholder="08000000000"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label='Employer"s grade (optional)'
                        name='employer_grade'
                        className='text-sm'
                        value={formData.employer_grade}
                        onChange={handleChange}
                        placeholder="15"
                    />
                    <TextInput
                        label='Your monthly income'
                        name='employer_income'
                        className='text-sm'
                        value={formData.employer_income}
                        onChange={handleChange}
                        placeholder="#100,000.00"
                    />
                </div>

                {/* <PlacesInput
                    label="Employer's address"
                    name="address"
                    className='text-sm'
                    value={formData.address}
                    onChange={(address) => {
                        setFormData({ ...formData, ['address']: address });
                    }}
                    placeholder="No 8 Amadu Bello Way, Wuse"
                /> */}

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label="Employer's address"
                        name="address"
                        className='text-sm'
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="No 8 Amadu Bello Way, Wuse"
                    />

                    <FileInput
                        label='Bank Statement'
                        name='bank_statement'
                        className='text-sm'
                        value={formData.bank_statement}
                        onChange={handleChange}
                        accept=".pdf,.doc,.docx,.xls,.xlsx,image/*"
                    />
                </div>

                <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-3'>
                    <SearchInput
                        label="Nationality"
                        name="nationality"
                        className='text-sm'
                        value={formData.nationality}
                        onChange={handleChange}
                        data={countriesList || []}
                        placeholder="Select Nationality"
                    />

                    {formData.nationality === 'Nigeria' ?
                        <>
                            <StatesInput
                                value={formData.state}
                                onChange={handleChange}
                                isDisabled={formData.nationality !== 'Nigeria'}
                            />

                            <LGAInput
                                stateValue={formData.state}
                                value={formData.lga}
                                onChange={handleChange}
                                fetch={formData.nationality == 'Nigeria'}
                                isDisabled={formData.nationality !== 'Nigeria'}
                            />
                        </> :
                        <>
                            <TextInput
                                label="State"
                                name="state"
                                className='text-sm'
                                value={formData.state}
                                onChange={handleChange}
                                placeholder='Lagos'
                                disabled
                            />
                            <TextInput
                                label="LGA"
                                name="lga"
                                className='text-sm'
                                value={formData.lga}
                                onChange={handleChange}
                                placeholder='Apapa'
                                disabled
                            />
                        </>
                    }

                    <TextInput
                        label='Referral code (optional)'
                        name='referral'
                        value={formData.referral}
                        onChange={handleChange}
                        placeholder='000000'
                    />
                </div>
            </div>

            <div className='flex md:items-center gap-4 md:pr-8 text-sm text-secondary font-light'>
                <input onChange={() => setChecked(!checked)} type="checkbox" name='checked' className='w-5 h-5 accent-[#3E4095] cursor-pointer' />
                <p>I declare that the above information capture, is correct and complete in every respect and any failure by me to pay any amount
                    which is due and outstanding under this agreement, I will pay additional {settings?.loanSettings?.employeeLoanInterestRate || '--'}% per annum</p>
            </div>

        </form>
    );
};

export default EmployeeLoans;
