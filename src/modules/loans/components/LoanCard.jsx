import React from "react";
import { formatDateShort } from "@/utils/datetimeFormats";

const LoadCard = ({ loan }) => {
    return (
        <div key={loan?.id} className='p-3 flex items-end justify-between border border-gray rounded-xl'>
            <div className="space-y-1">
                <p
                    className={`inline-block mb-2 px-3 py-1 text-xs font-normal capitalize rounded-full
                            ${['approved', 'paid'].includes(loan?.status) ? 'bg-success' :
                            loan?.status === 'pre-approved' ? 'bg-neutral' :
                                loan?.status === 'pending' ? 'bg-warning' :
                                    'bg-danger'
                        }`}
                >
                    {loan?.status}
                </p>
                <p className="text-sm md:text-base font-medium text-gray-800 capitalize">{loan?.purpose}</p>
                <p className="text-xs md:text-sm text-gray-500">{formatDateShort(loan?.createdAt)}</p>
            </div>
            <div className='flex flex-col items-end gap-1'>
                <p className={`text-xs font-medium ${
                    ['approved', 'paid'].includes(loan?.status) ? 'text-success' :
                    loan?.status === 'pending' ? 'text-warning' :
                        'text-danger'
                    }`}>₦{(loan?.amountRequested || 0.00)?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</p>
                <p className="px-3 py-1 text-xs font-normal capitalize rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600 capitalize">
                    {loan?.loanType + ' loan'}
                </p>
            </div>
        </div>
    )
}

export default LoadCard;