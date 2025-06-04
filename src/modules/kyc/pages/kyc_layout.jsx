import React, { useState } from 'react';

import KYCStep1 from '@/modules/kyc/pages/kyc_step_1';
import KYCStep2 from '@/modules/kyc/pages/kyc_step_2';
import KYCStep3 from '@/modules/kyc/pages/kyc_step_3';
import KYCStep4 from '@/modules/kyc/pages/kyc_step_4';
import BackButton from '@/components/BackButton';
import ScrollToTop from '@/components/ScrollToTop';

const KYCVerification = () => {
    const [step, setStep] = useState(1);

    const nextStep = () => setStep((prevStep) => prevStep + 1);
    const prevStep = () => setStep((prevStep) => prevStep - 1);

    const mapper = {
        1: "Personal Details",
        2: "Means of Identification",
        3: "Next of Kin",
        4: "Documents"
    }

    return (
        <div className="">
            <ScrollToTop />
            <div className="space-y-4">
                <BackButton />

                <div className='mb-5 space-y-1'>
                    <h2 className="text-base md:text-2xl font-medium">KYC Verification</h2>
                    <p className="text-xs md:text-sm text-secondary">{mapper[step]} &nbsp;|&nbsp; Step {step}/4</p>
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
