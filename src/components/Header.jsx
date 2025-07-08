import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IoIosSearch } from 'react-icons/io';
import { MdLightMode, MdOutlineLightMode } from "react-icons/md";

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

const Header = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname;
    const pageName = path.split("/")[1]?.replace('-', ' ');

    const Icon = () => {
        const IconComponent = mapper[pageName];
        return <IconComponent color={theme === 'light' ? '#000' : '#fff'} className="w-5 h-5 text-black" />;
    };

    const [notificationOpen, setNotificationOpen] = useState(false);

    // State to manage the current theme: 'light' or 'dark'
    const [theme, setTheme] = useState(() => {
        // 1. Initialize theme from localStorage
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            return savedTheme; // Use saved theme if available
        } else {
            // 2. If no saved theme, check for system preference
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return prefersDark ? 'dark' : 'light'; // Use system preference
        }
    });

    // useEffect hook to apply or remove the 'dark' class on the HTML element
    // and save the theme preference to localStorage
    useEffect(() => {
        const htmlElement = document.documentElement; // Get the <html> element

        if (theme === 'dark') {
            htmlElement.classList.add('dark'); // Add 'dark' class for dark mode
        } else {
            htmlElement.classList.remove('dark'); // Remove 'dark' class for light mode
        }

        // Save the current theme to localStorage
        localStorage.setItem('theme', theme);
    }, [theme]); // Re-run this effect whenever the 'theme' state changes

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200 rounded-t-3xl">
            <NotificationPanel isOpen={notificationOpen} onClose={setNotificationOpen} />

            <div className='w-full h-[64px] px-5 flex items-center justify-between'>
                <div onClick={() => navigate('/dashboard')} className='md:hidden flex items-center gap-2 select-none'>
                    <Logo />
                    <p className='text-[18px] text-primary font-medium'>FirstLane</p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-base">
                    <Icon />
                    <span className='font-medium capitalize'>{pageName}</span>
                </div>
                <div className='md:w-7/12 flex items-center gap-5 md:gap-10'>
                    <div className="relative w-full hidden md:block">
                        <IoIosSearch className="w-5 h-5 absolute top-2 left-3" />
                        <input
                            type="text"
                            placeholder="Search here..."
                            className="w-full h-[40px] pl-10 pr-4 py-2 rounded-md border border-gray text-sm focus:outline-none"
                        />
                    </div>
                    <Bell onClick={() => setNotificationOpen(true)} className="cursor-pointer" />
                    {theme === 'light' ?
                        <MdOutlineLightMode onClick={toggleTheme} className="w-6 h-6 text-gray-500 cursor-pointer" /> :
                        <MdLightMode onClick={toggleTheme} className="w-6 h-6 text-gray-300 cursor-pointer" />
                    }
                    <Menu onClick={() => onClose(!isOpen)} className="md:hidden cursor-pointer" />
                </div>
            </div>
        </header>
    );
};

export default Header;