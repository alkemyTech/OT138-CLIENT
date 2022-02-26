import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
  AUTH_CHECK_REQUEST,
  AUTH_CHECK_SUCCESS,
  AUTH_CHECK_FAILURE,
} from "../constants/actionTypes";

let initialState = {
  authenticated: false,
  isFetching: false,
  failure: false,
  errors: [],
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        failure: false,
        errors: [],
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        failure: true,
        errors: action.payload,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        isFetching: false,
        failure: false,
        errors: [],
      };
    case AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        failure: false,
        errors: [],
      };
    case AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        failure: true,
        errors: action.payload,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        authenticated: false,
        isFetching: false,
        failure: false,
        errors: [],
      };
    case AUTH_CHECK_REQUEST:
      return {
        ...state,
        isFetching: true,
        failure: false,
        errors: [],
      };
    case AUTH_CHECK_FAILURE:
      return {
        ...state,
        isFetching: false,
        failure: true,
        errors: action.payload,
      };
    case AUTH_CHECK_SUCCESS:
      return {
        authenticated: true,
        isFetching: false,
        failure: false,
        errors: [],
      };
    default:
      return state;
  }
}
