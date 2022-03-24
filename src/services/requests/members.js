import api from "../../config/api";
import { API_MEMBERS } from "../../constants/urls";
import { apiErrors } from '../../constants';

export const getMembers = async () => {
  const result = {
    success: false,
    errorMessage: '',
    data: []
  };

  try {
    const { data: resObj } = await api.get(API_MEMBERS);
    if (resObj.error) {
      result.errorMessage = apiErrors[resObj.errorCode] ?? 'Error al obtener miembros';
    } else {
      result.success = true;
      result.data = resObj.data;
    }
  } catch (err) {
    result.errorMessage = 'Error al obtener miembros';
  }

  return result;
}