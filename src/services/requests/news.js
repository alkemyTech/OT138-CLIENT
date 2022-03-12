import api from "../../config/api";
import { API_NEWS } from "../../constants/urls";
import { apiErrors } from '../../constants';

export const getAllNews = async (page = 1, limit = 10) => {
    const result = {
        success: false,
        errorMessage: '',
        data: []
    };

    try {
        const { data: resObj } = await api.get(`${API_NEWS}?page=${page}&limit=${limit}`);
        if (resObj.error) {
            result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al obtener novedades';
        } else {
            result.success = true;
            result.data = resObj.result;
        }
    } catch (err) {
        result.errorMessage = 'Error al obtener novedades';
    }

    return result;
}

export const deleteEntry = async (id) => {
    const result = {
        success: false,
        errorMessage: ''
    };

    try {
        const { data: resObj } = await api.delete(`${API_NEWS}/${id}`);
        if (resObj.error) {
            result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al eliminar entrada';
        } else {
            result.success = true;
        }
    } catch (err) {
        result.errorMessage = 'Error al eliminar entrada';
    }

    return result;
}

export const getNews = (limit, currentPage) =>
    api
        .get(`/news${limit ? `/?limit=${limit}` : ""}&page=${currentPage}`)
        .then((res) => res);

export const getNewsById = (id) => api.get(`/news/${id}`).then((res) => res);

export const getNew = async (id) => {
    return api.get(`/news/${id}`).then((res) => res);
};

export const createNew = async (data) => {
    return api
        .post(`/news`, {
            ...data,
        })
        .then((res) => res);
};

export const updateNew = async (id, data) => {
    return api
        .put(`/news/${id}`, {
            ...data,
        })
        .then((res) => res);
};
