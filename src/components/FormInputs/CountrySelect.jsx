import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CurrencySelect = ({ currencies, loading, value = "USD", onChange }) => {
  const handleChange = (code) => {
    const selected = currencies.find((c) => c.code === code);
    if (onChange) onChange(selected);
  };

  const selectedCurrency = currencies.find((c) => c.code === value);

  return (
    <Select value={value} onValueChange={handleChange} disabled={loading}>

      <SelectTrigger className="w-[100px] h-[40px] bg-currency border-0 rounded-full px-2 cursor-pointer focus:outline-none focus-visible:ring-0 focus-visible:ring-offset-0">
        <div className="flex items-center gap-2">
          <img
            // src={`https://flagcdn.com/w40/${selectedCurrency.countryCode}.png`}
            src={selectedCurrency?.logo || `https://flagcdn.com/w40/${'us'}.png`}
            alt={selectedCurrency?.code}
            className="w-[24px] h-[24px] rounded-full object-center"
          />
          <span className="text-sm font-medium">{selectedCurrency?.code}</span>
        </div>
      </SelectTrigger>
      <SelectContent className="bg-white border border-gray font-light cursor-pointer">
        {currencies.map((currency) => (
          <SelectItem
            key={currency.code}
            value={currency.code}
            className="flex items-center gap-3"
          >
            <div className="flex items-center gap-3">
              <img
                // src={`https://flagcdn.com/w40/${currency.countryCode}.png`}
                src={currency.logo}
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