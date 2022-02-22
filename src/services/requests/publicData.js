import api from "../../config/api";
import { API_PUBLIC_DATA } from "../../constants/urls";

export async function getPublicData() {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
  };
  try {
    const response = await api.get(API_PUBLIC_DATA);
    if (response.error) {
      result.errorMessage = response.message;
    } else {
      result.success = true;
      result.data = response.data;
    }
  } catch (error) {
    console.log(error);
    result.errorMessage = "Found an unexpected error during the request";
  }
  return result;
}
