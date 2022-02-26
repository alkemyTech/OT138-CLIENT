import api from "../../config/api";

export const getActivities = (limit, currentPage) =>
  api
    .get(`/activities${limit ? `/?limit=${limit}` : ""}&page=${currentPage}`)
    .then((res) => res);

export const getActivitiesById = (id) =>
  api.get(`/activities/${id}/?limit=1&page=1`).then((res) => res);
