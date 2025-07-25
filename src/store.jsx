import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/modules/auth/state/authSlice';
import userSlice from '@/modules/auth/state/userSlice';
import loanSlice from '@/modules/loans/state/loanSlice';
import kycSlice from '@/modules/kyc/state/kycSlice';
import investmentSlice from '@/modules/investments/state/investmentSlice';
import walletSlice from '@/modules/wallets/state/walletSlice';
import supportSlice from '@/modules/support/states/supportSlice';

import searchSlice from '@/modules/auth/state/searchSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    loan: loanSlice,
    kyc: kycSlice,
    investment: investmentSlice,
    wallet: walletSlice,
    support: supportSlice,

    search: searchSlice,
  },
});

export default store;
