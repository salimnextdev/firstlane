import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { ReactComponent as Support } from '@/assets/icons/support.svg';
import { ReactComponent as Setting } from '@/assets/icons/setting.svg';
import { ReactComponent as License } from '@/assets/icons/license.svg';
import { ReactComponent as Trash } from '@/assets/icons/trash.svg';
import { ReactComponent as Logout } from '@/assets/icons/logout-sm.svg';
import { ReactComponent as Close } from '@/assets/icons/close.svg';

import LogoutModal from '@/components/LogoutModal';

const MobileSideBar = ({ isOpen, onClose }) => {
    const [isLogout, setIsLogout] = useState(false);

    return (
        isOpen &&
        <div className="fixed z-50 md:hidden w-full h-screen bg-white">
            <LogoutModal
                isOpen={isLogout}
                onClose={setIsLogout}
            />
            
            <div className='flex items-center justify-between px-6 p-4 text-xl'>
                <p>Menu</p>
                <Close onClick={() => onClose(!isOpen)} />
            </div>
            <nav className="space-y-4 px-4 py-2 text-sm border-t border-[#E4E7EC]">
                <NavLink to="/settings" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-gray-900'}`}
                    onClick={() => onClose(!isOpen)}
                >
                    <Setting className="text-secondary" />
                    <span className=''>Setting</span>
                </NavLink>
                <NavLink to="/support" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-gray-900'}`}
                    onClick={() => onClose(!isOpen)}
                >
                    <Support className="text-secondary" />
                    <span className=''>Chat with Support</span>
                </NavLink>
                <NavLink to="/investment" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-gray-900'}`}
                    onClick={() => onClose(!isOpen)}
                >
                    <License className="text-secondary" />
                    <span className=''>Terms and Privacy Policy</span>
                </NavLink>
                <NavLink to="/fx-transactions" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : 'text-gray-900'}`}
                    onClick={() => onClose(!isOpen)}
                >
                    <Trash className="text-secondary" />
                    <span className='text-danger'>Delete account</span>
                </NavLink>
                <div onClick={()=> setIsLogout(true)} className={`flex items-center gap-3 p-2 font-normal text-gray-900`}
                >
                    <Logout className="!text-secondary" />
                    <span className=''>Logout</span>
                </div>
            </nav>
        </div>
    );
};

export default MobileSideBar;
