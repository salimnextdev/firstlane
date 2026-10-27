import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import {
  dropdownOptionSlice,
  fetchPurpose,
  fetchCollateral,
  fetchDuration,
  fetchInterval
} from '@/modules/kyc/state/dropdownSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe('dropdownOptionSlice', () => {
  let store;
  const initialState = dropdownOptionSlice.getInitialState();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        dropdownOptions: dropdownOptionSlice.reducer,
      },
    });
    vi.clearAllMocks();
  });

  describe('fetchPurpose thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchPurpose.pending());

      const state = store.getState().dropdownOptions;
      expect(state.purpose.loading).toBe(true);
      expect(state.purpose.error).toBeNull();
    });

    it('should handle fulfilled state and set purpose data', async () => {
      const mockData = [{ id: '1', name: 'Purpose A' }];
      api.get.mockResolvedValue({ data: { data: mockData } });

      await store.dispatch(fetchPurpose());

      const state = store.getState().dropdownOptions;
      expect(state.purpose.loading).toBe(false);
      expect(state.purpose.error).toBeNull();
      expect(state.purpose.data).toEqual(mockData);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch purposes';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchPurpose());

      const state = store.getState().dropdownOptions;
      expect(state.purpose.loading).toBe(false);
      expect(state.purpose.error).toEqual(errorMessage);
      expect(state.purpose.data).toEqual(initialState.purpose.data);
    });
  });

  describe('fetchCollateral thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchCollateral.pending());

      const state = store.getState().dropdownOptions;
      expect(state.collateral.loading).toBe(true);
      expect(state.collateral.error).toBeNull();
    });

    it('should handle fulfilled state and set collateral data', async () => {
      const mockData = [{ id: '2', name: 'Collateral A' }];
      api.get.mockResolvedValue({ data: { data: mockData } });

      await store.dispatch(fetchCollateral());

      const state = store.getState().dropdownOptions;
      expect(state.collateral.loading).toBe(false);
      expect(state.collateral.error).toBeNull();
      expect(state.collateral.data).toEqual(mockData);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch collateral';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchCollateral());

      const state = store.getState().dropdownOptions;
      expect(state.collateral.loading).toBe(false);
      expect(state.collateral.error).toEqual(errorMessage);
      expect(state.collateral.data).toEqual(initialState.collateral.data);
    });
  });

  describe('fetchDuration thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchDuration.pending());

      const state = store.getState().dropdownOptions;
      expect(state.duration.loading).toBe(true);
      expect(state.duration.error).toBeNull();
    });

    it('should handle fulfilled state and set duration data', async () => {
      const mockData = [{ id: '3', name: 'Duration A' }];
      api.get.mockResolvedValue({ data: { data: mockData } });

      await store.dispatch(fetchDuration());

      const state = store.getState().dropdownOptions;
      expect(state.duration.loading).toBe(false);
      expect(state.duration.error).toBeNull();
      expect(state.duration.data).toEqual(mockData);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch durations';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchDuration());

      const state = store.getState().dropdownOptions;
      expect(state.duration.loading).toBe(false);
      expect(state.duration.error).toEqual(errorMessage);
      expect(state.duration.data).toEqual(initialState.duration.data);
    });
  });

  describe('fetchInterval thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchInterval.pending());

      const state = store.getState().dropdownOptions;
      expect(state.interval.loading).toBe(true);
      expect(state.interval.error).toBeNull();
    });

    it('should handle fulfilled state and set interval data', async () => {
      const mockData = [{ id: '4', name: 'Interval A' }];
      api.get.mockResolvedValue({ data: { data: mockData } });

      await store.dispatch(fetchInterval('weekly'));

      const state = store.getState().dropdownOptions;
      expect(state.interval.loading).toBe(false);
      expect(state.interval.error).toBeNull();
      expect(state.interval.data).toEqual(mockData);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch intervals';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchInterval('weekly'));

      const state = store.getState().dropdownOptions;
      expect(state.interval.loading).toBe(false);
      expect(state.interval.error).toEqual(errorMessage);
      expect(state.interval.data).toEqual(initialState.interval.data);
    });
  });
});