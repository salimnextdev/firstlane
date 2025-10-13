import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications, markAllAsRead } from '@/modules/auth/state/userSlice';
import { getCookie } from '@/utils/cookieUtils';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

import { ReactComponent as Loan } from '@/assets/icons/loan.svg';
import { ReactComponent as Investment } from '@/assets/icons/investment.svg';
import { ReactComponent as Transaction } from '@/assets/icons/transaction.svg';
import { ReactComponent as Wallet } from '@/assets/icons/wallet.svg';
import { ReactComponent as Support } from '@/assets/icons/support.svg';
import { ReactComponent as Setting } from '@/assets/icons/setting.svg';
import { ReactComponent as KYC } from '@/assets/icons/kyc.svg';
import { ReactComponent as Device } from '@/assets/icons/device.svg';
import { ReactComponent as User } from '@/assets/icons/user.svg';
import { ReactComponent as ShieldX } from '@/assets/icons/shieldx.svg';
import { ReactComponent as Bell } from '@/assets/icons/bell-sm.svg';
import { ReactComponent as Bank } from '@/assets/icons/bank-sm.svg';

import NotificationSkeleton from './NotificationSkeleton';
import { formatDateToday } from '@/utils/datetimeFormats';
import NoContent from './NoContent';

const mapper = {
  'KYC': KYC,
  'User': User,
  "loan": Loan,
  "investment": Investment,
  "fx": Transaction,
  "wallets": Wallet,
  "support": Support,
  "settings": Setting,
  "kyc verification": KYC
}

const NotificationPanel = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(getCookie('user') || null);
  const LIMIT = 5
  const { notifications: notifications, metaData: metaData, loading: loading, error: error } = useSelector((state) => state.user);
  useEffect(() => {
    if (!loading && isOpen) {
      dispatch(fetchNotifications({
        key: "userID",
        value: user?._id,
        limit: LIMIT,
      }));
    }
  }, [dispatch, isOpen]);

  const currentPage = parseInt(metaData?.currentPage) || 1;
  const limit = parseInt(metaData?.limit) || LIMIT;
  const totalItems = parseInt(metaData?.total) || 0;

  const totalPages = Math.ceil(totalItems / limit);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const readAllNotifications = async () => {
    await dispatch(markAllAsRead());
    await dispatch(fetchNotifications({
      key: "userID",
      value: user?._id,
      limit: LIMIT,
    }));
  };

  const paginator = async (option) => {
    const value = (option === 'next' ? 1 : -1);
    await dispatch(fetchNotifications({
      key: "userID",
      value: user?._id,
      limit: LIMIT,
      page: currentPage + value
    }));
  };

  const Icon = ({ ID }) => {
    const IconComponent = mapper[ID];
    if (!IconComponent) {
      return <Bell className="w-5 h-5" />; // fallback icon
    }
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="md:!max-w-[633px] p-3 border-none rounded-xl bg-white md:top-[19rem] md:!left-[76%]">
        <div className="w-full overflow-hidden">
          <div className="flex justify-between items-center px-4 py-3">
            <h2 className="flex items-center gap-3 text-xl md:text-2xl font-semibold">
              Notifications{' '}
              <span className="px-3 py-0.5 bg-primary text-xs font-light rounded-full">
                {metaData?.total?.toLocaleString() || 0}
              </span>
            </h2>
            {notifications.length > 0 &&
              <button
                className="text-sm md:text-base text-secondary hover:underline cursor-pointer"
                onClick={() => readAllNotifications()}
              >
                Mark all as read
              </button>
            }
          </div>

          {(loading || notifications.length > 0) ?
            <div className="">
              {loading ? (
                <NotificationSkeleton count={5} />
              ) : notifications.map((notif) => (
                <div key={notif._id} className="flex items-start gap-2 px-4 py-2 rounded-xl cursor-pointer hover:bg-gray-50">
                  <div className="relative">
                    <div className='w-2/12'>
                      <p className="w-[44px] h-[44px] flex items-center justify-center border border-[#D0D5DD] rounded-full">
                        <Icon ID={notif?.entityType} />
                      </p>
                    </div>
                    {!(notif?.isRead) && (
                      <span className="absolute top-0 right-0 bg-secondary w-3 h-3 rounded-full"></span>
                    )}
                  </div>
                  <div>
                    {notif?.action && (
                      <p className="text-xs text-[#099137] capitalize">{notif?.action}</p>
                    )}
                    <p className="text-sm md:text-base font-normal">{notif?.details || ""}</p>
                    <p className="text-xs text-secondary mt-1">{formatDateToday(notif.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div> :
            <NoContent
              icon="notification"
              title="No notifications yet"
              description="You’ll see any updates or alerts here as soon as they’re available."
            />
          }

          {!loading &&
            <div className="px-4 py-2 text-sm md:text-base text-secondary">
              Showing &nbsp;
              <span className="text-secondary font-medium">
                {(LIMIT <= totalItems && parseInt(metaData?.limit) || totalItems) * metaData?.currentPage}
              </span> &nbsp;
              out of &nbsp;
              <span className="text-secondary font-medium">{metaData?.total?.toLocaleString() || 0}</span>


              <div className="float-right flex space-x-2">
                <button
                  onClick={() => paginator('prev')}
                  className="w-[36px] h-[36px] flex items-center justify-center border border-gray rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isFirstPage}
                >
                  <SlArrowLeft className={`${isFirstPage ? 'text-gray-400' : ''}`} />
                </button>
                <button
                  onClick={() => paginator('next')}
                  className="w-[36px] h-[36px] flex items-center justify-center border border-gray rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLastPage || notifications.length == 0}
                >
                  <SlArrowRight className={`${isLastPage ? 'text-gray-400' : ''}`} />
                </button>
              </div>
            </div>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationPanel;