import axios from 'axios';
import { getCookie } from '@/utils/cookieUtils';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_API_BASE_URL

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const NETWORK_TOAST_KEY = 'last-network-toast';
const NETWORK_TOAST_COOLDOWN_MS = 10000; // 10 seconds

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      const lastToastTime = Number(sessionStorage.getItem(NETWORK_TOAST_KEY)) || 0;
      const now = Date.now();

      if (now - lastToastTime > NETWORK_TOAST_COOLDOWN_MS) {
        sessionStorage.setItem(NETWORK_TOAST_KEY, now.toString());

        toast.error('Network error. Please check your internet connection.', {
          toastId: 'network-error',
        });
      }

    } else {
      const status = error.response.status;
      const message = error.response?.data?.message || 'An error occurred';

      if (status === 401) {
        toast.error('Session expired. Please log in again.', {
          toastId: 'unauthorized-error',
        });
      } else {
        toast.error(message, {
          toastId: `api-error-${status}`,
        });
      }
    }

    return Promise.reject(error);
  }
);

export default api;
