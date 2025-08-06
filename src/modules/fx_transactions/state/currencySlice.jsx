import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const fetchCurrency = createAsyncThunk(
  'currency/fetchCurrency',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      let url = `${API_BASE_URL}/currency`;

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

export const fetchCurrencyByID = createAsyncThunk(
  'currency/fetchCurrencyByID',
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/currency/by-any/${key}/${value}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const currencySlice = createSlice({
  name: 'currency',
  initialState: {
    currencies: [],
    metaData: null,
    currencyDetails: null,
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.currencies = action.payload.data // Retrieve the all user currencys from the response
        state.metaData = action.payload.metadata; // Retrieve the pagination data from the response
        state.loading = false;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchCurrencyByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrencyByID.fulfilled, (state, action) => {
        state.currencyDetails = action.payload.data[0] // Retrieve the a single currency from the response
        state.loading = false;
      })
      .addCase(fetchCurrencyByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default currencySlice.reducer;
