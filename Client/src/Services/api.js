import axios from "axios";
import { getToken, clearToken } from "./auth";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5001/api",
});

API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// An expired or revoked login sends the admin back to the login page
// instead of leaving the dashboard silently failing.
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url === "/auth/login";

    if (error.response?.status === 401 && getToken() && !isLoginRequest) {
      clearToken();
      window.location.assign("/admin/login");
    }

    return Promise.reject(error);
  },
);

export default API;
