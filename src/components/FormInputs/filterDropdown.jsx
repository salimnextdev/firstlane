import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactComponent as Filter } from "@/assets/icons/filter.svg";

const FilterDropdown = ({ options = [], value, onSelect }) => {
  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 h-[40px] rounded-lg border border-[#E4E7EC] bg-white px-4 text-sm font-medium text-gray-800 cursor-pointer">
          <Filter />
          <span>{selectedLabel || "Filter"}</span>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-40 bg-white border border-[#E4E7EC]">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => onSelect(option.value)}
            className="text-xs cursor-pointer"
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;