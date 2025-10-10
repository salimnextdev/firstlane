import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const fetchPurpose = createAsyncThunk(
  'dropdownOptions/fetchPurpose',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/purpose?page=1&limit=25`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCollateral = createAsyncThunk(
  'dropdownOptions/fetchCollateral',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/collateral?page=1&limit=25`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchDuration = createAsyncThunk(
  'dropdownOptions/fetchDuration',
  async (durationType, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/duration/by-any/type/${durationType}?page=1&limit=25`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchInterval = createAsyncThunk(
  'dropdownOptions/fetchInterval',
  async (intervalType, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/interval/by-any/type/${intervalType}?page=1&limit=25`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state with separate slices of state for each option type
const initialState = {
  purpose: {
    data: [],
    loading: false,
    error: null,
  },
  collateral: {
    data: [],
    loading: false,
    error: null,
  },
  duration: {
    data: [],
    loading: false,
    error: null,
  },
  interval: {
    data: [],
    loading: false,
    error: null,
  },
};

export const dropdownOptionSlice = createSlice({
  name: 'dropdownOptions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Purpose
    builder
      .addCase(fetchPurpose.pending, (state) => {
        state.purpose.loading = true;
        state.purpose.error = null;
      })
      .addCase(fetchPurpose.fulfilled, (state, action) => {
        state.purpose.data = action.payload.data || [];
        state.purpose.loading = false;
      })
      .addCase(fetchPurpose.rejected, (state, action) => {
        state.purpose.loading = false;
        state.purpose.error = action.payload;
      });

    // Collateral
    builder
      .addCase(fetchCollateral.pending, (state) => {
        state.collateral.loading = true;
        state.collateral.error = null;
      })
      .addCase(fetchCollateral.fulfilled, (state, action) => {
        state.collateral.data = action.payload.data || [];
        state.collateral.loading = false;
      })
      .addCase(fetchCollateral.rejected, (state, action) => {
        state.collateral.loading = false;
        state.collateral.error = action.payload;
      });

    // Duration
    builder
      .addCase(fetchDuration.pending, (state) => {
        state.duration.loading = true;
        state.duration.error = null;
      })
      .addCase(fetchDuration.fulfilled, (state, action) => {
        state.duration.data = action.payload.data || [];
        state.duration.loading = false;
      })
      .addCase(fetchDuration.rejected, (state, action) => {
        state.duration.loading = false;
        state.duration.error = action.payload;
      });

    // Interval
    builder
      .addCase(fetchInterval.pending, (state) => {
        state.interval.loading = true;
        state.interval.error = null;
      })
      .addCase(fetchInterval.fulfilled, (state, action) => {
        state.interval.data = action.payload.data || [];
        state.interval.loading = false;
      })
      .addCase(fetchInterval.rejected, (state, action) => {
        state.interval.loading = false;
        state.interval.error = action.payload;
      });
  },
});

export default dropdownOptionSlice.reducer;