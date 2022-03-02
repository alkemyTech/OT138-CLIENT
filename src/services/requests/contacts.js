import api from "../../config/api";
import { API_CONTACTS } from "../../constants/urls";

export const createContact = async (contact) => {
  const response = await api.post(API_CONTACTS, contact);
  console.log(response);
};
