import React, { useState } from 'react';
import CouponModal from './couponModal';

const SyncInvestmentCard = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>
            <CouponModal
                title='Sync investment'
                description="Enter your given coupon code to sync your investment on Firstlane digital application.
                This would make it easy for your to continue experiencing great financial services from Firstlane's digital application."
                isOpen={isOpen}
                onClose={setIsOpen}
            />

            <div className="w-full md:w-[240px] bg-gradient-to-br from-[#0B1E3A] to-[#142F57] text-white mb-6 mr-4 p-6 rounded-xl">
                <h2 className="text-sm font-medium mb-2">Existing user?</h2>
                <p className="text-sm text-[#D0D5DD] font-light mb-4">
                    Are you an existing user who has investments with Firstlane? Click button to reflect your investment digitally here.
                </p>
                <button
                    onClick={() => setIsOpen(true)}
                    className="text-sm font-medium text-white bg-transparent border-b border-white hover:text-gray-300 transition-all cursor-pointer"
                >
                    Sync investment
                </button>
            </div>
        </div>
    );
};

export default SyncInvestmentCard;