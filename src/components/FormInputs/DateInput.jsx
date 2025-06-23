import React, { useState } from "react";
import { format } from "date-fns";
import { SlArrowDown } from "react-icons/sl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const DateInput = ({
  label,
  name,
  className = '',
  placeholder = "Pick a date",
  value,
  onChange,
  ...rest
}) => {
  const [open, setOpen] = useState(false); // control popover open state

  const handleSelect = (selectedDate) => {
    onChange && onChange(selectedDate);
    setOpen(false);
  };

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={name} className="block text-sm">
          {label}
        </label>
      )}

      {/* <input
        type="date"
        name={name}
        id={name}
        placeholder={placeholder}
        className={`w-full h-12 mt-1 px-5 border border-gray-200 focus:outline-none rounded ${className}`}
        {...rest}
      /> */}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            id={name}
            name={name}
            type="button"
            className={`w-full h-12 mt-1 px-5 flex items-center justify-between text-left border border-gray-200 rounded text-sm font-light cursor-pointer focus:outline-none ${!value ? 'text-gray-400' : ''} ${className}`}
            {...rest}
          >
            {value ? format(value, "PPP") : placeholder}
            <SlArrowDown className="ml-2 text-[10px] font-medium" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white border border-gray-200" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleSelect}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateInput;