import React from "react";

const MobileTransactionCard = ({ transaction }) => {
    return (
        <div key={transaction.name} className='p-3 flex items-end justify-between border border-gray rounded-xl'>
            <div className="space-y-1">
                <p
                    className={`inline-block mb-2 px-3 py-1 text-xs font-normal capitalize rounded-full
                            ${transaction.status === 'approved' ? 'bg-success' :
                                transaction.status === 'pending' ? 'bg-warning' :
                                    'bg-danger'
                        }`}
                >
                    {transaction.status}
                </p>
                <p className="text-sm md:text-base font-medium text-gray-800">{transaction.purpose}</p>
                <p className="text-xs md:text-sm text-gray-500">{'19/12 at 6:03pm'}</p>
            </div>
            <div className='flex flex-col items-end gap-1'>
                <p className={`text-xs font-medium ${transaction.status === 'approved' ? 'text-success' :
                    transaction.status === 'pending' ? 'text-warning' :
                        'text-danger'
                    }`}>₦{transaction.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</p>
                <p className="px-3 py-1 text-xs font-normal rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600">
                    {transaction.type + ' transaction'}
                </p>
            </div>
        </div>
    )
}

export default MobileTransactionCard;