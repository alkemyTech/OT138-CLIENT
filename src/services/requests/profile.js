import api from "../../config/api";

export const getProfileData = async (id) => {
    return api.get(`users/${id}`)
};

export const saveProfileData = async (data) => {
    return api.put(`/users/${data.id}`, data).then( res => res);
};

export const deleteProfile = async (id) => {
    return api.delete(`users/${id}`).then( res => res);
};

export const getProfileByAdmin = async (id) => {
    return api.get(`users/${id}`).then( res => res);
}

export const updateProfileByAdmin = async(data) => {
    return api.put(`users/protected/${data.id}`, data).then(res => res);
}