import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IoIosSearch } from 'react-icons/io';

import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import { ReactComponent as Dashboard } from '@/assets/icons/dashboard.svg';
import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Transaction } from '@/assets/icons/transaction.svg';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';
import { ReactComponent as Support } from '@/assets/icons/support.svg';
import { ReactComponent as Setting } from '@/assets/icons/setting.svg';
import { ReactComponent as KYC } from '@/assets/icons/kyc.svg';
import { ReactComponent as Bell } from '@/assets/icons/bell.svg';
import { ReactComponent as Menu } from '@/assets/icons/menu.svg';

import NotificationPanel from './NotificationPanel';

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

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const pageName = path.split("/")[1]?.replace('-', ' ');

    const Icon = () => {
        const IconComponent = mapper[pageName];
        return <IconComponent color="#000" className="w-5 h-5 text-black" />;
    };

    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-3xl">
            <NotificationPanel isOpen={isOpen} onClose={setIsOpen} />
            
            <div className='w-full h-[64px] px-5 flex items-center justify-between'>
                <div onClick={()=> navigate('/dashboard')} className='md:hidden flex items-center gap-2 select-none'>
                    <Logo />
                    <p className='text-[18px] text-primary font-medium'>FirstLane</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-base">
                    <Icon />
                    <span className='font-medium capitalize'>{pageName}</span>
                </div>
                <div className='md:w-7/12 flex items-center gap-5 md:gap-10'>
                    <div className="relative w-full hidden md:block">
                        <IoIosSearch className="w-5 h-5 absolute top-2 left-3 text-gray-600" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full h-[40px] pl-10 pr-4 py-2 rounded-md border border-[#E4E7EC] text-sm focus:outline-gray-200"
                        />
                    </div>
                    <Bell onClick={() => setIsOpen(true)} className="cursor-pointer" />
                    <Menu className="md:hidden cursor-pointer" />
                </div>
            </div>
        </header>
    );
};

export default Header;