import api from "../../config/api";
import { API_USERS } from "../../constants/urls";

export async function getUsers() {
  const result = {
    success: false,
    data: [],
    errorMessage: "",
  };
  try {
    const { data: resObj } = await api.get(API_USERS);
    if (resObj.error === false) {
      result.success = true;
      result.data = resObj.result;
    } else {
      result.errorMessage = resObj.message;
    }
  } catch (err) {
    result.errorMessage = "Unexpected error during fetching";
  }

  return result;
}

export const getUsersList = (limit, currentPage) =>
  api
    .get(`/users${limit ? `/?limit=${limit}` : ""}&page=${currentPage}`)
    .then((res) => res);

export async function deleteUser(id) {
  const result = {
    success: false,
    data: "",
    errorMessage: "",
  };

  try {
    const { data: resObj } = await api.delete(`/users/protected/${id}`);

    if (resObj.error === false) {
      result.success = true;
      result.data = resObj.message;
    } else {
      result.errorMessage = resObj.message;
    }

  } catch (e) {
    console.error(e);
    result.errorMessage = "Unexpected error during fetching";
  };
};

export async function updateUser(id) {
  const result = {
    success: false,
    data: "",
    errorMessage: "",
  };

  try {
    const { data: resObj } = await api.put(`/users/protected/${id}`);

    if (resObj.error === false) {
      result.success = true;
      result.data = resObj.message;
    } else {
      result.errorMessage = resObj.message;
    }

  } catch (e) {
    console.error(e);
    result.errorMessage = "Unexpected error during fetching";
  };
};