import { configureStore } from '@reduxjs/toolkit';
import onBoardingSlice from "@/slices/onBoarding";

const store = configureStore({
  reducer: {
    onBoarding: onBoardingSlice,
  },
});

export default store;
