import React from "react";
import { sendCodeToEmail } from "@/modules/auth/state/authSlice";
import { toast } from "sonner";
import { getCookie } from "./cookieUtils";

export const resendOTP = async (dispatch, email, type="EmailVerification") => {
    const user = JSON.parse(getCookie('user') || null);
    const data = {
        "userID": user?._id || '',
        "email": email,
        "type": type
    };

    try {
        const resultAction = await dispatch(sendCodeToEmail(data));
        if (sendCodeToEmail.fulfilled.match(resultAction)) {
            toast("OTP sent successfully!", {
                description: resultAction.payload.message,
            });
        } else {
            toast(resultAction.payload.message);
            return;
        };
    } catch (error) {
        toast("An error occured", {
            description: error.message,
        });
    }
};