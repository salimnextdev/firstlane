import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import {
  loanSlice,
  fetchLoans,
  filterLoans,
  fetchLoanByID,
} from '@/modules/loans/state/loanSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe('loanSlice', () => {
  let store;
  const initialState = loanSlice.getInitialState();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        loan: loanSlice.reducer,
      },
    });
    vi.clearAllMocks();
  });

  describe('fetchLoans thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchLoans.pending());

      const state = store.getState().loan;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set loans', async () => {
      const mockResponse = { data: [{ id: '1', amount: 1000 }], metadata: { total: 1 } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchLoans({ key: 'user', value: 'user123' }));

      const state = store.getState().loan;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.loans).toEqual(mockResponse.data);
      expect(state.metaData).toEqual(mockResponse.metadata);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch loans';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchLoans({ key: 'user', value: 'user123' }));

      const state = store.getState().loan;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.loans).toEqual(initialState.loans);
    });
  });

  describe('filterLoans thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(filterLoans.pending());

      const state = store.getState().loan;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set filtered loans', async () => {
      const mockResponse = { data: [{ id: '2', amount: 2000 }], metadata: { total: 1 } };
      api.post.mockResolvedValue({ data: mockResponse });

      await store.dispatch(filterLoans({ credentials: { status: 'approved' } }));

      const state = store.getState().loan;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.loans).toEqual(mockResponse.data);
      expect(state.metaData).toEqual(mockResponse.metadata);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to filter loans';
      api.post.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(filterLoans({ credentials: { status: 'approved' } }));

      const state = store.getState().loan;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.loans).toEqual(initialState.loans);
    });
  });

  describe('fetchLoanByID thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchLoanByID.pending());

      const state = store.getState().loan;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set loan details', async () => {
      const mockResponse = { data: [{ id: '1', amount: 1000 }] };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchLoanByID({ key: 'id', value: '1' }));

      const state = store.getState().loan;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.loanDetails).toEqual(mockResponse.data[0]);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch loan by ID';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchLoanByID({ key: 'id', value: '1' }));

      const state = store.getState().loan;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.loanDetails).toBeNull();
    });
  });
});