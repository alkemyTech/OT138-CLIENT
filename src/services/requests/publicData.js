import api from "../../config/api";
import { API_PUBLIC_DATA } from "../../constants/urls";

/**
 * Makes a GET request to the API's Public Organization Data endpoint.
 * @returns An object with the following entries:
 *      - success: whether or not the login attempt was successful
 *      - data: user data returned from the API, if success is true
 *      - errorResponse: a string with the error message, if success is false
 */
export async function getPublicData() {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
  };
  try {
    const { data: response } = await api.get(API_PUBLIC_DATA);
    if (response.error) {
      result.errorMessage = response.message;
    } else {
      result.success = true;
      result.data = response;
    }
  } catch (error) {
    console.log(error);
    result.errorMessage = "Found an unexpected error during the request";
  }
  return result;
}

export async function updatePublicData(organizationData) {
  try {
    const { data: response } = await api.put(API_PUBLIC_DATA, organizationData);
    return response;
  } catch (error) {
    console.log(error);
    return {
      error: true,
      errorCode: "SRV001",
      status: "500",
      message: `An unexpected error ocurred when storing data to the database. Details:  ${error.message}`,
    };
  }
}
