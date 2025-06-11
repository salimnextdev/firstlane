import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArrowLeft } from '@/assets/icons/arrow-left.svg';

const BackButton = ({ className }) => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Go back to previous page
    }
    return (
        <div onClick={handleBack} className={`inline-flex items-center justify-center gap-3 px-4 h-[36px] text-sm font-medium border border-[#E4E7EC] rounded-md cursor-pointer select-none ${className}`}>
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
        </div>
    )
}

export default BackButton;