import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://livzz-backend.azurewebsites.net';

export const getAuthToken = () => {
  const storedToken = localStorage.getItem('token');
  if (storedToken && storedToken !== 'true') {
    return storedToken;
  }
  return null;
};

export const getAuthHeaders = (customHeaders = {}) => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Token ${token}` } : {}),
    ...customHeaders,
  };
};

export const getAuthHeadersForForm = (customHeaders = {}) => {
  const token = getAuthToken();
  return {
    ...(token ? { Authorization: `Token ${token}` } : {}),
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
