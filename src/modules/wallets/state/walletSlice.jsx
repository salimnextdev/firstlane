import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const fetchBanks = createAsyncThunk(
  'wallet/fetchBanks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/wallet/banks`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// export const verifyAccount = createAsyncThunk(
//   'wallet/verifyAccount',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await api.post(`${API_BASE_URL}/wallet/verify-account`, credentials);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

export const verifyAccount = createAsyncThunk(
  'wallet/verifyAccount',
  async ({ accountNumber, bankCode }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/wallet/verify-account?accountNumber=${accountNumber}&bankCode=${bankCode}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async (userID, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/wallet/available-balance?userID=${userID}`,);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'wallet/fetchTransactions',
  async ({ userID, from, to, page, limit }, { rejectWithValue }) => {
    try {
      const today = new Date();
      const defaultTo = today.toISOString().split('T')[0]; // e.g. '2025-08-14'

      const pastDate = new Date();
      pastDate.setDate(today.getDate() - 365); // Last 365 days, Adjust Accordingly
      const defaultFrom = pastDate.toISOString().split('T')[0]; // e.g. '2025-07-15'

      const fromDate = from || defaultFrom;
      const toDate = to || defaultTo;

      let url = `${API_BASE_URL}/wallet/fetch-transactions?userID=${userID}`;

      const params = [];

      params.push(`from=${fromDate}`);
      params.push(`to=${toDate}`);

      if (page !== undefined) {
        params.push(`page=${page}`);
      }
      if (limit !== undefined) {
        params.push(`perPage=${limit}`);
      }

      if (params.length > 0) {
        url += `&${params.join('&')}`;
      }

      const response = await api.get(url);

      // Filter out transaction fess from the transaction list response
      const filteredResponse = {
        ...response.data,
        data: {
          ...response.data.data,
          transactions: response.data.data.transactions.filter(
            transaction => !(transaction.type === "D" && transaction.sent_amount === 0)
          )
        }
      };

      return filteredResponse;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchTransactionByID = createAsyncThunk(
  'wallet/fetchTransactionByID',
  async (transactionID, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/wallet/transaction/${transactionID}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMoney = createAsyncThunk(
  'wallet/sendMoney',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/wallet/withdraw-funds`, credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fundWalletByCoupon = createAsyncThunk(
  'wallet/fundWalletByCoupon',
  async (couponCode, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/coupon/redeem/${couponCode}`, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    banks: [],
    balance: null,
    accountDetails: null,
    transactions: [],
    metaData: null,
    transactionDetails: null,
    loading: false,
    error: null,
    verify_loading: false,
    verify_error: null,
    transaction_loading: false,
    transaction_error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanks.fulfilled, (state, action) => {
        state.banks = action.payload.data // Retrieve the all banks from the response
        state.loading = false;
      })
      .addCase(fetchBanks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(verifyAccount.pending, (state) => {
        state.verify_loading = true;
        state.verify_error = null;
      })
      .addCase(verifyAccount.fulfilled, (state, action) => {
        state.accountDetails = action.payload.data // Retrieve the user bank info from the response
        state.verify_loading = false;
      })
      .addCase(verifyAccount.rejected, (state, action) => {
        state.verify_loading = false;
        state.verify_error = action.payload;
      })

      .addCase(fetchBalance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBalance.fulfilled, (state, action) => {
        state.balance = action.payload.data // Retrieve the user available balance
        state.loading = false;
      })
      .addCase(fetchBalance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchTransactions.pending, (state) => {
        state.transaction_loading = true;
        state.transaction_error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.data?.transactions // Retrieve the user transactions from the response
        state.metaData = action.payload.data?.page_info // Retrieve the pagination metaData from the response
        state.transaction_loading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.transaction_loading = false;
        state.transaction_error = action.payload;
      })
      
      .addCase(fetchTransactionByID.pending, (state) => {
        state.transaction_loading = true;
        state.transaction_error = null;
      })
      .addCase(fetchTransactionByID.fulfilled, (state, action) => {
        state.transactionDetails = action.payload.data // Retrieve the single transaction from the response
        state.transaction_loading = false;
      })
      .addCase(fetchTransactionByID.rejected, (state, action) => {
        state.transaction_loading = false;
        state.transaction_error = action.payload;
      })
  }
});

export default walletSlice.reducer;
