// components/OTPInput.jsx
import React from "react";

const OTPInput = ({
  label = "OTP Code",
  name = "otp",
  value,
  onChange,
  placeholder = "123-456",
  className = "",
}) => {
  // Internal handler to format value as XXX-XXX
  const formatOtp = (val) => {
    // .toUpperCase() add this to charsOnly when you want to enforce only uppercase letter
    const charsOnly = val.replace(/[^a-zA-Z0-9]/g, "").slice(0, 6);
    const first = charsOnly.slice(0, 3);
    const second = charsOnly.slice(3);
    return second ? `${first}-${second}` : first;
  };

  const handleChange = (e) => {
    const formatted = formatOtp(e.target.value);
    onChange({ target: { name, value: formatted } });
  };

  return (
    <div className="">
      <label htmlFor={name} className="block text-sm">
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        inputMode="numeric"
        className={`w-full h-12 mt-1 px-5 border border-gray-200 focus:outline-none rounded tracking-widest ${className}`}
      />
    </div>
  );
};

export default OTPInput;