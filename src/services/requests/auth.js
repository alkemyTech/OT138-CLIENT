/**
 * This file contains requests to the auth routes in the backend
 */

import api from '../../config/api';
import { 
    API_AUTH_LOGIN, 
    API_AUTH_LOGOUT, 
    API_AUTH_GET_PROFILE_DATA,
    API_AUTH_CHECK
} from '../../constants/urls';
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

/**
 * Makes a POST request to the API's logout endpoint.
 * @returns An object with the following entries:
 *      - success: whether or not the logout attempt was successful
 *      - errorResponse: a string with the error message, if success is false
 */
 export const logout = async () => {
    const result = {
        success: false,
        errorMessage: ""
    }
    try {
        const {data: responseObject} = await api.post(API_AUTH_LOGOUT);
        
        if(responseObject.error) {
            result.errorMessage = responseObject.message;
        } else {
            result.success = true;
            localStorageService.removeAccessToken();
            localStorageService.removeRefreshToken();
        }
    } catch(error) {
        result.errorMessage = 'Found an unexpected error during the request';
    }

    return result;
}

/**
 * Makes a GET request to the API's profile endpoint.
 * @returns An object with the following entries:
 *      - success: whether or not the request was successful
 *      - errorResponse: a string with the error message, if success is false
 *      - data: user data object
 */
export const getProfileData = async () => {
    const result = {
        success: false,
        data: {},
        errorMessage: ''
    }

    try{
        const{data: responseObject} = await api.get(API_AUTH_GET_PROFILE_DATA);
        if(responseObject.error){
            result.errorMessage = responseObject.message;
        } else{
            result.success = true;
            result.data = responseObject.user;
        }
    } catch(error){
        console.log(await error);
        result.errorMessage = 'Found and unexpected error during the request';
    }

    return result;
}

/**
 * Checks if the user is authenticated in the backend.
 * @returns An object with the following entries:
 *      - success: true if the request succeeded without errors, false otherwise
 *      - data: a boolean value, true if the user is authenticated, false otherwise
 *      - errorMessage: a string with the error message, if success is false
 */
export const checkAuthentication = async () => {
    const result = {
        success: false,
        data: false,
        errorMessage: ''
    }

    try{
        const{data: responseObject} = await api.post(API_AUTH_CHECK);
        if(responseObject.error){
            result.errorMessage = responseObject.message;
        } else{
            result.success = true;
            result.data = true;
        }
    } catch(error){
        console.log(await error);
        result.errorMessage = 'Found and unexpected error during the request';
    }

    return result;
}