/**
 * This file contains requests to the auth routes in the backend
 */

import api from '../../config/api';
import { API_AUTH_LOGIN } from '../../constants/urls';
import localStorageService from '../localStorage';

/**
 * Makes a POST request to the API's login endpoint.
 * @param {Object} credentials Object containing the keys: email and password
 * @returns An object with the following entries:
 *      - success: whether or not the login attempt was successful
 *      - data: user data returned from the API (may be empty), if success is true
 *      - errorResponse: a string with the error message, if success is false
 */
export const login = async (credentials) => {
    const result = {
        success: false,
        data: {},
        errorMessage: ""
    }
    try {
        const {data: responseObject} = await api.post(API_AUTH_LOGIN, credentials);
        
        if(responseObject.error) {
            result.errorMessage = responseObject.message;
        } else {
            result.success = true;
            
            result.data = responseObject.data || {};
            
            // Save token to localStorage
            const {accessToken, refreshToken} = responseObject;
            if(accessToken) {
                localStorageService.setAccessToken(accessToken);
            }
            if(refreshToken){
                localStorageService.setRefreshToken(refreshToken);
            }
        }
    } catch(error) {
        result.errorMessage = 'Found an unexpected error during the request';
    }

    return result;
}