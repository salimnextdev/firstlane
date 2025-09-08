import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import { adminAccountSlice, fetchAdminAccounts } from '@/modules/fx_transactions/state/adminAccountSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe('adminAccountSlice', () => {
    let store;
    const initialState = adminAccountSlice.getInitialState();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                admin_accounts: adminAccountSlice.reducer,
            },
        });
        vi.clearAllMocks();
    });

    describe('fetchAdminAccounts thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(fetchAdminAccounts.pending());

            const state = store.getState().admin_accounts;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fulfilled state and set accounts and metadata', async () => {
            const mockResponse = {
                data: [{ id: '1', name: 'Account 1' }],
                metadata: { total: 100, page: 1, limit: 10 }
            };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchAdminAccounts({ page: 1, limit: 10 }));

            const state = store.getState().admin_accounts;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.accounts).toEqual(mockResponse.data);
            expect(state.metaData).toEqual(mockResponse.metadata);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to fetch admin accounts';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchAdminAccounts({ page: 1, limit: 10 }));

            const state = store.getState().admin_accounts;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.accounts).toEqual(initialState.accounts);
            expect(state.metaData).toEqual(initialState.metaData);
        });
    });
});