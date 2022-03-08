import api from "../../config/api";
import { API_CONTACTS } from "../../constants/urls";

export const createContact = async (contact) => {
  try {
    const response = await api.post(API_CONTACTS, contact);
    if (response.data.error === undefined)
      throw new Error("Incorrect response form server");
    return response.data;
  } catch (error) {
    return {
      error: true,
      errorCode: "REQ001",
      status: "404",
      message: `Unexpected error during fetching: ${error.message}`,
    };
  }
};

/**
 * Fetches all contacts from the backend
 * @returns An object with the following entries:
 *      - success: true if the request succeeded without errors, false otherwise
 *      - data: array of contacts returned from the API (may be empty), if success is true
 *      - errorMessage: a string with the error message, if success is false
 */
export async function getContacts(page = 1, limit = 10) {
  const result = {
    success: false,
    data: [],
    errorMessage: "",
  };
  try {
    const { data: resObj } = await api.get(
      `${API_CONTACTS}?page=${page}&limit=${limit}`
    );
    if (resObj.error === false) {
      result.success = true;
      result.data = resObj.result;
    } else {
      result.errorMessage = resObj.message;
    }
  } catch (err) {
    result.errorMessage = "Unexpected error during fetching";
  }

  return result;
}
