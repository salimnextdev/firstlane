import { formatDateShort } from "@/utils/datetimeFormats";
import React from "react";

const WalletCard = ({ transaction }) => {
    return (
        <div key={transaction?.reference} className='p-3 flex items-end justify-between border border-gray rounded-xl'>
            <div className="space-y-1">
                <p className="text-sm md:text-base font-normal text-gray-800">
                    ₦{transaction?.amount?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
                <p className="text-xs md:text-sm text-gray-500">{formatDateShort(transaction?.date)}</p>
            </div>
            <div className='flex flex-col items-end gap-1'>
                <p className={`text-xs font-medium capitalize ${true ? 'text-success' :
                    transaction?.status === 'pending' ? 'text-warning' :
                        'text-danger'
                    }`}>{"successsful" || transaction?.status}</p>
                <p className="px-3 py-1 text-xs font-normal rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600">
                    {transaction?.type == "D" ? "Money sent" : "Money received"}
                </p>
            </div>
        </div>
    )
}

export default WalletCard;