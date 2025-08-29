// src/api.js
import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL || "";

if (!API_BASE) {
  console.warn("VITE_API_URL is missing; set it in Netlify Environment.");
}

export const client = axios.create({
  baseURL: API_BASE,      // all requests go to your backend
  withCredentials: true,  // keep true if you use cookies
  timeout: 15000,
});

// Optional: simple error log (remove later if noisy)
client.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("API error:", err?.response?.status, err?.response?.data || err?.message);
    throw err;
  }
);

export const setAuthToken = (token) => {
  if (token) client.defaults.headers.common.Authorization = `Bearer ${token}`;
  else delete client.defaults.headers.common.Authorization;
};
