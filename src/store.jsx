import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/modules/auth/state/authSlice';
import userSlice from '@/modules/auth/state/userSlice';
import loanSlice from '@/modules/loans/state/loanSlice';
import kycSlice from '@/modules/kyc/state/kycSlice';
import investmentSlice from '@/modules/investments/state/investmentSlice';
import FXSlice from '@/modules/fx_transactions/state/fxSlice';
import walletSlice from '@/modules/wallets/state/walletSlice';
import supportSlice from '@/modules/support/state/supportSlice';

import currencySlice from '@/modules/fx_transactions/state/currencySlice';
import adminAccountSlice from '@/modules/fx_transactions/state/adminAccountSlice';

import dashboardSlice from '@/modules/dashboard/state/dashboardStatsSlice';
import loanStatsSlice from '@/modules/loans/state/loanStatsSlice';

import searchSlice from '@/modules/auth/state/searchSlice';
import dropdownOptionSlice from '@/modules/kyc/state/dropdownSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    loan: loanSlice,
    kyc: kycSlice,
    investment: investmentSlice,
    fx: FXSlice,
    wallet: walletSlice,
    support: supportSlice,
    currency: currencySlice,
    admin_accounts: adminAccountSlice,

    dashboard_stats: dashboardSlice,
    loan_stats: loanStatsSlice,
    
    dropdownOptions: dropdownOptionSlice,
    search: searchSlice,
  },
});

export default store;
