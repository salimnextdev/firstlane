import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

import Layout from './components/Layout';
import Signin from './pages/Auth/signin';
import Signup from './pages/Auth/signup';
import ForgotPassword from './pages/Auth/forgot_password';
import ResetPassword from './pages/Auth/reset_password';
import ResetPasswordOTP from './pages/Auth/reset_password_otp';
import AccountSuccess from './pages/Auth/account_success';

import Dashboard from './pages/dashboard';
import Loans from './pages/loans';
import PersonalLoans from './pages/Loans/personal_loans';
import BusinessLoans from './pages/Loans/business_loans';
import EmployeeLoans from './pages/Loans/employee_loans';
import FinanceLoans from './pages/Loans/finance_loans';
import LoanApplications from './pages/Loans/loan_applications';
import LoanDetails from './pages/Loans/loan_details';

import Investment from './pages/investment';
import MakeInvestment from './pages/make_investment';

import KYCVerification from './pages/KYC/kyc_layout';

function App() {
  return (
    <Router>
      <Routes>

        {/* Authentication View */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/otp" element={<ResetPasswordOTP />} />
        <Route path="/success" element={<AccountSuccess />} />

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
          <Route path="/investment/make-investment" element={<MakeInvestment />} />
          <Route path="/kyc-verification" element={<KYCVerification />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
