import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const fetchInvestmentPlans = createAsyncThunk(
  'investment/fetchInvestmentPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/investmentPlans`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchInvestmentPlanByID = createAsyncThunk(
  'investment/fetchInvestmentPlanByID',
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/investmentPlans/by-any/${key}/${value}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchInvestments = createAsyncThunk(
  'investment/fetchInvestments',
  async (userID, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/investments/user-investment?userID=${userID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addInvestments = createAsyncThunk(
  'investment/addInvestments',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/investments/user-investment`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const investmentSlice = createSlice({
  name: 'investment',
  initialState: {
    investment_plan: null,
    investment_plans: [],
    investments: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvestmentPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestmentPlans.fulfilled, (state, action) => {
          state.investment_plans = action.payload.data // Retrieve the investment plans from the response
          state.loading = false;
      })
      .addCase(fetchInvestmentPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchInvestmentPlanByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestmentPlanByID.fulfilled, (state, action) => {
          state.investment_plan = action.payload.data[0] || action.payload.data // Retrieve the investment plan by ID from the response
          state.loading = false;
      })
      .addCase(fetchInvestmentPlanByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchInvestments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvestments.fulfilled, (state, action) => {
          state.investments = action.payload.data // Retrieve the user investments from the response
          state.loading = false;
      })
      .addCase(fetchInvestments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default investmentSlice.reducer;
