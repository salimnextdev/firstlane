import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';
<<<<<<< HEAD
import { API_BASE_URL } from '@/middlewares/api';
=======

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
>>>>>>> c3475d0ff9d7decab88c0ba8afac106ed1b4f1f4

export const fetchDashboardStats = createAsyncThunk(
    'dashboardStats/fetchDashboardStats',
    async (userID, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_BASE_URL}/users/financial-snapshot/${userID}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const dashboardSlice = createSlice({
    name: 'dashboardStats',
    initialState: {
        stats: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchDashboardStats.fulfilled, (state, action) => {
                state.stats = action.payload.data; // Retrieve the user dashboard stats from the response
                state.loading = false;
            })
            .addCase(fetchDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default dashboardSlice.reducer;