import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/modules/auth/state/authSlice';
import userSlice from '@/modules/auth/state/userSlice';
import loanSlice from '@/modules/loans/state/loanSlice';
import kycSlice from '@/modules/kyc/state/kycSlice';
import investmentSlice from '@/modules/investments/state/investmentSlice';
import FXSlice from '@/modules/fx_transactions/state/fxSlice';
import walletSlice from '@/modules/wallets/state/walletSlice';
import supportSlice from '@/modules/support/states/supportSlice';

import currencySlice from '@/modules/fx_transactions/state/currencySlice';

import searchSlice from '@/modules/auth/state/searchSlice';

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

    search: searchSlice,
  },
});

export default store;
