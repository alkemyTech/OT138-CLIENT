import api from "../../config/api";
import { API_MEMBERS } from "../../constants/urls";
import { apiErrors } from '../../constants';
import { createFormData } from "../../helpers";

export const getMembers = async (page, pageLimit) => {
  const result = {
    success: false,
    errorMessage: '',
    data: []
  };

  try {
    const { data: resObj } = await api.get(API_MEMBERS, {
      params: {
        limit: pageLimit,
        page: page
      }
    });
    if (resObj.error) {
      result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al obtener miembros';
    } else {
      result.success = true;
      result.data = resObj.result;
    }
  } catch (err) {
    result.errorMessage = 'Error al obtener miembros';
  }
  
  return result;
}

export const deleteMember = async (id) => {
  const result = {
    success: false,
    errorMessage: '',
    data: []
  };

  try {
    const { data: resObj } = await api.delete(`${API_MEMBERS}/${id}`);
    if (resObj.error) {
      result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al intentar eliminar';
    } else {
      result.success = true;
      result.data = resObj.data;
    }
  } catch (err) {
    result.errorMessage = 'Error al intentar eliminar';
  }

  return result;
}

export const createMember = async (data) => {
  const result = {
    success: false,
    errorMessage: '',
    data: []
  };

  try {
    const { data: resObj } = await api.post(
      API_MEMBERS,
      createFormData(data),
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    );
    if (resObj.error) {
      result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al intentar crear el miembro';
    } else {
      result.success = true;
      result.data = resObj.data;
    }
  } catch (err) {
    result.errorMessage = 'Error al intentar crear el miembro';
  }

  return result;
}