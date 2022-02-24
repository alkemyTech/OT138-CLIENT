import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAILURE,
    AUTH_CHECK_REQUEST,
    AUTH_CHECK_SUCCESS,
    AUTH_CHECK_FAILURE
} from '../constants/actionTypes';
import {
    REQUEST_STATUS_NOT_FETCHED,
    REQUEST_STATUS_FETCHING,
    REQUEST_STATUS_SUCCESS,
    REQUEST_STATUS_FAILURE
} from '../constants/requests';

let initialState = {
    authenticated: false,
    requestStatus: REQUEST_STATUS_NOT_FETCHED,
    errors: [],
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...state,
                requestStatus: REQUEST_STATUS_FETCHING,
                errors: []
            }
        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                authenticated: false,
                requestStatus: REQUEST_STATUS_FAILURE,
                errors: action.payload
            }
        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                requestStatus: REQUEST_STATUS_SUCCESS,
                errors: []
            }
        case AUTH_LOGOUT_REQUEST:
            return {
                ...state,
                requestStatus: REQUEST_STATUS_FETCHING,
                errors: []
            }
        case AUTH_LOGOUT_FAILURE:
            return {
                ...state,
                requestStatus: REQUEST_STATUS_FAILURE,
                errors: action.payload
            }
        case AUTH_LOGOUT_SUCCESS:
            return {
                ...state,
                authenticated: false,
                requestStatus: REQUEST_STATUS_SUCCESS,
                errors: [],
            }
        case AUTH_CHECK_REQUEST:
            return {
                ...state,
                requestStatus: REQUEST_STATUS_FETCHING,
                errors: []
            }
        case AUTH_CHECK_FAILURE:
            return {
                ...state,
                authenticated: false,
                requestStatus: REQUEST_STATUS_FAILURE,
                errors: action.payload
            }
        case AUTH_CHECK_SUCCESS:
            return {
                ...state,
                authenticated: true,
                requestStatus: REQUEST_STATUS_SUCCESS,
                errors: [],
            }
        default:
            return state
    }
};