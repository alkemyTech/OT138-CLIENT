/**
 * This file contains requests to the auth routes in the backend
 */

import api from "../../config/api";
import {
  API_AUTH_LOGIN,
  API_AUTH_LOGOUT,
  API_AUTH_GET_PROFILE_DATA,
  API_AUTH_CHECK,
  API_AUTH_REGISTER,
} from "../../constants/urls";
import { apiErrors } from "../../constants";
import localStorageService from "../localStorage";
import toast from "react-hot-toast";

/**
 * Makes a POST request to the API's register endpoint.
 * @param {Object} userInfo Object containing the properties: firstName, lastName, email, password
 * @returns An object with the following entries:
 *      - success: whether or not the register attempt was successful
 *      - data: user data returned from the API (may be empty), if success is true
 *      - errorMessage: a string with the error message, if success is false
 *      - errorFields: object containing the fields that failed validation
 */
export const register = async (userInfo) => {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
    errorFields: {},
  };
  try {
    const { data: responseObject } = await api.post(
      API_AUTH_REGISTER,
      userInfo
    );

    if (responseObject.error) {
      result.errorMessage =
        apiErrors[responseObject.errorCode] ?? responseObject.message;
      if (responseObject.errorCode === "VAL001") {
        result.errorFields = responseObject.errorFields;
      }
    } else {
      result.success = true;
      result.data = responseObject.result || {};
    }
  } catch (error) {
    result.errorMessage = "Error inesperado";
  }

  return result;
};

/**
 * Makes a POST request to the API's login endpoint.
 * @param {Object} credentials Object containing the keys: email and password
 * @returns An object with the following entries:
 *      - success: whether or not the login attempt was successful
 *      - data: user data returned from the API (may be empty), if success is true
 *      - errorMessage: a string with the error message, if success is false
 *      - errorFields: object containing the fields that failed validation
 */
export const login = async (credentials) => {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
    errorFields: {},
  };
  try {
    const { data: responseObject } = await api.post(
      API_AUTH_LOGIN,
      credentials
    );

    if (responseObject.error) {
      result.errorMessage =
        apiErrors[responseObject.errorCode] ?? responseObject.message;
      if (responseObject.errorCode === "VAL001") {
        result.errorFields = responseObject.errorFields;
      }
      toast.error(result.errorMessage);
    } else {
      result.success = true;
      result.data = responseObject.result.user || {};

      // Save token to localStorage
      const { accessToken } = responseObject.result;
      if (accessToken) {
        localStorageService.setAccessToken(accessToken);
      }
    }
  } catch (error) {
    result.errorMessage = "Error inesperado";
    toast.error(result.errorMessage);
  }

  return result;
};

/**
 * Makes a POST request to the API's logout endpoint.
 * @returns An object with the following entries:
 *      - success: whether or not the logout attempt was successful
 *      - errorMessage: a string with the error message, if success is false
 */
export const logout = async () => {
  const result = {
    success: false,
    errorMessage: "",
  };
  try {
    const { data: responseObject } = await api.post(API_AUTH_LOGOUT);

    if (responseObject.error) {
      result.errorMessage =
        apiErrors[responseObject.errorCode] ?? responseObject.message;
      toast.error(result.errorMessage);
    } else {
      result.success = true;
    }
  } catch (error) {
    result.errorMessage = "Error inesperado";
    toast.error(result.errorMessage);
  }
  /* Remove Access Token from Local Storage */
  localStorageService.removeAccessToken();

  return result;
};

/**
 * Makes a GET request to the API's profile endpoint.
 * @returns An object with the following entries:
 *      - success: whether or not the request was successful
 *      - errorMessage: a string with the error message, if success is false
 *      - data: user data object
 */
export const getProfileData = async () => {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
  };

  try {
    const { data: responseObject } = await api.get(API_AUTH_GET_PROFILE_DATA);
    if (responseObject.error) {
      result.errorMessage =
        apiErrors[responseObject.errorCode] ?? responseObject.message;
    } else {
      result.success = true;
      result.data = responseObject.result;
    }
  } catch (error) {
    result.errorMessage = "Error inesperado";
  }

  return result;
};

/**
 * Checks if the user is authenticated in the backend.
 * @returns An object with the following entries:
 *      - success: true if the request succeeded without errors, false otherwise
 *      - data: user data returned from the API (may be empty), if success is true
 *      - errorMessage: a string with the error message, if success is false
 */
export const checkAuthentication = async () => {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
  };

  try {
    const { data: responseObject } = await api.post(API_AUTH_CHECK);
    if (responseObject.error) {
      result.errorMessage =
        apiErrors[responseObject.errorCode] ?? responseObject.message;
      localStorageService.removeAccessToken();
    } else {
      result.success = true;
      result.data = responseObject.result || {};
    }
  } catch (error) {
    localStorageService.removeAccessToken();
    result.errorMessage = "Error inesperado";
  }

  return result;
};
