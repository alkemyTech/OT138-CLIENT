import api from "../../config/api";

export const getDonations = (limit, currentPage) =>
  api
    .get(`/donations${limit ? `/?limit=${limit}` : ""}&page=${currentPage}`)
    .then((res) => res);
