import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:5000/api'; // Adjust backend URL as needed

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors and token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean } | undefined;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt token refresh
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, { refreshToken });
          const { token: newToken } = response.data;
          localStorage.setItem('token', newToken);
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
          }
          return api(originalRequest);
        }
      } catch (refreshError) {
        toast.error('Session expired. Please login again.');
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    interface ErrorResponse {
      message?: string;
    }
    const data = error.response?.data as ErrorResponse | undefined;
    toast.error(data?.message || error.message || 'API request failed');
    return Promise.reject(error);
  }
);

// Helper function to wrap API calls with loading and retry logic
export async function callApi<T>(apiCall: () => Promise<AxiosResponse<T>>, retries = 3): Promise<T> {
  let attempts = 0;
  while (attempts < retries) {
    try {
      // Show loading spinner (implement your own UI logic)
      // e.g. setLoading(true);
      const response = await apiCall();
      // e.g. setLoading(false);
      return response.data;
    } catch (error) {
      attempts++;
      if (attempts >= retries) {
        // e.g. setLoading(false);
        throw error;
      }
      // Wait before retrying
      await new Promise(res => setTimeout(res, 1000 * attempts));
    }
  }
  throw new Error('API call failed after retries');
}

export default api;
