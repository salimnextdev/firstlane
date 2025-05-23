import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// currencies.js
export const currencies = [
  { code: "CAD", name: "Canadian Dollar", countryCode: "ca" },
  { code: "EUR", name: "Euro", countryCode: "eu" },
  { code: "GBP", name: "Great Britain Pound", countryCode: "gb" },
  { code: "KWD", name: "Kuwaiti Dinar", countryCode: "kw" },
  { code: "CHF", name: "Swiss Franc", countryCode: "ch" },
  { code: "USD", name: "United States Dollar", countryCode: "us" },
];

const CurrencySelect = ({ value = "USD", onChange }) => {
  const handleChange = (code) => {
    const selected = currencies.find((c) => c.code === code);
    if (onChange) onChange(selected);
  };

  const selectedCurrency = currencies.find((c) => c.code === value);

  return (
    <Select value={value} onValueChange={handleChange}>
      <SelectTrigger className="w-[100px] h-[40px] bg-[#F0F2F5] border-0 rounded-full px-2 cursor-pointer">
        <div className="flex items-center gap-2">
          <img
            src={`https://flagcdn.com/w40/${selectedCurrency.countryCode}.png`}
            alt={selectedCurrency.code}
            className="w-[24px] h-[24px] rounded-full object-center"
          />
          <span className="text-sm font-medium">{selectedCurrency.code}</span>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border border-[#E4E7EC]">
        {currencies.map((currency) => (
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