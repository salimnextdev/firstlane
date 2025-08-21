import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const fetchLoanStats = createAsyncThunk(
    'loanStats/fetchLoanStats',
    async (userID, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_BASE_URL}/users/loan-stats/${userID}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const loanStatsSlice = createSlice({
    name: 'loanStats',
    initialState: {
        stats: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLoanStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLoanStats.fulfilled, (state, action) => {
                state.stats = action.payload.data; // Retrieve the user loanStats stats from the response
                state.loading = false;
            })
            .addCase(fetchLoanStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default loanStatsSlice.reducer;