import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { BsArrowRight } from 'react-icons/bs';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';
import { ReactComponent as WalletPlus } from '@/assets/icons/wallet-plus.svg';
import { ReactComponent as Money } from '@/assets/icons/money.svg';
import { ReactComponent as EyeOpen } from '@/assets/icons/eye-open.svg';
import { ReactComponent as EyeClose } from '@/assets/icons/eye-close.svg';

import SendMoneyModal from '@/modules/wallets/components/sendWithdrawModal';
import FundAccountModal from '@/modules/investments/components/fundAccountModal';
import WalletCard from '@/modules/wallets/components/WalletCard';

const Wallets = () => {
    const navigate = useNavigate();
    const [statsView, setStatsView] = useState(true);
    const [modal, setModal] = useState('');
    const [isOpen, setIsOpen] = useState(true);

    const openModal = (type) => {
        setModal(type);
        setIsOpen(!isOpen);
    };

    const [transactions, setTransactions] = useState([
        {
            id: '00001',
            amount: 10000.89,
            type: 'Employee',
            purpose: 'Equipment purchase',
            status: "successful"
        },
        {
            id: '00002',
            amount: 10000.89,
            type: 'Business',
            purpose: 'Marketing',
            status: "pending"
        },
        {
            id: '00003',
            amount: 10000.89,
            type: 'Asset finance',
            purpose: 'Marketing',
            status: "successful"
        },
        {
            id: '00001',
            amount: 10000.89,
            type: 'Employee',
            purpose: 'Asset acquisition',
            status: "successful"
        },
        {
            id: '00002',
            amount: 10000.89,
            type: 'Business',
            purpose: 'Marketing',
            status: "successful"
        },
    ]);

    return (
        <div className="relative space-y-3 md:space-y-6">
            {modal === "fund_wallet" &&
                <FundAccountModal
                    isOpen={isOpen}
                    onClose={setIsOpen}
                    data={{
                        amount: 140000.00,
                        acc_number: "0123456789",
                        acc_name: "Alison Eyo",
                        bank_name: "Paystack Titan",
                    }}
                />
            }
            {modal === "send_money" &&
                <SendMoneyModal
                    isOpen={isOpen}
                    onClose={setIsOpen}
                    type='send'
                />
            }

            <div>
                <h2 className="text-xl md:text-2xl font-semibold">Wallets</h2>
                <p className="text-sm text-gray-500 my-1 font-light">Fund, send and receive money into your wallet easily 💰</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-black text-white p-5 rounded-xl">
                <div className="flex justify-between">
                    <div className=''>
                        <p className="text-sm text-gray-300 mb-2">Wallet balance</p>
                        <div className='flex items-center gap-5 justify-between mt-5'>
                            <p className="text-xl md:text-2xl font-semibold">
                                {statsView
                                    ? '₦' +
                                    140000.00.toLocaleString(undefined, {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })
                                    : '*************'
                                }
                            </p>
                            {statsView ?
                                <EyeClose
                                    onClick={() => setStatsView(!statsView)}
                                    className="text-secondary cursor-pointer"
                                /> :
                                <EyeOpen
                                    onClick={() => setStatsView(!statsView)}
                                    className="text-secondary cursor-pointer"
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className='hidden md:block border-l-3 border-[#344054]'>
                    <div className='flex items-center justify-between md:px-32'>
                        <div onClick={() => openModal("fund_wallet")} className='space-y-2 flex flex-col items-center text-sm text-white cursor-pointer select-none'>
                            <div className='w-[48px] h-[48px] flex items-center justify-center bg-white rounded-full'>
                                <WalletPlus />
                            </div>
                            <p className='cursor-pointer'>Fund wallet</p>
                        </div>
                        <div onClick={() => openModal("send_money")} className='space-y-2 flex flex-col items-center text-sm text-white cursor-pointer select-none'>
                            <div className='w-[48px] h-[48px] flex items-center justify-center bg-white rounded-full'>
                                <Money />
                            </div>
                            <p className='cursor-pointer'>Send money</p>
                        </div>
                    </div>
                </div>
            </div>


            <div className='w-full md:hidden flex items-center gap-3 text-sm'>
                <div
                    onClick={() => openModal("fund_wallet")}
                    className='w-full flex items-center justify-center gap-2 bg-[#F9FAFB] p-2 px-3 rounded-lg border border-[#E4E7EC] select-none'
                >
                    <WalletPlus />
                    <p>Fund wallet</p>
                </div>
                <div
                    onClick={() => openModal("send_money")}
                    className='w-full flex items-center justify-center gap-2 bg-[#F9FAFB] p-2 px-3 rounded-lg border border-[#E4E7EC] select-none'
                >
                    <Money />
                    <p>Send money</p>
                </div>
            </div>

            {/* MOBILE ::::  Wallet Cards */}
            <div className='md:hidden space-y-4'>
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>Wallet transactions</p>
                    <Link to={'/wallets/all'} className='flex items-center gap-2 text-sm'>
                        <span className='font-light'>View all</span>
                        <BsArrowRight className='w-4 h-4 text-secondary' />
                    </Link>
                </div>

                <div className='space-y-2' id='mobile_transaction_card'>
                    {transactions.map((transaction, index) => (
                        <div key={index} onClick={() => navigate(`/wallets/all/${index}`)}>
                            <WalletCard wallet={transaction} />
                        </div>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Wallets;
