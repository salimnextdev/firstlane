import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { kycLevel4, uploadFile } from '@/modules/kyc/state/kycSlice';

import FileInput from '@/components/FormInputs/FileInput';
import { IoIosArrowRoundBack } from 'react-icons/io';

import SuccessModal from '@/modules/kyc/components/successModal';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const KYCStep4 = ({ prevStep }) => {
    const dispatch = useDispatch();
    const { kycStatus: userKYC, loading: kyc_loading, error: kyc_error } = useSelector((state) => state.kyc);

    const [isModalOpen, setModalOpen] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        document1: null,
        document2: null,
        document3: null,
    });

    useEffect(() => {
        setFormData({
            document1: userKYC?.bankStatement?.[0]?.documentUrl,
            document2: userKYC?.bankStatement?.[1]?.documentUrl || null,
            document3: userKYC?.bankStatement?.[2]?.documentUrl || null,
        })
    }, [userKYC]);

    const handleChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: { file: files[0] },
        }));
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.document1) errors.document1 = "Statement of account is required";
        return errors;
    };

    const submitKYC = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            Object.values(validationErrors).map(error => {
                toast.error(error);
            });
            return;
        };

        setSubmitted(true);
        let finalDocumentUrls = [];

        try {
            const documentFilesToUpload = [];
            const documentPreExistingUrls = [];

            // --- Simplified: Iterate directly over formData keys ---
            for (const docKey of Object.keys(formData)) { // This is the key change!
                const documentEntry = formData[docKey]?.file;

                if (documentEntry instanceof File) {
                    documentFilesToUpload.push(documentEntry);
                } else if (typeof documentEntry === 'string' && documentEntry.startsWith('http')) {
                    documentPreExistingUrls.push(documentEntry);
                }
            }

            if (documentFilesToUpload.length > 0) {
                // Creates an array of file objects for upload
                const uploadFormData = new FormData();
                documentFilesToUpload.forEach(file => {
                    uploadFormData.append('files', file);
                });

                const uploadResult = await dispatch(uploadFile(uploadFormData));

                if (uploadFile.fulfilled.match(uploadResult)) {
                    finalDocumentUrls = [...documentPreExistingUrls, ...uploadResult.payload.data?.map(file => file?.url || '')];
                } else {
                    toast.error('Document Upload Failed', {
                        description: uploadResult.payload?.message || 'Upload error',
                    });
                    setSubmitted(false);
                    return;
                }
            } else {
                finalDocumentUrls = [...documentPreExistingUrls];
            }

            // Assuming all collected documents become bankStatements
            const data = {
                bankStatements: finalDocumentUrls.map(url => ({ documentUrl: url })),
            };
            
            const resultAction = await dispatch(kycLevel4(data));
            if (kycLevel4.fulfilled.match(resultAction)) {
                setModalOpen(true);
            } else {
                toast(resultAction.payload.message);
                return;
            };
        } catch (error) {
            toast.error("An error occured", {
                description: error.message,
            });
        } finally {
            setSubmitted(false);
        }
    };

    return (
        <div className="space-y-4">
            <SuccessModal
                isOpen={isModalOpen}
                onClose={setModalOpen}
            />

            {/* KYC Verification Banner */}
            <div className="mb-6 bg-[#EBEBEB] border-[1.5px] border-[#D0D5DD] p-4 rounded-xl">
                <div className='w-10 h-10 flex items-center justify-center bg-[#D8D8D8] rounded-full'>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.43459 8.06909C6.44599 4.50997 7.45169 2.73041 8.83172 2.27232C9.59093 2.02031 10.4087 2.02031 11.168 2.27232C12.548 2.73041 13.5537 4.50997 15.5651 8.06909C17.5765 11.6282 18.5822 13.4078 18.2805 14.8578C18.1145 15.6555 17.7056 16.379 17.1124 16.9247C16.034 17.9166 14.0226 17.9166 9.99984 17.9166C5.97704 17.9166 3.96565 17.9166 2.88731 16.9247C2.29407 16.379 1.88516 15.6555 1.71919 14.8578C1.4175 13.4078 2.4232 11.6282 4.43459 8.06909Z" stroke="#1B1B1B" stroke-width="1.5" />
                        <path d="M9.99349 13.3333H10.001" stroke="#1B1B1B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10 10.8333L10 7.49998" stroke="#1B1B1B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <p className="text-sm text-[#667085] text-wrap font-light leading-relaxed">
                    We would be requesting for either your statement of account for the past 6 months or a recent utility bill
                </p>
                <p className="text-sm text-[#667085] text-wrap font-light leading-relaxed">
                    Supported file formats: .png, .jpg, .jpeg, .pdf, .doc, .docx, .xls, .xlsx
                </p>
            </div>

            <form onSubmit={submitKYC} method='post' className='w-full space-y-4'>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
                    <FileInput
                        label='Upload Address Verification Document'
                        name='document1'
                        accept='.png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx'
                        value={formData.document1}
                        onChange={handleChange}
                    />
                    {/* <FileInput
                        label='Utility Bill'
                        name='document2'
                        accept='.png,.jpg,.jpeg,.pdf,.doc,.docx,.xls,.xlsx'
                        value={formData.document2}
                        onChange={handleChange}
                    />
                    <FileInput
                        label='Supporting document (optional)'
                        name='document3'
                        accept='.pdf,.doc,.docx,.xls,.xlsx'
                        value={formData.document3}
                        onChange={handleChange}
                    /> */}
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
                            className="w-8/12 md:w-44 h-11 md:h-9 flex items-center justify-center px-3 rounded-md bg-primary text-white text-sm cursor-pointer"
                            disabled={submitted}
                        >
                            {submitted ?
                                <Loader rotate={360} className='text-xl animate-spin mx-auto' /> :
                                'Submit for verification'
                            }
                        </button>
                    </div>
                </div>
            </form>

        </div>
    );
};

export default KYCStep4;