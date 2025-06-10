import React from "react";

const WalletCard = ({ wallet }) => {
    return (
        <div key={wallet.name} className='p-3 flex items-end justify-between border border-[#E4E7EC] rounded-xl'>
            <div className="space-y-1">
                <p className="text-sm md:text-base font-normal text-gray-800">
                    ₦{wallet.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}
                </p>
                <p className="text-xs md:text-sm text-gray-500">{'19/12 at 6:03pm'}</p>
            </div>
            <div className='flex flex-col items-end gap-1'>
                <p className={`text-xs font-medium capitalize ${wallet.status === 'successful' ? 'text-success' :
                    wallet.status === 'pending' ? 'text-warning' :
                        'text-danger'
                    }`}>{wallet.status}</p>
                <p className="px-3 py-1 text-xs font-normal rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600">
                    {wallet.type + ' wallet'}
                </p>
            </div>
        </div>
    )
}

export default WalletCard;