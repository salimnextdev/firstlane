import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import {
  walletSlice,
  fetchBanks,
  verifyAccount,
  fetchBalance,
  fetchTransactions,
  fetchTransactionByID
} from '@/modules/wallets/state/walletSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
    },
  };
});

describe('walletSlice', () => {
  let store;
  const initialState = walletSlice.getInitialState();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        wallet: walletSlice.reducer,
      },
    });
    vi.clearAllMocks();
  });

  describe('fetchBanks thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchBanks.pending());

      const state = store.getState().wallet;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set banks', async () => {
      const mockResponse = { data: [{ id: '1', name: 'Bank A' }] };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchBanks());

      const state = store.getState().wallet;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.banks).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch banks';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchBanks());

      const state = store.getState().wallet;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.banks).toEqual(initialState.banks);
    });
  });

  describe('verifyAccount thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(verifyAccount.pending());

      const state = store.getState().wallet;
      expect(state.verify_loading).toBe(true);
      expect(state.verify_error).toBeNull();
    });

    it('should handle fulfilled state and set account details', async () => {
      const mockResponse = { data: { accountName: 'John Doe' } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(verifyAccount({ accountNumber: '12345', bankCode: '001' }));

      const state = store.getState().wallet;
      expect(state.verify_loading).toBe(false);
      expect(state.verify_error).toBeNull();
      expect(state.accountDetails).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to verify account';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(verifyAccount({ accountNumber: '12345', bankCode: '001' }));

      const state = store.getState().wallet;
      expect(state.verify_loading).toBe(false);
      expect(state.verify_error).toEqual(errorMessage);
      expect(state.accountDetails).toBeNull();
    });
  });

  describe('fetchBalance thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchBalance.pending());

      const state = store.getState().wallet;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set balance', async () => {
      const mockResponse = { data: { balance: 5000 } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchBalance('user123'));

      const state = store.getState().wallet;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.balance).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch balance';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchBalance('user123'));

      const state = store.getState().wallet;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.balance).toBeNull();
    });
  });

  describe('fetchTransactions thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchTransactions.pending());

      const state = store.getState().wallet;
      expect(state.transaction_loading).toBe(true);
      expect(state.transaction_error).toBeNull();
    });

    it('should handle fulfilled state and set transactions and metadata', async () => {
      const mockTransactions = [
        { id: '1', type: 'C', sent_amount: 100 },
        { id: '2', type: 'D', sent_amount: 50 },
      ];
      const mockResponse = {
        data: {
          transactions: mockTransactions,
          page_info: { total_pages: 1 }
        }
      };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchTransactions({ userID: 'user123' }));

      const state = store.getState().wallet;
      expect(state.transaction_loading).toBe(false);
      expect(state.transaction_error).toBeNull();
      expect(state.transactions).toEqual(mockTransactions);
      expect(state.metaData).toEqual(mockResponse.data.page_info);
    });

    it('should filter out specific transactions and set metadata', async () => {
      const mockTransactions = [
        { id: '1', type: 'C', sent_amount: 100 },
        { id: '2', type: 'D', sent_amount: 0 }, // This one should be filtered out
        { id: '3', type: 'D', sent_amount: 50 },
      ];
      const mockResponse = {
        data: {
          transactions: mockTransactions,
          page_info: { total_pages: 1 }
        }
      };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchTransactions({ userID: 'user123' }));

      const state = store.getState().wallet;
      expect(state.transactions).toEqual([
        { id: '1', type: 'C', sent_amount: 100 },
        { id: '3', type: 'D', sent_amount: 50 },
      ]);
      expect(state.metaData).toEqual(mockResponse.data.page_info);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch transactions';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchTransactions({ userID: 'user123' }));

      const state = store.getState().wallet;
      expect(state.transaction_loading).toBe(false);
      expect(state.transaction_error).toEqual(errorMessage);
      expect(state.transactions).toEqual([]);
    });
  });

  describe('fetchTransactionByID thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchTransactionByID.pending());

      const state = store.getState().wallet;
      expect(state.transaction_loading).toBe(true);
      expect(state.transaction_error).toBeNull();
    });

    it('should handle fulfilled state and set transaction details', async () => {
      const mockResponse = { data: { id: 'trans1', amount: 250 } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchTransactionByID('trans1'));

      const state = store.getState().wallet;
      expect(state.transaction_loading).toBe(false);
      expect(state.transaction_error).toBeNull();
      expect(state.transactionDetails).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch transaction by ID';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchTransactionByID('trans1'));

      const state = store.getState().wallet;
      expect(state.transaction_loading).toBe(false);
      expect(state.transaction_error).toEqual(errorMessage);
      expect(state.transactionDetails).toBeNull();
    });
  });
});