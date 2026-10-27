import { vi } from 'vitest';

// Mock the API interceptor module
vi.mock('@/middlewares/interceptor', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    },
  };
});

// Mock the axios library
vi.mock('axios', () => {
  return {
    default: {
      get: vi.fn(),
      post: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
    },
  };
});
