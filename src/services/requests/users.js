import api from "../../config/api";
import { API_USERS } from '../../constants/urls';

export async function getUsers() {
    const result = {
        success: false,
        data: [],
        errorMessage: ''
    };
    try {
        const { data: resObj } = await api.get(API_USERS);
        if(resObj.error === false) {
            result.success = true;
            result.data = resObj.result;
        } else {
            result.errorMessage = resObj.message;
        }
    } catch(err) {
        result.errorMessage = 'Unexpected error during fetching';
    }

    return result;
}