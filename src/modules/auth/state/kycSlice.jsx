import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const kycLevel1 = createAsyncThunk(
  'kyc/kycLevel1',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/kyc/kyc-level-1`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const kycLevel2 = createAsyncThunk(
  'kyc/kycLevel2',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/kyc/kyc-level-2`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const kycLevel3 = createAsyncThunk(
  'kyc/kycLevel3',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/kyc/kyc-level-3`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const kycLevel4 = createAsyncThunk(
  'kyc/kycLevel4',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/kyc/kyc-level-4`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchKycStatus = createAsyncThunk(
  'kyc/fetchKycStatus',
  async (userID, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/kyc/status/${userID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadFile = createAsyncThunk(
  'kyc/uploadFile',
  async (files, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/upload/file`, files ,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const kycSlice = createSlice({
  name: 'kyc',
  initialState: {
    kycStatus: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchKycStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchKycStatus.fulfilled, (state, action) => {
          state.kycStatus = action.payload.data // Retrieve the kyc status from the response
          state.loading = false;
      })
      .addCase(fetchKycStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default kycSlice.reducer;
