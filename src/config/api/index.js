/**
 * This file exports an instance of axios configured to make requests to the backend.
 * The fi
 * Usage example: api.get('/users/1');
 */
import axios from 'axios';
import localStorageService from '../../services/localStorage';
import { API_AUTH_REFRESH } from '../../constants/urls';

// Notify in case required env variables are not declared in environment file
(() => {
    if (typeof process.env.REACT_APP_API_URL === 'undefined') {
        console.warn('Variable REACT_APP_API_URL not defined in environment file');
    }
})();

const axiosConfig = {
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
};

// Create axios instance
const api = axios.create(axiosConfig);

//Add the JWT token to the Authorization header on each request
api.interceptors.request.use((config) => {
    const bearerToken = localStorageService.getAccessToken();

    if (bearerToken) {
        config.headers.Authorization = `Bearer ${bearerToken}`;
    } else {
        delete api.defaults.headers.common.Authorization;
    }

    return config;
},
    (err) => Promise.reject(err)
);

api.interceptors.response.use(async (response) => {
    // If access token has expired, call the refresh endpoint
    if(response.data.error === true && response.data.errorCode === 'AUT003') {
        const refreshToken = localStorageService.getRefreshToken();
        try {
            const res = await axios.post(API_AUTH_REFRESH, {refreshToken}, axiosConfig);
            const newToken = res.data.accessToken;
            localStorageService.setAccessToken(newToken);
            
            const updatedConfig = {
                ...response.config,
                headers: {
                    ...response.config.headers,
                    Authorization: `Bearer ${newToken}`
                }
            };
            
            return axios.request(updatedConfig);
        } catch(err) {}
        return Promise.reject();
    }
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default api;