import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { FaRegFileAlt, FaRobot, FaUserShield } from 'react-icons/fa';
import { BsDot } from 'react-icons/bs';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Transaction } from '@/assets/icons/transaction.svg';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';
import { ReactComponent as Support } from '@/assets/icons/support.svg';
import { ReactComponent as Setting } from '@/assets/icons/setting.svg';
import { ReactComponent as KYC } from '@/assets/icons/kyc.svg';
import { ReactComponent as Device } from '@/assets/icons/device.svg';

const notifications = [
  {
    id: 1,
    category: 'KYC approved',
    message: 'You KYC documents have been approved. You can now enjoy your credits',
    time: 'Today, 12:24pm',
    icon: <KYC className="text-secondary" />,
  },
  {
    id: 2,
    category: 'Loan application',
    message: 'You Loan application status has changed from pending to approved. Click to view',
    time: 'Today, 12:24pm',
    icon: <Loan className="text-secondary" />,
    unread: true,
  },
  {
    id: 3,
    category: '',
    message: 'A new device, SM-00ZF just signed into this account. Please review activity',
    time: 'Today, 12:24pm',
    icon: <Device className="text-secondary" />,
  },
  {
    id: 4,
    category: 'Loan application',
    message: 'You Loan application status has been approved. Click to view',
    time: 'Today, 12:24pm',
    icon: <Loan className="text-secondary" />,
  },
];

const NotificationPanel = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="md:!max-w-[633px] p-3 border-none rounded-xl bg-white md:top-[19rem] md:!left-[76%]">
        <div className="w-full overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3">
            <h2 className="flex items-center gap-3 text-2xl font-semibold">
              Notifications{' '}
              <span className="px-3 py-0.5 bg-primary text-xs font-light rounded-full">
                43
              </span>
            </h2>
            <button className="text-sm md:text-base text-secondary hover:underline">Mark all as read</button>
          </div>

          <div className="">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex items-start gap-2 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50">
                <div className="relative">
                  <div className='w-2/12'>
                    <p className="w-[44px] h-[44px] flex items-center justify-center border border-[#D0D5DD] rounded-full">
                      {notif.icon}
                    </p>
                  </div>
                  {notif.unread && (
                    <span className="absolute top-0 right-0 bg-secondary w-3 h-3 rounded-full"></span>
                  )}
                </div>
                <div>
                  {notif.category && (
                    <p className="text-xs text-[#099137]">{notif.category}</p>
                  )}
                  <p className="text-sm md:text-base font-normal">{notif.message}</p>
                  <p className="text-xs text-secondary mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-2 text-sm md:text-base text-secondary">
            Showing &nbsp;
            <span className="text-secondary font-medium">7</span> &nbsp;
            out of &nbsp;
            <span className="text-secondary font-medium">50</span>

            <div className="float-right flex space-x-2">
              <button className="w-[36px] h-[36px] flex items-center justify-center border border-[#E4E7EC] rounded-lg">
                <SlArrowLeft className='text-gray-400 cursor-pointer' />
              </button>
              <button className="w-[36px] h-[36px] flex items-center justify-center border border-[#E4E7EC] rounded-lg">
                <SlArrowRight className='text-black cursor-pointer' />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPanel;