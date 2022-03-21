import api from "../../config/api";

export const getTestimonies = (limit, currentPage) =>
  api
    .get(`/testimonials${limit ? `/?limit=${limit}` : ""}&page=${currentPage}`)
    .then((res) => res);
