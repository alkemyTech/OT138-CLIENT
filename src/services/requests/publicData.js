import api from "../../config/api";

export async function getPublicData() {
  const result = {
    success: false,
    data: {},
    errorMessage: "",
  };
  try {
    const response = await api.get("/api/organizations/1/public");
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
