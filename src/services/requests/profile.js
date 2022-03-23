import api from "../../config/api";
import { createFormData } from "../../helpers";

/*export const getProfileData = async (id) => {
    return api.get(`users/${id}`)
};*/

export const saveProfileData = async (data) => {
    return api.put(
        `/auth/account`, 
        createFormData(data),
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then( res => res);
};

export const deleteProfile = async () => {
    return api.delete(`auth/account`).then( res => res);
};

export const getProfileByAdmin = async (id) => {
    return api.get(`users/${id}`).then( res => res);
}

export const updateProfileByAdmin = async(data) => {
    return api.put(`users/${data.id}`, data).then(res => res);
}