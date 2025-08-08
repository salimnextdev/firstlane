import React from "react";

const MobileTransactionCard = ({ transaction }) => {
    return (
        <div key={transaction.name} className='space-y-2 p-3 border border-gray rounded-xl'>
            <p
                className={`inline-block mb-2 px-3 py-1 text-xs font-normal capitalize rounded-full
                    ${transaction.status === 'approved' ? 'bg-success' :
                        transaction.status === 'pending' ? 'bg-warning' :
                            'bg-danger'
                    }`}
            >
                {transaction.status}
            </p>
            <div className="flex items-center justify-between">
                <div className="">
                    <p className="text-xs text-tertiary">Buy amount</p>
                    <p className='text-sm font-medium'>
                        ₦{transaction?.toCurrency?.value?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</p>
                </div>
                <div className="text-right">
                    <p className="text-xs text-tertiary">Sell amount</p>
                    <p className='text-sm font-medium'>
                        ₦{transaction?.fromCurrency?.value?.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</p>
                </div>
            </div>

            <div className='flex items-center justify-between'>
                <p className="text-xs md:text-sm text-tertiary">{'19/12 at 6:03pm'}</p>
                <p className="text-xs md:text-sm text-tertiary">
                    {transaction?.fxRate?.targetCurrency?.value}/
                    {transaction?.fxRate?.baseCurrency?.value}
                </p>
            </div>
        </div>
    )
}

export default MobileTransactionCard;