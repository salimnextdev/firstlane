import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const fetchLoans = createAsyncThunk(
  'loan/fetchLoans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/loan`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLoanByID = createAsyncThunk(
  'loan/fetchLoanByID',
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/loan/by-any/${key}/${value}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addLoan = createAsyncThunk(
  'loan/addLoan',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/loan`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loanSlice = createSlice({
  name: 'loan',
  initialState: {
    loans: [],
    loanDetails: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoans.fulfilled, (state, action) => {
          state.loans = action.payload.data // Retrieve the all user loans from the response
          state.loading = false;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchLoanByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanByID.fulfilled, (state, action) => {
          state.loanDetails = action.payload.data[0] // Retrieve the a single loan from the response
          state.loading = false;
      })
      .addCase(fetchLoanByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default loanSlice.reducer;
