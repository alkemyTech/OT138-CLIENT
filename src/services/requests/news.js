import api from "../../config/api";

export const getNew = async (id) => {
    return api.get(`/news/${id}`)
    .then( res => res );
};

export const createNew = async (data) => {
    return api.post(`/news`, {
        ...data
    })
    .then( res => res );
}

export const updateNew = async (id, data) => {
    return api.put(`/news/${id}`, {
        ...data
    })
    .then( res => res)
}