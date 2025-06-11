// components/RadioInput.jsx
import React from "react";

const RadioInput = ({
  label = "OTP Code",
  name = "otp",
  checked,
  onChange,
  placeholder = "123-456",
  className = "",
}) => {
  return (
    <div className="flex items-center justify-between p-3 border border-[#E4E7EC] rounded-md">
      <label htmlFor={name} className="block text-sm md:text-base font-light">
        {label}
      </label>
      <div className="relative w-5 h-5">
        <input
          type="radio"
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          placeholder={placeholder}
          className={`appearance-none w-5 h-5 rounded-full border-2 border-gray-300 
            checked:border-[#3E4095] 
            cursor-pointer focus:outline-none ${className}`}
        />
        {checked && (
          <span className="absolute top-1/2 left-1/2 w-2.5 h-2.5 bg-[#3E4095] rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
    </div>
  );
};

export default RadioInput;