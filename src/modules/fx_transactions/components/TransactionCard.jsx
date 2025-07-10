import React from "react";

const TransactionCard = ({ transaction }) => {
    return (
        <div key={transaction.name} className='p-3 flex items-center justify-between border border-gray rounded-xl'>
            <div className="flex items-center gap-2">
                <div className="w-[36px] h-[36px] rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
                    <img src="/api/placeholder/40/40" alt="User avatar" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                    <p className="text-sm md:text-base font-medium text-gray-800">{transaction.name}</p>
                    <p className="text-xs md:text-sm text-gray-500">{'19/12 at 6:03pm'}</p>
                </div>
            </div>
            <div className='flex flex-col items-end gap-1'>
                <p className={`text-sm font-medium ${transaction.status === 'successful' ? 'text-success' :
                    transaction.status === 'pending' ? 'text-warning' :
                        'text-danger'
                    }`}>
                    {transaction.paymentType === 'Loan' ? '-' : '+'}
                    ₦{transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</p>
                <p className="px-3 py-1 text-xs font-normal rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600">
                    {transaction.paymentType}
                </p>
            </div>
        </div>
    )
}

export default TransactionCard;