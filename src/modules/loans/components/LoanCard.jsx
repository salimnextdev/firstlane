import React from "react";

const LoadCard = ({ loan }) => {
    return (
        <div key={loan.name} className='p-3 flex items-end justify-between border border-[#E4E7EC] rounded-xl'>
            <div className="space-y-1">
                <p
                    className={`inline-block mb-2 px-3 py-1 text-xs font-normal capitalize rounded-full
                            ${loan.status === 'successful' ? 'bg-success' :
                            loan.status === 'pre-approved' ? 'bg-neutral' :
                                loan.status === 'pending' ? 'bg-warning' :
                                    'bg-danger'
                        }`}
                >
                    {loan.status}
                </p>
                <p className="text-sm md:text-base font-medium text-gray-800">{loan.purpose}</p>
                <p className="text-xs md:text-sm text-gray-500">{'19/12 at 6:03pm'}</p>
            </div>
            <div className='flex flex-col items-end gap-1'>
                <p className={`text-xs font-medium ${loan.status === 'successful' ? 'text-success' :
                    loan.status === 'pending' ? 'text-warning' :
                        'text-danger'
                    }`}>₦{loan.amount.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                    })}</p>
                <p className="px-3 py-1 text-xs font-normal rounded-full bg-[#F2F4F7] border border-[#D0D5DD] text-gray-600">
                    {loan.type + ' loan'}
                </p>
            </div>
        </div>
    )
}

export default LoadCard;