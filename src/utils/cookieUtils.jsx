import Cookies from 'js-cookie';
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_COOKIE_SECRET;

// Set a cookie
export const setCookie = (key, value, options = {}) => {
  const encrypted = CryptoJS.AES.encrypt(value, SECRET_KEY).toString();
  Cookies.set(key, encrypted, options);
};

// Get a cookie
export const getCookie = (key) => {
  const encrypted = Cookies.get(key);
  if (!encrypted) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return decrypted;
  } catch {
    return null;
  }
};

// Remove a cookie
export const removeCookie = (key) => {
  Cookies.remove(key);
};
