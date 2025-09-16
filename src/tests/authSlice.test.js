import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import { removeCookie } from '@/utils/cookieUtils';
import {
    authSlice,
    logout,
    registerUser,
    loginUser,
    verifyAuthentication,
    verifyCode,
    sendCodeToEmail,
    forgotPassword,
    changePassword,
    deleteAccount,
    addBankAccount,
    updateBankAccount,
    removeBankAccount,
    fetchBankAccounts,
    fetchUserProfile,
    updateUserProfile,
} from '@/modules/auth/state/authSlice';

vi.mock('@/middlewares/interceptor', () => {
    return {
      default: {
        get: vi.fn(),
        post: vi.fn(),
        patch: vi.fn(),
      },
    };
  });

// Mock the cookie utility functions to control their behavior in tests.
vi.mock('@/utils/cookieUtils', () => ({
    setCookie: vi.fn(),
    getCookie: vi.fn(() => null),
    removeCookie: vi.fn(),
}));

describe('authSlice', () => {
    let store;
    const initialState = authSlice.getInitialState();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                auth: authSlice.reducer,
            },
        });
        vi.clearAllMocks(); // Clear mocks before each test to prevent state leakage.
    });

    // Test the synchronous logout reducer.
    describe('logout reducer', () => {
        it('should reset state and remove cookies on logout', () => {
            // Simulate a logged-in state.
            store.dispatch({
                type: 'auth/loginUser/fulfilled',
                payload: { access_token: 'fake-token', data: { name: 'Test User' } },
            });
            expect(store.getState().auth.isAuthenticated).toBe(true);

            // Dispatch the logout action.
            store.dispatch(logout());

            // Assert that the state is reset to initial values.
            const state = store.getState().auth;
            expect(state.user).toBeNull();
            expect(state.token).toBeNull();
            expect(state.isAuthenticated).toBe(false);

            // Assert that cookie removal functions were called.
            expect(removeCookie).toHaveBeenCalledWith('token');
            expect(removeCookie).toHaveBeenCalledWith('user');
        });
    });

    // --- Test Async Thunks ---
    describe('registerUser thunk', () => {
        it('should handle pending state', () => {
            store.dispatch(registerUser.pending());
            const state = store.getState().auth;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle rejected state', async () => {
            const errorMessage = 'Registration failed';
            api.post.mockRejectedValue({ response: { data: errorMessage } });
            await store.dispatch(registerUser({}));
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
        });
    });

    describe('loginUser thunk', () => {
        it('should handle successful login and set state', async () => {
            const mockResponse = { access_token: 'fake-token', data: { name: 'Test User' } };
            api.post.mockResolvedValue({ data: mockResponse });

            await store.dispatch(loginUser({}));

            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.user).toEqual(mockResponse.data);
            expect(state.token).toEqual(mockResponse.access_token);
            expect(state.isAuthenticated).toBe(true);
        });

        it('should handle rejected login', async () => {
            const errorMessage = 'Invalid credentials';
            api.post.mockRejectedValue({ response: { data: errorMessage } });
            await store.dispatch(loginUser({}));
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
        });
    });
    
    // Test for addBankAccount thunk
    describe('addBankAccount thunk', () => {
        it('should handle successful bank account addition and update state', async () => {
            const mockResponse = { data: [{ accountNumber: '123' }] };
            api.post.mockResolvedValue({ data: mockResponse });
            await store.dispatch(addBankAccount({}));
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.bankAccounts).toEqual(mockResponse.data);
        });
        it('should handle rejected bank account addition', async () => {
            const errorMessage = 'Failed to add account';
            api.post.mockRejectedValue({ response: { data: errorMessage } });
            await store.dispatch(addBankAccount({}));
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
        });
    });

    // Test for fetchBankAccounts thunk
    describe('fetchBankAccounts thunk', () => {
        it('should handle successful fetch and update state', async () => {
            const mockResponse = { data: [{ accountNumber: '123' }] };
            api.get.mockResolvedValue({ data: mockResponse });
            await store.dispatch(fetchBankAccounts());
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.bankAccounts).toEqual(mockResponse.data);
        });
        it('should handle rejected fetch', async () => {
            const errorMessage = 'Failed to fetch accounts';
            api.get.mockRejectedValue({ response: { data: errorMessage } });
            await store.dispatch(fetchBankAccounts());
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
        });
    });
    
    // Test for fetchUserProfile thunk
    describe('fetchUserProfile thunk', () => {
        it('should handle successful fetch and update state', async () => {
            const mockResponse = { name: 'Test User' };
            api.get.mockResolvedValue({ data: mockResponse });
            await store.dispatch(fetchUserProfile());
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.userProfile).toEqual(mockResponse);
        });
        it('should handle rejected fetch', async () => {
            const errorMessage = 'Failed to fetch profile';
            api.get.mockRejectedValue({ response: { data: errorMessage } });
            await store.dispatch(fetchUserProfile());
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
        });
    });

    // Test for updateUserProfile thunk
    describe('updateUserProfile thunk', () => {
        it('should handle rejected update', async () => {
            const errorMessage = 'Failed to update profile';
            api.patch.mockRejectedValue({ response: { data: errorMessage } });
            await store.dispatch(updateUserProfile({}));
            const state = store.getState().auth;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(null);
        });
    });
});