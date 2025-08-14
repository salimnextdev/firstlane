import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const fetchAdminAccounts = createAsyncThunk(
  'admin_accounts/fetchAdminAccounts',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      let url = `${API_BASE_URL}/bankAccount`;

      const params = [];
      if (page !== undefined) {
        params.push(`page=${page}`);
      }
      if (limit !== undefined) {
        params.push(`limit=${limit}`);
      }

      if (params.length > 0) {
        url += `?${params.join('&')}`;
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminAccountSlice = createSlice({
  name: 'admin_accounts',
  initialState: {
    accounts: [],
    metaData: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminAccounts.fulfilled, (state, action) => {
        state.accounts = action.payload.data // Retrieve the all admin bank accounts from the response
        state.metaData = action.payload.metadata; // Retrieve the pagination data from the response
        state.loading = false;
      })
      .addCase(fetchAdminAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default adminAccountSlice.reducer;
