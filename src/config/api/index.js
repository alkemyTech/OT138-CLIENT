/**
 * This file exports an instance of axios configured to make requests to the backend.
 * The fi
 * Usage example: api.get('/users/1');
 */
import axios from 'axios';

// Notify in case required env variables are not declared in environment file
(() => {
  if(typeof process.env.REACT_APP_API_URL === 'undefined') {
    console.warn('Variable REACT_APP_API_URL not defined in environment file');
  }
  if(typeof process.env.REACT_APP_LS_TOKEN === 'undefined') {
    console.warn('Variable REACT_APP_LS_TOKEN not defined in environment file');
  }
})();

// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

//Add the JWT token to the Authorization header on each request
api.interceptors.request.use((config) => {
  const bearerToken = localStorage.getItem(process.env.REACT_APP_LS_TOKEN);

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