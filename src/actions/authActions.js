import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAILURE,
    AUTH_GET_PROFILE_DATA_REQUEST,
    AUTH_GET_PROFILE_DATA_SUCCESS,
    AUTH_GET_PROFILE_DATA_FAILURE,
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAILURE,
} from '../constants/actionTypes';
import { API_AUTH_GET_PROFILE_DATA } from '../constants/urls';
import { 
    login as loginRequest,
    logout as logoutRequest,
    getProfileData as getProfileDataRequest,
    checkAuthentication as checkAuthenticationRequest,
} from '../services/requests/auth';


/**
 * Authenticates the user with the given credentials and updates auth state accordingly.
 * @param {Object} credentials Object containing email and password keys
 * @returns dispatch function
 */
export const login = (credentials) => {
    return async (dispatch) => {
        dispatch({ type: AUTH_LOGIN_REQUEST });

        const {success, data, errorMessage} = await loginRequest(credentials);

        if(success) {
            return dispatch({type: AUTH_LOGIN_SUCCESS});
        } else {
            return dispatch({type: AUTH_LOGIN_FAILURE, payload: [errorMessage]});
        }
    };
};

/**
 * Signs out the authenticated user and updates auth state accordingly.
 * @returns dispatch function
 */
 export const logout = () => {
    return async (dispatch) => {
        dispatch({ type: AUTH_LOGOUT_REQUEST });

        const {success, errorMessage} = await logoutRequest();

        if(success) {
            return dispatch({type: AUTH_LOGOUT_SUCCESS});
        } else {
            return dispatch({type: AUTH_LOGOUT_FAILURE, payload: [errorMessage]});
        }
    };
};

export const getProfileData = () => {
    return async (dispatch) => {
        dispatch({ type: API_AUTH_GET_PROFILE_DATA });

        const { success, errorMessage, data: user } = await getProfileDataRequest();

        if(success) {
            return dispatch({ type: AUTH_GET_PROFILE_DATA_SUCCESS, payload: {success, user}});
        } else {
            return dispatch({ type: AUTH_GET_PROFILE_DATA_FAILURE, payload: [errorMessage]})
        }
    }
}

/**
 * Checks if the user is authenticated and updates the auth state
 * @returns dispatch function
 */
 export const checkAuthentication = () => {
    return async (dispatch) => {
        dispatch({ type: AUTH_CHECK_REQUEST });

        const {success, data: isAuthenticated, errorMessage} = await checkAuthenticationRequest();

        if(success && isAuthenticated) {
            return dispatch({type: AUTH_CHECK_SUCCESS});
        } else {
            return dispatch({type: AUTH_CHECK_FAILURE, payload: [errorMessage]});
        }
    };
};