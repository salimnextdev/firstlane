import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchKycStatus } from '@/modules/kyc/state/kycSlice';
import { getCookie } from '@/utils/cookieUtils';

import KYCStep1 from '@/modules/kyc/pages/kyc_step_1';
import KYCStep2 from '@/modules/kyc/pages/kyc_step_2';
import KYCStep3 from '@/modules/kyc/pages/kyc_step_3';
import KYCStep4 from '@/modules/kyc/pages/kyc_step_4';

import BackButton from '@/components/BackButton';
import FullscreenLoader from '@/components/FullscreenLoader';

const KYCVerification = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = JSON.parse(getCookie('user') || null);

    const { kycStatus: kycStatus, loading: kyc_loading, error: kyc_error } = useSelector((state) => state.kyc);
    useEffect(() => {
        if (!kyc_loading) {
            dispatch(fetchKycStatus(user._id));
        }
    }, [dispatch]);

    const [isOpen, setIsOpen] = useState(true);
    const [step, setStep] = useState(1);
    useEffect(() => {
        if (kycStatus) {
            const level = parseInt(kycStatus?.level?.split('level')[1] || 0);
            {kycStatus.status === 'verified' || (kycStatus.status === 'pending' && kycStatus.level === 4) ? 
                navigate('/dashboard') :
                level >= 4 ? setStep(1) : // Redirect user's with rejected kyc back to the first page
                setStep(level + 1)};
            setIsOpen(false);
        } else { setIsOpen(false) }
        kyc_error && setIsOpen(false); // Close loader on request failure
    }, [kycStatus]);

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const mapper = {
        1: "Personal Details",
        2: "Means of Identification",
        3: "Next of Kin",
        4: "Address Verification Documents"
    }

    return (
        <div className="">
            <FullscreenLoader
                isOpen={isOpen}
                onClose={setIsOpen}
            />

            <div className="space-y-4">
                <BackButton />
                <div className='mb-5 space-y-1'>
                    <h2 className="text-base md:text-2xl font-medium">KYC Verification</h2>
                    <p className="text-xs md:text-sm text-secondary font-light">{mapper[step]} &nbsp;|&nbsp; Step {step}/4</p>
                </div>

                {step === 1 && <KYCStep1 nextStep={nextStep} />}
                {step === 2 && <KYCStep2 prevStep={prevStep} nextStep={nextStep} />}
                {step === 3 && <KYCStep3 prevStep={prevStep} nextStep={nextStep} />}
                {step === 4 && <KYCStep4 prevStep={prevStep} />}

            </div>
        </div>
    );
};

export default KYCVerification;
