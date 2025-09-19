import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const fetchAdminSettings = createAsyncThunk(
  'admin_settings/fetchAdminSettings',
  async (_, { rejectWithValue }) => {
    try {
        const response = await api.get(`${API_BASE_URL}/admin/settings`);
        return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const adminSettingsSlice = createSlice({
  name: 'admin_settings',
  initialState: {
    settings: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminSettings.fulfilled, (state, action) => {
        state.settings = action.payload.data?.[0] // Retrieve the all admin settings from the response
        state.loading = false;
      })
      .addCase(fetchAdminSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default adminSettingsSlice.reducer;
