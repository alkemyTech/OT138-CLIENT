import api from "../../config/api";
import { apiErrors } from '../../constants';
import { API_TESTIMONIAL } from "../../constants/urls";

   export const getTestimonies = async (page=1,limit=10) => {

     const result = {
     success: false,
     data: {},
     errorMessage: "",
     successMessage: "",
     };

     try {
     const { data } = await api.get(`${API_TESTIMONIAL}?page=${page}&limit=${limit}`)
     if (data.error) {
     result.errorMessage = apiErrors[data.errorCode] ?? 'Error al obtener testimonios';
     result.data = data.result;
     }else {
     result.success = true;
     result.data = data.result;
     result.successMessage = data.message
     }

     }catch (error) {
     result.errorMessage = "Error al obtener testimonios";
     }
     return result;


}


   export const postTestimonies = async (values) =>{

     const result = {
      success: false,
      data: {},
      errorMessage: "",
      successMessage: "",
      };
      try {
      const { data } = await api.post(API_TESTIMONIAL, { name: values.name, image: values.image, content: values.content });
      if (data.error) {
      result.errorMessage = data.message;
      }else {
      result.success = true;
      result.successMessage = data.message
      }

      }catch (error) {
      result.errorMessage = "Found an unexpected error during the request";
      }
      return result;
      }

 


    export const putTestimonies = async (id,name,image,content) =>{

      const result = {
      success: false,
      data: {},
      errorMessage: "",
      successMessage: "",
      };
    
      try {
      const { data } = await api.put(`${API_TESTIMONIAL}/${id}`, { name: name, image: image, content:content });
      if (data.error) {
      result.errorMessage = data.message;
      result.data = data.result;
      }else {
      result.success = true;
      result.data = data.result;
      result.successMessage = data.message
      }
      }catch (error) {
      result.errorMessage = "Found an unexpected error during the request";
      }
      return result;

    }



    export const deleteTestimonies = async (id) =>{
      const result = {
      success: false,
      data: {},
      errorMessage: "",
      successMessage: "",
      };
    
      try {
      const { data } = await api.delete(`${API_TESTIMONIAL}/${id}`);
      if (data.error) {
      result.errorMessage = data.message;
      result.data = data.slider;
      }else {
      result.success = true;
      result.data = data.slider;
      result.successMessage = data.message
      }
    
      }catch (error) {
      result.errorMessage = "Found an unexpected error during the request";
      }
      return result
    }
    