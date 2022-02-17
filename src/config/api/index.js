/**
 * This file exports an instance of axios configured to make requests to the backend.
 * Usage example: api.get('/users/1');
 */
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Add the JWT token to the Authorization header on each request
api.interceptors.request.use((config) => {
  const lsTokenKey = process.env.REACT_APP_LS_TOKEN || 'token';
  const bearerToken = localStorage.getItem(lsTokenKey);

  if(bearerToken) {
    config.headers.Authorization = `Bearer ${bearerToken}`;
  } else {
    delete api.defaults.headers.common.Authorization;
  }

  return config;
}, 
(err) => Promise.reject(err)
);

export default api;