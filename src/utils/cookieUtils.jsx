import Cookies from 'js-cookie';
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_COOKIE_SECRET;

// Set a cookie
export const setCookie = (key, value, options = {}) => {
  // Fallback to plain storage when no secret is configured.
  // This prevents auth flows from breaking in environments where VITE_COOKIE_SECRET is not set.
  if (!SECRET_KEY) {
    Cookies.set(key, value, options);
    return;
  }

  const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  Cookies.set(key, encrypted, options);
};

// Get a cookie
export const getCookie = (key) => {
  const storedValue = Cookies.get(key);
  if (!storedValue) return null;

  if (!SECRET_KEY) return storedValue;

  try {
    const bytes = CryptoJS.AES.decrypt(storedValue, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    // If decrypting fails because data was previously stored in plain text,
    // return the original value so existing sessions still work.
    return decrypted || storedValue;
  } catch {
    return storedValue;
  }
};

// Remove a cookie
export const removeCookie = (key) => {
  Cookies.remove(key);
};
