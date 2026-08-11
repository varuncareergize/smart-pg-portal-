import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://smart-pg-backend.onrender.com';
export const AUTH_TOKEN = '6288a3edf900378478ea833b695615e6d4c8dd71';

export const getAuthToken = () => {
  const storedToken = localStorage.getItem('token');
  if (storedToken && storedToken !== 'true') {
    return storedToken;
  }
  return AUTH_TOKEN;
};

export const getAuthHeaders = (customHeaders = {}) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Token ${getAuthToken()}`,
    ...customHeaders,
  };
};

export const getAuthHeadersForForm = (customHeaders = {}) => {
  return {
    Authorization: `Token ${getAuthToken()}`,
    ...customHeaders,
  };
};

export const apiFetch = async (path, options = {}) => {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path}`;
  const headers = getAuthHeaders(options.headers || {});

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  return fetch(url, {
    ...options,
    headers,
  });
};

const apiAxios = axios.create({
  baseURL: BASE_URL,
});

apiAxios.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiAxios;
