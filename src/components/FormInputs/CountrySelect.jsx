import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { currencyOptions } from "@/utils/currencies";

const CurrencySelect = ({ value = "USD", onChange }) => {
  const handleChange = (code) => {
    const selected = currencyOptions.find((c) => c.code === code);
    if (onChange) onChange(selected);
  };

  const selectedCurrency = currencyOptions.find((c) => c.code === value);

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[100px] h-[40px] bg-currency border-0 rounded-full px-2 cursor-pointer focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w40/${selectedCurrency.countryCode}.png`}
            alt={selectedCurrency.code}
            className="w-[24px] h-[24px] rounded-full object-center"
          />
          <span className="text-sm font-medium">{selectedCurrency.code}</span>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray font-light cursor-pointer">
        {currencyOptions.map((currency) => (
          <SelectItem
            key={currency.code}
            value={currency.code}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                src={`https://flagcdn.com/w40/${currency.countryCode}.png`}
                alt={currency.code}
                className="w-[24px] h-[24px] rounded-full object-center"
              />
              <span className="text-sm">
                {currency.name} ({currency.code})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default CurrencySelect;