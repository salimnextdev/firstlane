import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@/modules/auth/state/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export default store;
