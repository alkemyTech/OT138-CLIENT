import {
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT_REQUEST,
    AUTH_LOGOUT_SUCCESS,
    AUTH_LOGOUT_FAILURE
} from '../constants/actionTypes';

let initialState = {
    user: {},
    authenticated: false,
    isFetching: false,
    failure: false,
    errors: [],
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_LOGIN_REQUEST:
            return {
                ...initialState,
                isFetching: true
            }
        case AUTH_LOGIN_FAILURE:
            return {
                ...initialState,
                failure: true,
                errors: action.payload
            }
        case AUTH_LOGIN_SUCCESS:
            return {
                ...initialState,
                user: action.payload,
                authenticated: true,
            }
        case AUTH_LOGOUT_REQUEST:
            return {
                ...initialState,
                isFetching: true
            }
        case AUTH_LOGOUT_FAILURE:
            return {
                ...initialState,
                failure: true,
                errors: action.payload
            }
        case AUTH_LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        default:
            return state
    }
};