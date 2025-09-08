import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import { currencySlice, fetchCurrency, fetchCurrencyByID } from '@/modules/fx_transactions/state/currencySlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe('currencySlice', () => {
    let store;
    const initialState = currencySlice.getInitialState();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                currency: currencySlice.reducer,
            },
        });
        vi.clearAllMocks();
    });

    describe('fetchCurrency thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(fetchCurrency.pending());

            const state = store.getState().currency;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fulfilled state and set currencies and metadata', async () => {
            const mockResponse = {
                data: [{ id: '1', name: 'US Dollar' }],
                metadata: { total: 5, page: 1, limit: 10 }
            };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchCurrency({ page: 1, limit: 10 }));

            const state = store.getState().currency;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.currencies).toEqual(mockResponse.data);
            expect(state.metaData).toEqual(mockResponse.metadata);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to fetch currencies';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchCurrency({ page: 1, limit: 10 }));

            const state = store.getState().currency;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.currencies).toEqual(initialState.currencies);
            expect(state.metaData).toEqual(initialState.metaData);
        });
    });

    describe('fetchCurrencyByID thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(fetchCurrencyByID.pending());

            const state = store.getState().currency;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fulfilled state and set currency details', async () => {
            const mockResponse = {
                data: [{ id: '1', name: 'US Dollar', code: 'USD' }]
            };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchCurrencyByID({ key: 'code', value: 'USD' }));

            const state = store.getState().currency;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.currencyDetails).toEqual(mockResponse.data[0]);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to fetch currency by ID';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchCurrencyByID({ key: 'code', value: 'USD' }));

            const state = store.getState().currency;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.currencyDetails).toBeNull();
        });
    });
});