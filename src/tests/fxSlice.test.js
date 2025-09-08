import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import { 
    FXSlice, 
    fetchFXTransactions, 
    filterFXTransactions, 
    fetchFXTransactionByID, 
    addFXTransaction, 
    fetchFXRates 
} from '@/modules/fx_transactions/state/FXSlice';

vi.mock('@/middlewares/interceptor', () => {
    return {
        default: {
            get: vi.fn(),
            post: vi.fn(),
        },
    };
});

describe('FXSlice', () => {
    let store;
    const initialState = FXSlice.getInitialState();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                fx_transaction: FXSlice.reducer,
            },
        });
        vi.clearAllMocks();
    });

    describe('fetchFXTransactions thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(fetchFXTransactions.pending());

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fulfilled state and set transactions and metadata', async () => {
            const mockResponse = {
                data: [{ id: '1', amount: 100 }],
                metadata: { total: 10, page: 1, limit: 10 }
            };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchFXTransactions({ key: 'id', value: '1', page: 1, limit: 10 }));

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.fx_transactions).toEqual(mockResponse.data);
            expect(state.metaData).toEqual(mockResponse.metadata);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to fetch transactions';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchFXTransactions({ key: 'id', value: '1', page: 1, limit: 10 }));

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.fx_transactions).toEqual(initialState.fx_transactions);
            expect(state.metaData).toEqual(initialState.metaData);
        });
    });

    describe('filterFXTransactions thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(filterFXTransactions.pending());

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fulfilled state and set filtered transactions and metadata', async () => {
            const mockResponse = {
                data: [{ id: '1', amount: 100 }],
                metadata: { total: 10, page: 1, limit: 10 }
            };
            api.post.mockResolvedValue({ data: mockResponse });

            await store.dispatch(filterFXTransactions({}));

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.fx_transactions).toEqual(mockResponse.data);
            expect(state.metaData).toEqual(mockResponse.metadata);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to filter transactions';
            api.post.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(filterFXTransactions({}));

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.fx_transactions).toEqual(initialState.fx_transactions);
            expect(state.metaData).toEqual(initialState.metaData);
        });
    });

    describe('fetchFXTransactionByID thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(fetchFXTransactionByID.pending());

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fulfilled state and set single transaction details', async () => {
            const mockResponse = {
                data: [{ id: '1', amount: 100 }]
            };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchFXTransactionByID({ key: 'id', value: '1' }));

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.fx_transactionDetails).toEqual(mockResponse.data[0]);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to fetch transaction by ID';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchFXTransactionByID({ key: 'id', value: '1' }));

            const state = store.getState().fx_transaction;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.fx_transactionDetails).toBeNull();
        });
    });

    describe('fetchFXRates thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(fetchFXRates.pending());

            const state = store.getState().fx_transaction;
            expect(state.rates_loading).toBe(true);
            expect(state.rates_error).toBeNull();
        });

        it('should handle fulfilled state and set rates', async () => {
            const mockResponse = {
                data: [{ id: '1', rate: 1.25 }]
            };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchFXRates({ page: 1, limit: 10 }));

            const state = store.getState().fx_transaction;
            expect(state.rates_loading).toBe(false);
            expect(state.rates_error).toBeNull();
            expect(state.fx_rates).toEqual(mockResponse.data);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to fetch FX rates';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchFXRates({ page: 1, limit: 10 }));

            const state = store.getState().fx_transaction;
            expect(state.rates_loading).toBe(false);
            expect(state.rates_error).toEqual(errorMessage);
            expect(state.fx_rates).toEqual(initialState.fx_rates);
        });
    });
});