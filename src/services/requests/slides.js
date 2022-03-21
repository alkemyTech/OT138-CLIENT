import api from "../../config/api";
import { API_SLIDES } from "../../constants/urls";
import { apiErrors } from '../../constants';

//GET ALL SLIDES
export const getSlides = async (page=1,limit=10) => {

  const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
  };

  try {
    const { data } = await api.get(`${API_SLIDES}?page=${page}&limit=${limit}`)
    if (data.error) {
      result.errorMessage = apiErrors[data.errorCode] ?? 'Error al obtener slides';
      result.data = data.slider;
    } else {
      result.success = true;
      result.data = data.slider;
      result.successMessage = data.message
    }

  } catch (error) {
    result.errorMessage = "Error al obtener sliders";
  }
  return result;

}



//GET ONE SLIDES
export const getOneSlides = async (id) => {

  const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
  };

  try {
    const { data } = await api.get(`${API_SLIDES}/${id}`)
    if (data.error) {
      result.errorMessage = apiErrors[data.errorCode] ?? 'Error al obtener el slider';
      result.data = data.slider;
    } else {
      result.success = true;
      result.data = data.slider;
      result.successMessage = data.message
    }

  } catch (error) {
    result.errorMessage = "Error al obtener sliders";
  }
  return result;

}

//CREATE SLIDES
export const postSlides = async (values) => {

  const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
  };
  try {
    const { data } = await api.post(API_SLIDES, { imageURL: values.imageURL, text: values.text, order: values.order, organizationID: values.organizationID });
    if (data.error) {
      result.errorMessage = data.message;
    } else {
      result.success = true;
      result.successMessage = data.message
    }

  } catch (error) {
    result.errorMessage = "Found an unexpected error during the request";
  }
  return result;

}

//UPDATED SLIDES
export const putSlides = async ( id,text,imageUrl) => {

  const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
  };

  try {
    const { data } = await api.put(`${API_SLIDES}/${id}`, { text: text, imageURL: imageUrl });
    if (data.error) {
      result.errorMessage = data.message;
      result.data = data.slider;
    } else {
      result.success = true;
      result.data = data.slider;
      result.successMessage = data.message
    }

  } catch (error) {
    result.errorMessage = "Found an unexpected error during the request";
  }
  return result;

}

//DELETE SLIDES
export const deleteSlides = async (id) => {

  const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
  };

  try {
    const { data } = await api.delete(`${API_SLIDES}/${id}`);
    if (data.error) {
      result.errorMessage = data.message;
      result.data = data.slider;
    } else {
      result.success = true;
      result.data = data.slider;
      result.successMessage = data.message
    }

  } catch (error) {
    result.errorMessage = "Found an unexpected error during the request";
  }
  return result;

}