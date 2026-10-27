import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ReactComponent as Dot } from "@/assets/icons/dot.svg";

const TableDropdown = ({ options = [], value, onSelect }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <p className="w-[32px] h-[32px] flex items-center justify-center p-2 border border-[#E4E7EC] rounded-lg cursor-pointer">
                    <Dot />
                </p>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-32 bg-white border border-[#E4E7EC]">
                {options.map((option) => (
                    <DropdownMenuItem
                        key={option.value}
                        onSelect={() => onSelect(option.value)}
                        className="text-sm cursor-pointer"
                    >
                        {option.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TableDropdown;