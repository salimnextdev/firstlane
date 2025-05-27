import React from 'react';
import { Link } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import check from '@/assets/images/success_check.png';

import AuthImageContainer from '@/components/AuthImageContainer';

const AccountSuccess = () => {
    return (
        <div className="w-full h-screen flex items-start justify-center md:p-10 overflow-hidden">
            <AuthImageContainer />

            <div className="w-full md:w-1/2 md:mt-20 px-10 flex items-center justify-center md:text-center md:text-left">
                <div className='w-full lg:w-10/12'>
                    <div className="flex items-center gap-2 mb-6">
                        <img className="w-7" alt="logo" src={logo} />
                        <h1 className="text-lg font-medium text-primary">FirstLane</h1>
                    </div>
                    <div className='flex flex-col items-center justify-center text-center'>
                        <img src={check} alt='check' width={'60%'} className='mb-5'/>
                        <h2 className="text-4xl font-bold text-gray-900">
                            Account created successfully
                        </h2>
                        <p className="mt-3 mb-6 text-sm text-secondary">
                            Welcome to FirstLane. You are in the best place to recieve and manage loans, invest and track
                            investments, and manage FX transactions.
                        </p>

                        <Link to={'/dashboard'} className='w-full text-sm'>
                            <button
                                className="w-full h-11 mt-2 bg-primary text-white font-normal rounded-md hover:bg-opacity-90 transition cursor-pointer"
                            >
                                Go to Dashboard
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSuccess;