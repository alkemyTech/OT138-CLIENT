import api from "../../config/api";
import { API_CATEGORIES } from '../../constants/urls';

/**
 * Fetches all categories from the backend
 * @returns An object with the following entries:
 *      - success: true if the request succeeded without errors, false otherwise
 *      - data: array of categories returned from the API (may be empty), if success is true
 *      - errorMessage: a string with the error message, if success is false
 */
export async function getCategories() {
    const result = {
        success: false,
        data: [],
        errorMessage: ''
    };
    try {
        const { data: resObj } = await api.get(API_CATEGORIES);
        if (resObj.error === false) {
            result.success = true;
            result.data = resObj.data;
        } else {
            result.errorMessage = resObj.message;
        }
    } catch (err) {
        result.errorMessage = 'Unexpected error during fetching';
    }

    return result;
}

/**
 * Removes a category given its id
 * @param {Number} categoryId Numeric id of the category to be deleted
 * @returns An object with the following entries:
 *      - success: true if the request succeeded without errors, false otherwise
 *      - errorMessage: a string with the error message, if success is false
 */
export async function deleteCategory(categoryId) {
    const result = {
        success: false,
        errorMessage: ''
    };
    try {
        const { data: resObj } = await api.delete(`${API_CATEGORIES}/${categoryId}`);
        if (resObj.error === false) {
            result.success = true;
        } else {
            result.errorMessage = resObj.message;
        }
    } catch (err) {
        result.errorMessage = 'Unexpected error during fetching';
    }

    return result;
}