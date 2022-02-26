import api from "../../config/api";

export const getActivities = (limit) =>
  api.get(`/activities${limit ? `/?limit=${limit}` : ""}`).then((res) => res);

export const getActivitiesById = (id) =>
  api.get(`/activities/${id}`).then((res) => res);
