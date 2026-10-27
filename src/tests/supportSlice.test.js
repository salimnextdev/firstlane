import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { default as api } from '@/middlewares/interceptor';
import {
  supportSlice,
  addSupport,
  fetchSupports,
  fetchSupportConversations,
  fetchSupportByID,
  deleteSupport
} from '@/modules/support/state/supportSlice';

vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      delete: vi.fn(),
    },
  };
});

describe('supportSlice', () => {
  let store;
  const initialState = supportSlice.getInitialState();

  beforeEach(() => {
    store = configureStore({
      reducer: {
        support: supportSlice.reducer,
      },
    });
    vi.clearAllMocks();
  });

  describe('fetchSupports thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchSupports.pending());

      const state = store.getState().support;
      expect(state.loading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('should handle fulfilled state and set supports and metadata', async () => {
      const mockResponse = { data: [{ id: '1', subject: 'Issue 1' }], metadata: { total: 1 } };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchSupports({ key: 'user', value: 'user123' }));

      const state = store.getState().support;
      expect(state.loading).toBe(false);
      expect(state.error).toBeNull();
      expect(state.supports).toEqual(mockResponse.data);
      expect(state.metaData).toEqual(mockResponse.metadata);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch supports';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchSupports({ key: 'user', value: 'user123' }));

      const state = store.getState().support;
      expect(state.loading).toBe(false);
      expect(state.error).toEqual(errorMessage);
      expect(state.supports).toEqual(initialState.supports);
    });
  });

  describe('fetchSupportConversations thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchSupportConversations.pending());

      const state = store.getState().support;
      expect(state.support_loading).toBe(true);
      expect(state.support_error).toBeNull();
    });

    it('should handle fulfilled state and set conversations', async () => {
      const mockResponse = { data: [{ id: 'conv1', text: 'Hello' }] };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchSupportConversations('support123'));

      const state = store.getState().support;
      expect(state.support_loading).toBe(false);
      expect(state.support_error).toBeNull();
      expect(state.supportConversations).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch conversations';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchSupportConversations('support123'));

      const state = store.getState().support;
      expect(state.support_loading).toBe(false);
      expect(state.support_error).toEqual(errorMessage);
      expect(state.supportConversations).toEqual(initialState.supportConversations);
    });
  });

  describe('fetchSupportByID thunk', () => {
    it('should handle pending state correctly', () => {
      store.dispatch(fetchSupportByID.pending());

      const state = store.getState().support;
      expect(state.support_loading).toBe(true);
      expect(state.support_error).toBeNull();
    });

    it('should handle fulfilled state and set support details', async () => {
      const mockResponse = { data: [{ id: '1', subject: 'Issue 1' }] };
      api.get.mockResolvedValue({ data: mockResponse });

      await store.dispatch(fetchSupportByID({ key: 'id', value: '1' }));

      const state = store.getState().support;
      expect(state.support_loading).toBe(false);
      expect(state.support_error).toBeNull();
      expect(state.supportDetails).toEqual(mockResponse.data);
    });

    it('should handle rejected state and set the error', async () => {
      const errorMessage = 'Failed to fetch support by ID';
      api.get.mockRejectedValue({ response: { data: errorMessage } });

      await store.dispatch(fetchSupportByID({ key: 'id', value: '1' }));

      const state = store.getState().support;
      expect(state.support_loading).toBe(false);
      expect(state.support_error).toEqual(errorMessage);
      expect(state.supportDetails).toEqual(initialState.supportDetails);
    });
  });
});
