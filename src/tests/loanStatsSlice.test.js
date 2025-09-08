import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import {
  loanStatsSlice,
  fetchLoanStats
} from '@/modules/loans/state/loanStatsSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe('loanStatsSlice', () => {
  let store;
  const initialState = loanStatsSlice.getInitialState();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        loanStats: loanStatsSlice.reducer,
      },
    });
    vi.clearAllMocks();
  });

  describe('fetchLoanStats thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchLoanStats.pending());

      const state = store.getState().loanStats;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set loan stats', async () => {
      const mockResponse = { data: { totalLoans: 5, totalAmount: 5000 } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchLoanStats('user123'));

      const state = store.getState().loanStats;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.stats).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch loan stats';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchLoanStats('user123'));

      const state = store.getState().loanStats;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.stats).toEqual(initialState.stats);
    });
  });
});