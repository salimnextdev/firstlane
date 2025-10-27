import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordInput = ({
    label = "Password",
    name = "password",
    value,
    onChange,
    placeholder = "password",
    className = "",
}) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="relative">
            <label htmlFor={name} className="block text-sm">
                {label}
            </label>
            <input
                type={showPassword ? "text" : "password"}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full h-12 mt-1 px-5 font-light border border-gray-200 focus:outline-none rounded ${className}`}
            /> 
            {/* Add pr-12 to input className to create space for your custom preview  */}
            <span
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-10 right-6 cursor-pointer text-gray-500"
            >
                {showPassword ? <FiEyeOff className="w-4.5 h-4.5" /> : <FiEye className="w-4.5 h-4.5" />}
            </span>
        </div>
    );
};

export default PasswordInput;
