import React from 'react';

const TextInput = ({ 
  label, 
  name, 
  placeholder = '', 
  type = 'text', 
  className = '', 
  ...rest 
}) => {
  return (
    <div className="w-full">
      <label htmlFor={name} className="block text-xs font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={`w-full h-12 mt-1 px-5 border border-gray-200 focus:outline-none rounded ${className}`}
        {...rest}
      />
    </div>
  );
};

export default TextInput;
