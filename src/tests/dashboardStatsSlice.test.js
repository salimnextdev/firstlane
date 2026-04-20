import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import { dashboardSlice, fetchDashboardStats } from '@/modules/dashboard/state/dashboardStatsSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
    },
  };
});

describe('dashboardSlice', () => {
    let store;
    const initialState = dashboardSlice.getInitialState();

    beforeEach(() => {
        store = configureStore({
            reducer: {
                dashboardStats: dashboardSlice.reducer,
            },
        });
        vi.clearAllMocks();
    });

    describe('fetchDashboardStats thunk', () => {
        it('should handle pending state correctly', () => {
            store.dispatch(fetchDashboardStats.pending());

            const state = store.getState().dashboardStats;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });

        it('should handle fulfilled state and set stats data', async () => {
            const mockResponse = { data: { totalIncome: 5000, totalExpenses: 2500 } };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchDashboardStats('mockUserID'));

            const state = store.getState().dashboardStats;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.stats).toEqual(mockResponse.data);
        });

        it('should handle rejected state and set the error', async () => {
            const errorMessage = 'Failed to fetch dashboard stats';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchDashboardStats('mockUserID'));

            const state = store.getState().dashboardStats;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.stats).toBeNull();
        });
    });
});