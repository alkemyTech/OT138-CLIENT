import api from "../../config/api";
import { API_SENDGRID_CONTACT,API_SENDGRID_REGISTER } from "../../constants/urls";

export const SendridContact = async(values) => {

    const result = {
        success: false,
        data: {},
        errorMessage: "",
        successMessage: "",
      };


    try {
        
     const {data} = await api.post(API_SENDGRID_CONTACT,{...values});
    if(data.error){
    result.errorMessage = data.message;
    }else{
    result.success = true;
    result.successMessage = data.message
    }

    } catch (error) {
        result.errorMessage = "Found an unexpected error during the request";
    }

    return result;

}



export const SendridRegister = async(values) => {

    const result = {
        success: false,
        data: {},
        errorMessage: "",
        successMessage: "",
      };


    try {
        
     const {data} = await api.post(API_SENDGRID_REGISTER,{...values});
    if(data.error){
    result.errorMessage = data.message;
    }else{
    result.success = true;
    result.successMessage = data.message
    }

    } catch (error) {
        result.errorMessage = "Found an unexpected error during the request";
    }

    return result;

}