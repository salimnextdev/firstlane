import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left.svg';

const BackButton = ({ className, onClick }) => {
    const navigate = useNavigate();
    const handleBack = () => {
        onClick ? onClick() : navigate(-1); // Go back to previous page if returnTo function is not specified
    }
    return (
        <div onClick={handleBack} className={`inline-flex items-center justify-center gap-2 px-3 h-[36px] text-sm font-medium border border-[#E4E7EC] rounded-md cursor-pointer select-none ${className}`}>
            <ArrowLeft />
            <span>Back</span>
        </div>
    )
}

export default BackButton;