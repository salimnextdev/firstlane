import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import {
  kycSlice,
  fetchKycStatus,
  fetchStates,
  fetchLGA,
} from '@/modules/kyc/state/kycSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe('kycSlice', () => {
  let store;
  const initialState = kycSlice.getInitialState();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        kyc: kycSlice.reducer,
      },
    });
    vi.clearAllMocks();
  });

  describe('fetchKycStatus thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchKycStatus.pending());

      const state = store.getState().kyc;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set KYC status', async () => {
      const mockResponse = { data: { status: 'pending' } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchKycStatus('user123'));

      const state = store.getState().kyc;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.kycStatus).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch KYC status';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchKycStatus('user123'));

      const state = store.getState().kyc;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.kycStatus).toEqual(initialState.kycStatus);
    });
  });
});