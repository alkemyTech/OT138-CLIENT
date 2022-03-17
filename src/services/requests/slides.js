import api from "../../config/api";
import { API_SLIDES } from "../../constants/urls";

//GET ALL SLIDES
export const getSlides = async () => {

  const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
  };

  try {
    const { data } = await api.get(API_SLIDES)
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
export const putSlides = async (text, imageUrl, id) => {

  const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
  };

  try {
    const { data } = await api.put(`${API_SLIDES}+${id}`, { text: text, imageURL: imageUrl });
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
    const { data } = await api.delete(`${API_SLIDES}+${id}`);
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