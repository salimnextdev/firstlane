import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';
import { API_BASE_URL } from '@/middlewares/api';

export const fetchAdminSettings = createAsyncThunk(
  'admin_settings/fetchAdminSettings',
  async (_, { rejectWithValue }) => {
    try {
        // Public settings endpoint now returns a single settings object in `data`.
        const response = await api.get(`${API_BASE_URL}/settings`);
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
        const payloadData = action.payload?.data;
        // Backward-compatible with previous array shape and new object shape.
        state.settings = Array.isArray(payloadData) ? payloadData[0] : payloadData;
        state.loading = false;
      })
      .addCase(fetchAdminSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default adminSettingsSlice.reducer;
