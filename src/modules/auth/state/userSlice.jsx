import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '@/middlewares/interceptor';
import { API_BASE_URL } from '@/middlewares/api';

export const fetchNotifications = createAsyncThunk(
    'user/fetchNotifications',
    async ({ key, value, page, limit }, { rejectWithValue }) => {
        try {
            let url = `${API_BASE_URL}/users/notification/by-any/${key}/${value}`;

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
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const fetchUnreadNotificationsCount = createAsyncThunk(
    'user/fetchUnreadNotificationsCount',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_BASE_URL}/users/notification/unread-count`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const markAllAsRead = createAsyncThunk(
    'user/markAllAsRead',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.patch(`${API_BASE_URL}/users/notification/mark-all-as-read`, {});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        notifications: [],
        count: 0,
        metaData: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNotifications.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNotifications.fulfilled, (state, action) => {
                state.notifications = action.payload.data; // Retrieve the user bank accounts from the response
                state.metaData = action.payload.metadata; // Retrieve the pagination data from the response
                state.loading = false;
            })
            .addCase(fetchNotifications.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchUnreadNotificationsCount.fulfilled, (state, action) => {
                state.count = action.payload?.data?.count; // Retrieve the unread notification count from the response
                state.loading = false;
            })
    }
});

export default userSlice.reducer;