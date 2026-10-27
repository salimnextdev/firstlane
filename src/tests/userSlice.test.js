import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import userReducer, { fetchNotifications, markAllAsRead } from '@/modules/auth/state/userSlice';
import api from '@/middlewares/interceptor';

vi.mock('@/middlewares/interceptor');

describe('userSlice', () => {
    let store;

    beforeEach(() => {
        store = configureStore({
            reducer: {
                user: userReducer,
            },
        });
    });

    describe('fetchNotifications Thunk', () => {
        it('should handle successful notification fetching', async () => {
            const mockResponse = {
                data: [
                    { id: '1', title: 'Notification 1' },
                    { id: '2', title: 'Notification 2' },
                ],
                metadata: { totalCount: 2, currentPage: 1 },
            };
            api.get.mockResolvedValue({ data: mockResponse });

            await store.dispatch(fetchNotifications({ key: 'userID', value: '123' }));

            // Assert that the state is updated correctly
            const state = store.getState().user;
            expect(state.loading).toBe(false);
            expect(state.error).toBeNull();
            expect(state.notifications).toEqual(mockResponse.data);
            expect(state.metaData).toEqual(mockResponse.metadata);
        });

        it('should handle failed notification fetching', async () => {
            const errorMessage = 'Network Error';
            api.get.mockRejectedValue({ response: { data: errorMessage } });

            await store.dispatch(fetchNotifications({ key: 'userID', value: '123' }));

            // Assert that the state reflects the error
            const state = store.getState().user;
            expect(state.loading).toBe(false);
            expect(state.error).toEqual(errorMessage);
            expect(state.notifications).toEqual([]); // Ensure notifications are not updated
        });

        it('should handle pending state correctly', () => {
            store.dispatch(fetchNotifications({ key: 'userID', value: '123' }));
            const state = store.getState().user;
            expect(state.loading).toBe(true);
            expect(state.error).toBeNull();
        });
    });

    // Test the async thunk for marking notifications as read
    describe('markAllAsRead Thunk', () => {
        it('should handle a successful "mark all as read" request', async () => {
            const mockResponse = { message: 'Notifications marked as read' };
            api.patch.mockResolvedValue({ data: mockResponse });

            await store.dispatch(markAllAsRead());

            // Assert that the API call was made correctly
            expect(api.patch).toHaveBeenCalledWith(
                expect.stringContaining('/users/notification/mark-all-as-read'),
                {}
            );
        });

        it('should handle a failed "mark all as read" request', async () => {
            const errorMessage = 'Server Error';
            api.patch.mockRejectedValue({ response: { data: errorMessage } });

            const result = await store.dispatch(markAllAsRead());

            // Assert that the thunk's returned value is the rejected message
            expect(result.payload).toEqual(errorMessage);
        });
    });
});