/**
 * This file exports an instance of axios configured to make requests to the backend.
 * Usage example: api.get('/relative/url');
 */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Add the jwt token to the authorization header on each request
 */
api.interceptors.request.use((config) => {
  const bearerToken = localStorage.getItem(process.env.REACT_APP_LS_TOKEN || 'token');    // Retrieve token from localStorage

  if(bearerToken) {
      config.headers.Authorization = `Bearer ${bearerToken}`;   // Attach token to Authorization header
  } else {
      delete api.defaults.headers.common.Authorization;   // Delete header otherwise
  }

  return config;
}, 
(err) => Promise.reject(err)
);

export default api;