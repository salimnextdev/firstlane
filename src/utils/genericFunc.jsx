import React from "react";
import { sendCodeToEmail } from "@/modules/auth/state/authSlice";
import { verifyTransaction } from "@/modules/wallets/state/walletSlice";
import { toast } from "sonner";
import { getCookie } from "./cookieUtils";

export const verifyWalletTransaction = async (dispatch, reference) => {
    await dispatch(verifyTransaction(reference));
}

export const resendOTP = async (dispatch, email, type = "EmailVerification") => {
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

// export const getTransactionType = (type, remarks) => {
//     if (type === 'C') return 'Money received';
//     if (type === 'D') {
//       if (remarks.toLowerCase().includes('investment')) return 'Investment';
//       if (remarks.toLowerCase().includes('fee')) return 'Fee';
//       return 'Money sent';
//     }
//     return 'Unknown';
//   };

export const getTransactionType = (type, remarks) => {
    // if (type === 'C') return 'Money received';
    if (type === 'deposit') {
        return 'Wallet funding';
    } else {
        return type
    }
};