import api from "../../config/api";
import { API_NEWS } from "../../constants/urls";
import { apiErrors } from '../../constants';
import { createFormData } from '../../helpers';

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

export const createNewsEntry = async (data) => {
    const result = {
        success: false,
        errorMessage: '',
        data: {}
    };

    try {
        const { data: resObj } = await api.post(
            API_NEWS, 
            createFormData(data), 
            {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (resObj.error) {
            result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al crear entrada';
        } else {
            result.success = true;
            result.data = resObj.result;
        }
    } catch (err) {
        result.errorMessage = 'Error al crear entrada';
    }

    return result;
}

export const updateEntry = async (id, data) => {
    const result = {
        success: false,
        errorMessage: '',
        data: {}
    };

    try {
        const { data: resObj } = await api.put(
            `${API_NEWS}/${id}`,
            createFormData(data),
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        );
        if (resObj.error) {
            result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al actualizar entrada';
        } else {
            result.success = true;
            result.data = resObj.result;
        }
    } catch (err) {
        result.errorMessage = 'Error al actualizar entrada';
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