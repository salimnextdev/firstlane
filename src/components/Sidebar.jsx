import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '@/modules/auth/state/authSlice';

import { ReactComponent as Dashboard } from '@/assets/icons/dashboard.svg';
import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Transaction } from '@/assets/icons/transaction.svg';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';
import { ReactComponent as Support } from '@/assets/icons/support.svg';
import { ReactComponent as Setting } from '@/assets/icons/setting.svg';
import { ReactComponent as Logout } from '@/assets/icons/sign-out.svg';
import logo from '@/assets/images/logo.png';

import CouponModal from '@/modules/investments/components/couponModal';
import LogoutModal from '@/components/LogoutModal';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { userProfile: userProfile, loading: loading, error: error } = useSelector((state) => state.auth);
    useEffect(() => {
        if (!loading || !userProfile) {
            dispatch(fetchUserProfile());
        }
    }, [dispatch]);

    const [isOpen, setIsOpen] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    return (
        <div className="w-8 md:w-[272px] relative h-screen hidden md:block bg-white fixed left-0 top-0 z-10">
            <LogoutModal
                isOpen={isLogout}
                onClose={setIsLogout}
            />
            <CouponModal
                title='Sync investment'
                description="Enter your given coupon code to sync your investment on Firstlane digital application.
                This would make it easy for your to continue experiencing great financial services from Firstlane's digital application."
                isOpen={isOpen}
                onClose={setIsOpen}
            />

            <div className="flex items-center gap-3 px-6 h-20">
                <img className="w-8" alt="logo" src={logo} />
                <h1 className="text-2xl font-medium text-primary">FirstLane</h1>
            </div>
            <nav className="px-4 space-y-2 text-sm">
                <NavLink to="/dashboard" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : ''}`}
                >
                    {/* <LuLayoutDashboard className='w-5 h-5' /> */}
                    <Dashboard className="icon" />
                    <span className='hidden md:inline'>Dashboard</span>
                </NavLink>
                <NavLink to="/loans" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : ''}`}
                >
                    {/* <HiOutlineCash className='w-5 h-5' /> */}
                    <Loan className="icon" />
                    <span className='hidden md:inline'>Loans</span>
                </NavLink>
                <NavLink to="/investment" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : ''}`}
                >
                    {/* <BsDatabaseUp className='w-5 h-5' /> */}
                    <Investment className="icon" />
                    <span className='hidden md:inline'>Investment</span>
                </NavLink>
                <NavLink to="/fx-transactions" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : ''}`}
                >
                    {/* <AiOutlineTransaction className='w-5 h-5' /> */}
                    <Transaction className="icon" />
                    <span className='hidden md:inline'>FX Transactions</span>
                </NavLink>
                <NavLink to="/wallets" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : ''}`}
                >
                    {/* <IoWalletOutline className='w-5 h-5' /> */}
                    <Wallet className="icon" />
                    <span className='hidden md:inline'>Wallets</span>
                </NavLink>
                <NavLink to="/support" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : ''}`}
                >
                    {/* <FaHeadphonesAlt className='w-4 h-4' /> */}
                    <Support className="icon" />
                    <span className='hidden md:inline'>Support</span>
                </NavLink>
                <NavLink to="/settings" className={({ isActive, isPending }) =>
                    `flex items-center gap-3 p-2 font-normal ${isActive ? 'text-primary' : ''}`}
                >
                    {/* <IoSettingsOutline className='w-5 h-5' /> */}
                    <Setting className="icon" />
                    <span className='hidden md:inline'>Settings</span>
                </NavLink>
            </nav>
            <div className="absolute bottom-4 left-4 w-11/12">
                <div className="w-[240px] bg-gradient-to-br from-[#0B1E3A] to-[#142F57] text-white mb-6 mr-4 p-6 rounded-xl">
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

                <div className='flex items-center justify-between'>
                    <div className="w-10/12 flex items-center gap-3">
                        <div className='relative w-[40px] h-[40px] bg-gray-300 rounded-full'>
                            <img
                                src={userProfile?.profileImage}
                                alt=""
                                className="w-full h-full rounded-full"
                                crossOrigin='anonymous'
                            />
                            <span className='absolute bottom-1 right-0 w-2.5 h-2.5 bg-green-500 border border-gray-200 rounded-full'></span>
                        </div>
                        <div className="w-8/12 text-sm">
                            <p className="font-medium">{userProfile?.fullname}</p>
                            <p className="text-secondary font-light truncate">{userProfile?.email}</p>
                        </div>
                    </div>
                    <p onClick={()=> setIsLogout(true)} className='w-2/12 cursor-pointer'>
                        <Logout className="" />
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
