import api from "../../config/api";
import { API_CATEGORIES } from '../../constants/urls';

export async function getCategories() {
    const result = {
        success: false,
        data: [],
        errorMessage: ''
    };
    try {
        const { data: resObj } = await api.get(API_CATEGORIES);
        if(resObj.error === false) {
            result.success = true;
            result.data = resObj.data;
        } else {
            result.errorMessage = resObj.message;
        }
    } catch(err) {
        result.errorMessage = 'Unexpected error during fetching';
    }

    return result;
}