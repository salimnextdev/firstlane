import React from 'react';

const TransactionInput = ({
    label,
    name,
    placeholder = '',
    type = 'text',
    className = '',
    currency = 'NGN',
    ...rest
}) => {
    return (
        <div className="w-full">
            <label htmlFor={name} className="block text-sm">
                {label}
            </label>
            <div className='relative h-14'>
                <input
                    type={type}
                    name={name}
                    id={name}
                    placeholder={placeholder}
                    className={`w-full h-full mt-1 px-5 text-xl font-medium bg-[#F0F2F5] border border-gray-200 focus:outline-none rounded-lg ${className}`}
                    {...rest}
                />
                <p className="absolute top-5 right-4 cursor-pointer text-gray-500">{currency}</p>
            </div>
        </div>
    );
};

export default TransactionInput;
