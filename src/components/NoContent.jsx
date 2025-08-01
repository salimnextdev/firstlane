import React from 'react';

import { ReactComponent as Dashboard } from '@/assets/icons/dashboard.svg';
import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Transaction } from '@/assets/icons/transaction.svg';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';
import { ReactComponent as Support } from '@/assets/icons/support.svg';
import { ReactComponent as Setting } from '@/assets/icons/setting.svg';
import { ReactComponent as KYC } from '@/assets/icons/kyc.svg';

const mapper = {
    "dashboard": Dashboard,
    "loans": Loan,
    "investment": Investment,
    "fx transactions": Transaction,
    "wallets": Wallet,
    "support": Support,
    "settings": Setting,
    "kyc verification": KYC
}

const NoContent = ({ icon, title, description }) => {
  const Icon = () => {
    const IconComponent = mapper[icon];
    return <IconComponent className="w-5 h-5 text-primary" />;
  };
  
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-12 h-12 bg-[#D8D9EA] rounded-full flex items-center justify-center mb-4">
        <Icon />
      </div>
      <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-sm md:text-base text-gray-500 max-w-sm">
        {description}
      </p>
    </div>
  );
}

export default NoContent;
