import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAILURE
} from '../constants/actionTypes';
import { 
    login as loginRequest,
    logout as logoutRequest
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