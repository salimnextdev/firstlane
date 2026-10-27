import React from "react";
import { ReactComponent as Check } from '@/assets/icons/checked.svg';

const RadioCheckInput = ({
    name = "bank_transfer",
    value,
    checked,
    onChange,
    className = "",
}) => {
    return (
        <label className={`cursor-pointer inline-flex items-center ${className}`}>
            <input
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
                className="sr-only"
            />
            <div className="w-[20px] h-[20px] flex items-center justify-center rounded-full bg-white">
                {checked ? (
                    <Check />
                ) : (
                    <span className="w-[20px] h-[20px] border border-gray-400 rounded-full bg-transparent" />
                )}
            </div>
        </label>
    );
};

export default RadioCheckInput;
