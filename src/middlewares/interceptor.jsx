import axios from 'axios';
import CryptoJS from 'crypto-js';
import { getCookie, removeCookie } from '@/utils/cookieUtils';
import { toast } from 'sonner';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Single env-var toggle — set VITE_ENABLE_API_ENCRYPTION=false in .env to disable.
// Defaults to true if the variable is missing so production stays encrypted.
const IS_ENCRYPTION_ENABLED =
  String(import.meta.env.VITE_ENABLE_API_ENCRYPTION ?? 'true').toLowerCase() !== 'false';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Encrypts a plain JS payload into the envelope expected by the backend.
 * A new AES key+IV is generated per request so encrypted bodies are never identical.
 */
function encryptJson(data) {
  const key = CryptoJS.lib.WordArray.random(32); // 256-bit key
  const iv = CryptoJS.lib.WordArray.random(16); // 128-bit IV

  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(data), key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return {
    vi: key.toString(CryptoJS.enc.Hex),
    iv: iv.toString(CryptoJS.enc.Hex),
    content: encrypted.toString(),
  };
}

/**
 * Decrypts an encrypted backend envelope back to a JS payload.
 */
function decryptJson({ vi, iv, content }) {
  const keyWords = CryptoJS.enc.Hex.parse(vi);
  const ivWords = CryptoJS.enc.Hex.parse(iv);

  const decrypted = CryptoJS.AES.decrypt(content, keyWords, {
    iv: ivWords,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}

function isEncryptedEnvelope(data) {
  return (
    data !== null &&
    typeof data === 'object' &&
    typeof data.vi === 'string' &&
    typeof data.iv === 'string' &&
    typeof data.content === 'string'
  );
}

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = getCookie('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const method = (config.method || '').toLowerCase();
    const methodsWithBody = ['post', 'put', 'patch', 'delete'];
    const isMultipart = typeof FormData !== 'undefined' && config.data instanceof FormData;

    // Encrypt JSON request bodies when enabled globally.
    // Opt out per-request with { skipEncryption: true } (e.g. login, file uploads).
    if (
      IS_ENCRYPTION_ENABLED &&
      methodsWithBody.includes(method) &&
      config.data &&
      !config.skipEncryption &&
      !isMultipart
    ) {
      config.data = encryptJson(config.data);
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
  (response) => {
    // Decrypt response when enabled and the payload looks like an encrypted envelope.
    if (IS_ENCRYPTION_ENABLED && isEncryptedEnvelope(response.data)) {
      try {
        response.data = decryptJson(response.data);
      } catch (decryptionError) {
        console.error('[api] Failed to decrypt success response', decryptionError);
      }
    }
    return response;
  },
  (error) => {
    // Also try to decrypt error response bodies so error messages surface correctly.
    if (IS_ENCRYPTION_ENABLED && error?.response?.data && isEncryptedEnvelope(error.response.data)) {
      try {
        error.response.data = decryptJson(error.response.data);
      } catch (decryptionError) {
        console.error('[api] Failed to decrypt error response', decryptionError);
      }
    }

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
      const lowerMessage = String(message).toLowerCase();

      if (status === 401 && (lowerMessage.includes('jwt') || lowerMessage.includes('token'))) {
        removeCookie('token');
        removeCookie('user');
        toast.error(message, {
          toastId: 'unauthorized-error',
        });
      } else if (status === 401) {
        toast.error(message, {
          toastId: 'unauthorized-error',
        });
      } else if (status === 406 && message.includes('duplicate')) {
        toast.error('This email is already registered. Try logging in instead.', {
          toastId: 'duplicate-error',
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
