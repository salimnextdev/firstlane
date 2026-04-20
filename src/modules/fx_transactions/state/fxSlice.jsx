import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';
import { API_BASE_URL } from '@/middlewares/api';

export const fetchFXTransactions = createAsyncThunk(
  'fx_transaction/fetchFXTransactions',
  async ({ key, value, page, limit }, { rejectWithValue }) => {
    try {
      let url = `${API_BASE_URL}/fx/by-any/${key}/${value}`;

      const params = [];
      // Conditionally add 'page' and 'limit' if they are provided
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

// export const filterFXTransactions = createAsyncThunk(
//   'fx_transaction/filterFXTransactions',
//   async ({ credentials, page, limit }, { rejectWithValue }) => {
//     try {
//       let url = `${API_BASE_URL}/fx/find-by-many`;
      
//       const params = [];
//       if (page !== undefined) {
//         params.push(`page=${page}`);
//       }
//       if (limit !== undefined) {
//         params.push(`limit=${limit}`);
//       }

//       if (params.length > 0) {
//         url += `?${params.join('&')}`;
//       }
//       const response = await api.post(url, credentials);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const filterFXTransactions = createAsyncThunk(
  'fx_transaction/filterFXTransactions',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/fx/find-by-many`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFXTransactionByID = createAsyncThunk(
  'fx_transaction/fetchFXTransactionByID',
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/fx/by-any/${key}/${value}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFXTransaction = createAsyncThunk(
  'fx_transaction/addFXTransaction',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/fx`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFXTransaction = createAsyncThunk(
  'fx_transaction/updateFXTransaction',
  async ({ transactionID, credentials }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_BASE_URL}/fx/${transactionID}`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchFXRates = createAsyncThunk(
  'fx_transaction/fetchFXRates',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      let url = `${API_BASE_URL}/fxRate`;

      const params = [];
      // Conditionally add 'page' and 'limit' if they are provided
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

export const FXSlice = createSlice({
  name: 'fx_transaction',
  initialState: {
    fx_transactions: [],
    metaData: null,
    fx_transactionDetails: null,
    fx_rates: [],
    loading: false,
    error: null,
    rates_loading: false,
    rates_error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFXTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFXTransactions.fulfilled, (state, action) => {
        state.fx_transactions = action.payload.data // Retrieve the all user fx_transactions from the response
        state.metaData = action.payload.metadata; // Retrieve the pagination data from the response
        state.loading = false;
      })
      .addCase(fetchFXTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(filterFXTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterFXTransactions.fulfilled, (state, action) => {
        state.fx_transactions = action.payload.data // Retrieve the all user fx_transactions from the response
        state.metaData = action.payload.metadata; // Retrieve the pagination data from the response
        state.loading = false;
      })
      .addCase(filterFXTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFXTransactionByID.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFXTransactionByID.fulfilled, (state, action) => {
        state.fx_transactionDetails = action.payload.data[0] // Retrieve the a single fx_transaction from the response
        state.loading = false;
      })
      .addCase(fetchFXTransactionByID.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchFXRates.pending, (state) => {
        state.rates_loading = true;
        state.rates_error = null;
      })
      .addCase(fetchFXRates.fulfilled, (state, action) => {
        state.fx_rates = action.payload.data // Retrieve all fx_rates from the response
        state.rates_loading = false;
      })
      .addCase(fetchFXRates.rejected, (state, action) => {
        state.rates_loading = false;
        state.rates_error = action.payload;
      })
  }
});

export default FXSlice.reducer;
