import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import {
  investmentSlice,
  fetchInvestmentPlans,
  fetchInvestmentPlanByID,
  fetchInvestments,
  syncInvestmentsDetails
} from '@/modules/investments/state/investmentSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe('investmentSlice', () => {
  let store;
  const initialState = investmentSlice.getInitialState();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        investment: investmentSlice.reducer,
      },
    });
    vi.clearAllMocks();
  });

  describe('fetchInvestmentPlans thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchInvestmentPlans.pending());

      const state = store.getState().investment;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set investment plans', async () => {
      const mockResponse = { data: [{ id: '1', name: 'Growth Plan' }] };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchInvestmentPlans());

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.investment_plans).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch investment plans';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchInvestmentPlans());

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.investment_plans).toEqual(initialState.investment_plans);
    });
  });

  describe('fetchInvestmentPlanByID thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchInvestmentPlanByID.pending());

      const state = store.getState().investment;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set investment plan by ID', async () => {
      const mockResponse = { data: [{ id: '1', name: 'Growth Plan' }] };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchInvestmentPlanByID({ key: 'id', value: '1' }));

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.investment_plan).toEqual(mockResponse.data[0]);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch investment plan by ID';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchInvestmentPlanByID({ key: 'id', value: '1' }));

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.investment_plan).toBeNull();
    });
  });

  describe('fetchInvestments thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchInvestments.pending());

      const state = store.getState().investment;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set user investments', async () => {
      const mockResponse = { data: [{ id: '1', amount: 5000 }] };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchInvestments('user123'));

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.investments).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch investments';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchInvestments('user123'));

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.investments).toEqual(initialState.investments);
    });
  });

  describe('syncInvestmentsDetails thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(syncInvestmentsDetails.pending());

      const state = store.getState().investment;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set investment details', async () => {
      const mockResponse = { data: { id: '1', name: 'Synced Plan' } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(syncInvestmentsDetails('code123'));

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.investment_plan).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to sync investment details';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(syncInvestmentsDetails('code123'));

      const state = store.getState().investment;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.investment_plan).toBeNull();
    });
  });
});