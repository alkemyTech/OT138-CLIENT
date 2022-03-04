import api from "../../config/api";
import { API_CONTACTS } from '../../constants/urls';

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
        errorMessage: ''
    };
    try {
        const { data: resObj } = await api.get(`${API_CONTACTS}?page=${page}&limit=${limit}`);
        if (resObj.error === false) {
            result.success = true;
            result.data = resObj.result;
        } else {
            result.errorMessage = resObj.message;
        }
    } catch (err) {
        result.errorMessage = 'Unexpected error during fetching';
    }

    return result;
}