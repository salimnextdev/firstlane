import { formatDateShort } from "@/utils/datetimeFormats";
import { getTransactionType } from "@/utils/genericFunc";
import React from "react";

const TransactionCard = ({ userProfile, transaction }) => {
    return (
        <div key={transaction?.reference} className='p-3 flex items-center justify-between border border-gray rounded-xl'>
            <div className="flex items-center gap-2">
                <div className="w-[36px] h-[36px] rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                    <img
                        src={userProfile?.profileImage}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                    />
                </div>
                <div className="space-y-1">
                    <p className="text-sm md:text-base font-medium text-gray-800">{userProfile?.fullname || 'N/A'}</p>
                    <p className="text-xs md:text-sm text-gray-500">
                        {formatDateShort(transaction?.createdAt || transaction?.date) || '--'}
                    </p>
                </div>
            </div>
            <div className='flex flex-col items-end gap-1'>
                <p className={`text-sm font-medium 
                    ${transaction?.status === 'paid' ? 'text-success' :
                        transaction?.status === 'pending' ? 'text-warning' :
                            'text-danger'
                    }`}>
                    {/* {transaction?.type === 'D' ? '-' : '+'} */}
                    {transaction?.type === 'deposit' ? '+' : transaction?.type === 'withdrawal' ? '-' : ''}
                    ₦{transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</p>
                <p className="px-3 py-1 text-xs font-normal rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600 capitalize">
                    {getTransactionType(transaction?.type, transaction?.remarks)}
                </p>
            </div>
        </div>
    )
}

export default TransactionCard;