import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';
import { API_BASE_URL } from '@/middlewares/api';


export const fetchLoans = createAsyncThunk(
  'loan/fetchLoans',
  async ({ key, value, page, limit }, { rejectWithValue }) => {
    try {
      let url = `${API_BASE_URL}/loan/by-any/${key}/${value}`;

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

export const filterLoans = createAsyncThunk(
  'loan/filterLoans',
  async ({ credentials, page, limit }, { rejectWithValue }) => {
    try {
      let url = `${API_BASE_URL}/loan/by-many`;
      
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
      const response = await api.post(url, credentials);
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
  async (credentials, { rejectWithValue, getState }) => {
    try {
      console.log('loan credentials before submission', credentials);
      const state = getState();
      const userProfile = state?.auth?.userProfile;
      const isKycComplete = userProfile?.verifications?.isKycComplete === true;

      // every loan request must pass KYC complete check from auth.userProfile.
      if (!isKycComplete) {
        return rejectWithValue({
          status: false,
          message: 'KYC is not complete. Please complete your verification before applying for a loan.',
        });
      }

      const response = await api.post(`${API_BASE_URL}/loan`, credentials);
      console.log('loan response after submission', response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const repayLoan = createAsyncThunk(
  'loan/repayLoan',
  async (loanID, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/loan/process-repayment/${loanID}`, {});
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const repayAllLoan = createAsyncThunk(
  'loan/repayAllLoan',
  async (loanID, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_BASE_URL}/loan/process-repayment/${loanID}/all`, {});
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
    metaData: null,
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
        state.metaData = action.payload.metadata; // Retrieve the pagination data from the response
        state.loading = false;
      })
      .addCase(fetchLoans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(filterLoans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterLoans.fulfilled, (state, action) => {
        state.loans = action.payload.data // Retrieve the filtered loans from the response
        state.metaData = action.payload.metadata; // Retrieve the pagination data from the response
        state.loading = false;
      })
      .addCase(filterLoans.rejected, (state, action) => {
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

      .addCase(repayLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(repayLoan.fulfilled, (state, action) => {
        // state.loanDetails = action.payload.data[0] // Retrieve the a single loan from the response
        state.loading = false;
      })
      .addCase(repayLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(repayAllLoan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(repayAllLoan.fulfilled, (state, action) => {
        // state.loanDetails = action.payload.data[0] // Retrieve the a single loan from the response
        state.loading = false;
      })
      .addCase(repayAllLoan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  }
});

export default loanSlice.reducer;
