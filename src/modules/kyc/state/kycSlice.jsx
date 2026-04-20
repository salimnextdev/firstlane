import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@/middlewares/interceptor';
import { API_BASE_URL } from '@/middlewares/api';
import { getCookie } from '@/utils/cookieUtils';

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

export const fetchStates = createAsyncThunk(
  'kyc/fetchStates',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/states`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchLGA = createAsyncThunk(
  'kyc/fetchLGA',
  async (stateName, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/states?stateName=${stateName}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const uploadFile = createAsyncThunk(
  'kyc/uploadFile',
  async (file, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('files', file);

      // Use a dedicated axios instance instead of the shared `api` interceptor.
      // The shared instance has a 10s timeout and baseURL that can interfere with multipart.
      const token = getCookie('token');
      const response = await axios.post(
        `${API_BASE_URL}/upload/cloudinary?folder=userDocuments`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
          timeout: 60000,
        }
      );
      return { data: response.data };
    } catch (error) {
      const message =
        (error?.code === 'ERR_CANCELED'
          ? 'Upload was canceled. Please try again.'
          : null) ||
        (error?.code === 'ECONNABORTED'
          ? 'Upload timed out. Try a smaller image or retry.'
          : null) ||
        error?.response?.data?.message ||
        error?.message ||
        'Profile upload failed';
      return rejectWithValue({ message });
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
