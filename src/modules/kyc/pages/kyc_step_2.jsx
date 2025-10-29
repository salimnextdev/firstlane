import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { kycLevel2, uploadFile } from '@/modules/kyc/state/kycSlice';

import TextInput from '@/components/FormInputs/TextInput';
import SelectInput from '@/components/FormInputs/SelectInput';
import DateInput from '@/components/FormInputs/DateInput';
import FileInput from '@/components/FormInputs/FileInput';
import { IoIosArrowRoundBack } from 'react-icons/io';

import { IDTypeOptions } from '@/utils/dropdownOptions';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const KYCStep2 = ({ prevStep, nextStep }) => {
    const dispatch = useDispatch();
    const { kycStatus: userKYC, loading: kyc_loading, error: kyc_error } = useSelector((state) => state.kyc);

    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        id_type: "",
        id_number: "",
        issue_date: "",
        expiry_date: "",
        bvn: "",
        document: null,
    });

    useEffect(() => {
        setFormData({
            id_type: userKYC?.idType || "",
            id_number: userKYC?.idNumber || "",
            issue_date: userKYC?.issueDate || "",
            expiry_date: userKYC?.expiryDate || "",
            bvn: userKYC?.bvn || "",
            document: null,
        })
    }, [userKYC]);

    const handleChange = (e) => {
        const { name, type, files, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'file' ? { file: files[0] } : value,
        }));
    };

    const handleDateChange = (name, date) => {
        setFormData((prev) => ({
            ...prev,
            [name]: date,
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.id_type) errors.id_type = "ID type is required";
        if (!formData.id_number) errors.id_number = "ID number is required";
        // if (!formData.issue_date) errors.issue_date = "Issue date is required";
        // if (!formData.expiry_date) errors.expiry_date = "Expiry date is required"; 
        // // Remove since not all ID might have issuing date or expiring date e.g (NIN)
        if (!formData.bvn) errors.bvn = "BVN is required";
        if (!formData.document) errors.document = "Document is required";
        return errors;
    };

    const submitKYC = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast(error);
            });
            return;
        };

        setSubmitted(true);
        try {
            let documentUpload;
            if (formData.document && formData.document.file instanceof File) {
                documentUpload = await dispatch(uploadFile({ files: formData.document.file }));

                if (!uploadFile.fulfilled.match(documentUpload)) {
                    toast.error('Document Upload Failed',
                        { description: documentUpload.payload?.message || 'Something went wrong. Please try again.' }
                    );
                    return;
                }
            } else { documentUpload = formData.document };

            const data = {
                idType: formData.id_type,
                idNumber: formData.id_number,
                issueDate: formData.issue_date,
                expiryDate: formData.expiry_date,
                bvn: formData.bvn,
                documentUrl: documentUpload.payload?.data[0]?.url || documentUpload,
            };
            const resultAction = await dispatch(kycLevel2(data));
            if (kycLevel2.fulfilled.match(resultAction)) {
                nextStep();
            } else {
                toast.error(resultAction.payload?.message || 'Something went wrong. Please try again.');
                return;
            };
        } catch (error) {
            toast.error("An error occured", {
                description: error?.message || 'Something went wrong. Please try again.',
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={submitKYC} method='post' className='w-full space-y-4'>
                <div className='flex flex-col md:flex-row items-center gap-3'>
                    <SelectInput
                        label="ID Type"
                        name="id_type"
                        className='text-sm'
                        value={formData.id_type}
                        onChange={handleChange}
                        options={IDTypeOptions}
                        placeholder="Select ID Type"
                    />
                    <TextInput
                        label="ID Number"
                        name="id_number"
                        className='text-sm'
                        value={formData.id_number}
                        onChange={handleChange}
                        placeholder="1234567890"
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <DateInput
                        label="Issue Date"
                        name="issue_date"
                        value={formData.issue_date}
                        onChange={(date) => handleDateChange('issue_date', date)}
                        placeholder='DD / MM / YY'
                    />
                    <DateInput
                        label="Expiry Date"
                        name="expiry_date"
                        value={formData.expiry_date}
                        onChange={(date) => handleDateChange('expiry_date', date)}
                        placeholder='DD / MM / YY'
                    />
                </div>

                <div className='w-full flex flex-col md:flex-row items-center gap-3'>
                    <TextInput
                        label="Bank Verification Number"
                        name="bvn"
                        className='text-sm'
                        value={formData.bvn}
                        onChange={handleChange}
                        placeholder="0123456789"
                    />
                    <FileInput
                        label='Upload document'
                        name='document'
                        value={formData.document}
                        onChange={handleChange}
                        accept=".pdf,image/*"
                    />
                </div>

                <div className="fixed md:static bottom-0 z-10 w-full bg-gray-50 dark:bg-[var(--firstlane-bg)] border-t md:border-0 border-gray">
                    <div className="flex items-center justify-center md:justify-start gap-3 mr-8 md:m-0 h-[71px]">
                        <button
                            onClick={prevStep}
                            className="w-3/12 md:w-20 h-11 md:h-9 flex items-center justify-center md:justify-start px-3 text-sm rounded-md border border-gray-200 cursor-pointer"
                        >
                            <span className="hidden md:block">Previous</span>
                            <IoIosArrowRoundBack className="w-7 h-7 md:hidden text-secondary" />
                        </button>

                        <button
                            className="w-8/12 md:w-36 h-11 md:h-9 flex items-center justify-center px-3 rounded-md bg-primary text-white text-sm cursor-pointer"
                            disabled={submitted}
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Save and continue'
                            }
                        </button>
                    </div>
                </div>

            </form>

        </div>
    );
};

export default KYCStep2;