import api from "../../config/api";
import { API_PUBLIC_DATA } from "../../constants/urls";
import { apiErrors } from "../../constants";
import FormData from "form-data";
/**
 * Makes a GET request to the API's Public Organization Data endpoint.
 * @returns An object with the following entries:
 *      - success: whether or not the login attempt was successful
 *      - data: user data returned from the API, if success is true
 *      - errorResponse: a string with the error message, if success is false
 */
export async function getPublicData() {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
  };
  try {
    const { data: response } = await api.get(API_PUBLIC_DATA);
    if (response.error) {
      result.errorMessage =
        apiErrors[response.errorCode] ?? "Error al actualizar datos públicos";
      result.errorMessage += ": " + response.message;
    } else {
      result.success = true;
      result.data = response.result;
    }
  } catch (error) {
    result.errorMessage = "Error al obtener datos públicos";
  }
  return result;
}

export async function updatePublicData(organizationData, imagen_portada) {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
  };
  try {
    let formData = new FormData();
    formData.append("name", organizationData.name);
    formData.append("image", imagen_portada);
    const { data: response } = await api.put(API_PUBLIC_DATA, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.error) {
      result.errorMessage =
        apiErrors[response.errorCode] ?? "Error al actualizar";
      result.errorMessage = ": " + response.message;
    } else {
      result.success = true;
      result.data = response.result;
    }
  } catch (error) {
    result.errorMessage = "Error al actualizar";
  }

  return result;
}
