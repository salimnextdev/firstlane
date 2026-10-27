import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactionByID } from "../state/walletSlice";

import { ReactComponent as Logo } from '@/assets/icons/logo.svg';
import { formatDateTime } from "@/utils/datetimeFormats";

const ReceiptPage = () => {
    const { ID } = useParams();
    const dispatch = useDispatch();
    const receiptRef = useRef(null);

    const {
        transactionDetails: transaction,
        transaction_loading: loading,
        transaction_error: error,
    } = useSelector((state) => state.wallet);

    useEffect(() => {
        if (ID) {
            dispatch(fetchTransactionByID(ID));
        }
    }, [ID, dispatch]);

    const formatAmount = (amount, currency = "NGN") =>
        new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency,
            minimumFractionDigits: 2,
        }).format(amount || 0);

    const handleDownload = () => {
        if (!receiptRef.current) return;

        // Hide everything except the receipt during print
        const printContent = receiptRef.current.innerHTML;
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); // restore React after print
    };

    if (loading) return <p className="text-center mt-8">Loading receipt...</p>;
    if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;
    if (!transaction)
        return <p className="text-center mt-8">No transaction data found.</p>;

    return (
        <div className="py-10">
            {/* RECEIPT SECTION */}
            <div
                ref={receiptRef}
                id="receipt-section"
                className="max-w-md bg-white border border-gray-200 p-6 rounded-xl"
            >
                {/* Header */}
                <div className="text-center border-b border-gray-200 pb-4 mb-4">
                    <div className='flex items-center justify-center gap-2 select-none'>
                        <Logo />
                        <p className='text-[18px] text-primary font-medium'>FirstLane</p>
                    </div>
                    <h1 className="text-xl font-bold text-gray-800">
                        Wallet Transaction Receipt
                    </h1>
                    <p className="text-gray-500 text-sm font-light">
                        Reference: {transaction?.reference || transaction?._id}
                    </p>
                </div>

                {/* Amount */}
                <div className="text-center mb-6">
                    <h2 className={`text-3xl font-semibold`}>
                        {formatAmount(transaction?.amount)}
                    </h2>
                    <p className="text-gray-500 text-sm capitalize">
                        {transaction?.type || "--"}
                    </p>
                </div>

                {/* Details */}
                <div className="space-y-3 text-sm text-gray-700">
                    <div className="flex justify-between">
                        <span className="font-medium">Status:</span>
                        <span
                            className={`font-medium capitalize ${transaction?.status === "paid"
                                ? "text-success"
                                : "text-yellow-600"
                                }`}
                        >
                            {transaction?.status}
                        </span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium">Sender Bank:</span>
                        <span>{transaction?.senderBank || "--"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium">Sender Account:</span>
                        <span>{transaction?.senderAccountNumber || "--"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium">Receiver Bank:</span>
                        <span>{transaction?.receiverBank || "--"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium">Receiver Account:</span>
                        <span>{transaction?.receiverAccountNumber || "--"}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="font-medium">Date:</span>
                        <span>{formatDateTime(transaction?.createdAt)}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 text-center text-xs text-gray-500 font-light border-t border-gray-200 pt-4">
                    This is a computer-generated receipt and does not require a physical
                    signature.
                </div>
            </div>

            {/* Hidden from print */}
            <div className="print:hidden mt-4">
                <button
                    onClick={handleDownload}
                    className="bg-primary text-sm px-6 py-2 rounded-lg"
                >
                    Download Receipt
                </button>
            </div>
        </div>
    );
};

export default ReceiptPage;