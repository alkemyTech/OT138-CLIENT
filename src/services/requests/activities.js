import api from "../../config/api";
import { createFormData } from "../../helpers";

export const getActivities = (limit, currentPage) =>
    api
        .get(`/activities${limit ? `/?limit=${limit}` : ""}&page=${currentPage}`)
        .then((res) => res);

export const getActivitiesById = (id) =>
    api.get(`/activities/${id}`).then((res) => res);

export const createActivity = async (data) => {

    return api.post(
        '/activities', 
        createFormData(data),
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res);
}

export const updateActivity = async (id, data) => {
    return api.put(
        `/activities/${id}`,
        createFormData(data),
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then((res) => res);
}

export const deleteActivity = async (id) => {
    return api.delete(`/activities/${id}`).then((res) => res);
}
