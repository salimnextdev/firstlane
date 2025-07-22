import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/middlewares/interceptor';

const API_BASE_URL = import.meta.env.VITE_API_API_BASE_URL

export const addSupport = createAsyncThunk(
    'support/addSupport',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await api.post(`${API_BASE_URL}/support`, credentials);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchSupports = createAsyncThunk(
    'support/fetchSupports',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_BASE_URL}/support`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchSupportConversations = createAsyncThunk(
    'support/fetchSupportConversations',
    async (supportID, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_BASE_URL}/support?supportID=${supportID}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const fetchSupportByID = createAsyncThunk(
    'support/fetchSupportByID',
    async ({ key, value }, { rejectWithValue }) => {
        try {
            const response = await api.get(`${API_BASE_URL}/support/by-any/${key}/${value}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteSupport = createAsyncThunk(
    'support/deleteSupport',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.delete(`${API_BASE_URL}/support`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const supportSlice = createSlice({
    name: 'support',
    initialState: {
        supports: [],
        supportConversations: [],
        supportDetails: null,
        loading: false,
        error: null,
        support_loading: false,
        support_error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSupports.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSupports.fulfilled, (state, action) => {
                state.supports = action.payload.data // Retrieve the all support messages from the response
                state.loading = false;
            })
            .addCase(fetchSupports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(fetchSupportConversations.pending, (state) => {
                state.support_loading = true;
                state.support_error = null;
            })
            .addCase(fetchSupportConversations.fulfilled, (state, action) => {
                state.supportConversations = action.payload.data // Retrieve a single support conversation from the response
                state.support_loading = false;
            })
            .addCase(fetchSupportConversations.rejected, (state, action) => {
                state.support_loading = false;
                state.support_error = action.payload;
            })

            .addCase(fetchSupportByID.pending, (state) => {
                state.support_loading = true;
                state.support_error = null;
            })
            .addCase(fetchSupportByID.fulfilled, (state, action) => {
                state.supportDetails = action.payload.data // Retrieve a single support detail from the response
                state.support_loading = false;
            })
            .addCase(fetchSupportByID.rejected, (state, action) => {
                state.support_loading = false;
                state.support_error = action.payload;
            })
    }
});

export default supportSlice.reducer;
