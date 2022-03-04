import api from "../../config/api";

export const getNews = (limit, currentPage) =>
  api
    .get(`/news${limit ? `/?limit=${limit}` : ""}&page=${currentPage}`)
    .then((res) => res);

export const getNewsById = (id) => api.get(`/news/${id}`).then((res) => res);
