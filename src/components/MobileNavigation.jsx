import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ReactComponent as Dashboard } from '@/assets/icons/dashboard.svg';
import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Transaction } from '@/assets/icons/transaction.svg';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';

const MobileNavigation = () => {
    return (
        <div className="fixed bottom-0 z-10 md:hidden w-full h-[71px] bg-gray-50 dark:bg-[var(--firstlane-bg)]">
            <nav className="flex items-center justify-between px-4 py-2 text-xs border-t border-gray">
                <NavLink to="/dashboard" className={({ isActive, isPending }) =>
                    `flex flex-col items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-secondary'}`}
                >
                    <Dashboard className="icon" />
                    <span className=''>Dashboard</span>
                </NavLink>
                <NavLink to="/loans" className={({ isActive, isPending }) =>
                    `flex flex-col items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-secondary'}`}
                >
                    <Loan className="icon" />
                    <span className=''>Loans</span>
                </NavLink>
                <NavLink to="/investment" className={({ isActive, isPending }) =>
                    `flex flex-col items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-secondary'}`}
                >
                    <Investment className="icon" />
                    <span className=''>Investment</span>
                </NavLink>
                <NavLink to="/fx-transactions" className={({ isActive, isPending }) =>
                    `flex flex-col items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-secondary'}`}
                >
                    <Transaction className="icon" />
                    <span className=''>FX</span>
                </NavLink>
                <NavLink to="/wallets" className={({ isActive, isPending }) =>
                    `flex flex-col items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-secondary'}`}
                >
                    <Wallet className="icon" />
                    <span className=''>Wallets</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default MobileNavigation;
