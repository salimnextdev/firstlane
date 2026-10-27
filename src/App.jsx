import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Layout from '@/components/Layout';
import Signin from '@/modules/auth/pages/signin';
import Signup from '@/modules/auth/pages/signup';
import ForgotPassword from '@/modules/auth/pages/forgot_password';
import ResetPassword from '@/modules/auth/pages/reset_password';
import ResetPasswordOTP from '@/modules/auth/pages/reset_password_otp';
import VerifyAccount from '@/modules/auth/pages/verify_account';
import AccountSuccess from '@/modules/auth/pages/account_success';

import Dashboard from '@/modules/dashboard/pages/dashboard';

import Loans from '@/modules/loans/pages/loans';
import PersonalLoans from '@/modules/loans/pages/personal_loans';
import BusinessLoans from '@/modules/loans/pages/business_loans';
import EmployeeLoans from '@/modules/loans/pages/employee_loans';
import FinanceLoans from '@/modules/loans/pages/finance_loans';
import LoanApplications from '@/modules/loans/pages/loan_applications';
import LoanDetails from '@/modules/loans/pages/loan_details';

import Investment from '@/modules/investments/pages/investment';
import MakeInvestment from '@/modules/investments/pages/make_investment';
import ViewInvestment from '@/modules/investments/pages/view_investments';

import FXTransactions from '@/modules/fx_transactions/pages/transactions';
import AllTransactions from '@/modules/fx_transactions/pages/all_transactions';

import Wallets from '@/modules/wallets/pages/wallets';
import AllWallets from '@/modules/wallets/pages/all_wallets';
import WalletDetails from '@/modules/wallets/pages/wallet_detials';

import Support from '@/modules/support/pages/support';

import Settings from '@/modules/settings/pages/settings';

import KYCVerification from '@/modules/kyc/pages/kyc_layout';

import ScrollToTop from '@/components/ScrollToTop';
import { Toaster } from './components/ui/sonner';
import { ThemeProvider } from './hooks/ThemeContext';
import ReceiptPage from './modules/wallets/components/receipt';

function App() {
  return (
    <ThemeProvider>
    <Router>
      <ScrollToTop />
      <Toaster style={{ top: "10px" }} />

      <Routes>
        <Route path="/" element={<Navigate to="/signup" replace />} />
        
        {/* Authentication View */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/otp" element={<ResetPasswordOTP />} />
        <Route path="/verify-account" element={<VerifyAccount />} />
        <Route path="/account-success" element={<AccountSuccess />} />

        {/* Dashbord View */}
        <Route element={<Layout />} >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loans/personal-loans" element={<PersonalLoans />} />
          <Route path="/loans/business-loans" element={<BusinessLoans />} />
          <Route path="/loans/employee-loans" element={<EmployeeLoans />} />
          <Route path="/loans/finance-loans" element={<FinanceLoans />} />
          <Route path="/loans/applications" element={<LoanApplications />} />
          <Route path="/loans/applications/:ID" element={<LoanDetails />} />
          <Route path="/investment" element={<Investment />} />
          <Route path="/investment/make-investment/:ID" element={<MakeInvestment />} />
          <Route path="/investment/all" element={<ViewInvestment />} />
          <Route path="/fx-transactions" element={<FXTransactions />} />
          <Route path="/fx-transactions/all" element={<AllTransactions />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/wallets/all" element={<AllWallets />} />
          <Route path="/wallets/all/:ID" element={<WalletDetails />} />
          <Route path="/wallets/receipt/:ID" element={<ReceiptPage />} />

          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/kyc-verification" element={<KYCVerification />} />
        </Route>
      </Routes>
    </Router>
    </ThemeProvider>
  )
}

export default App
