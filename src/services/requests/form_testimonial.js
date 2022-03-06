import api from "../../config/api";
import {API_TESTIMONIAL} from "../../constants/urls";

export const getTestimony =  () => {
  
    api.get(API_TESTIMONIAL)
   .then((response)=>{

    return response

   })
   .catch((error)=>{

   return error;

   })
   

}



//SAVE TESTIMONY
export async function postTestimony(values){
    const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
    };

    try{
    const {data} = await api.post(API_TESTIMONIAL,{...values})
    if(data.error){
    result.errorMessage = data.message;
    result.data = data.result;
    }else{
    result.success = true;
    result.data = data.result;
    result.successMessage = data.message
    }

    }catch (error) {
    result.errorMessage = "Found an unexpected error during the request";
    }
    return result;
}




//UPDATED TESTIMONY
export async function putTestimony(values,id){
    const result = {
    success: false,
    data: {},
    errorMessage: "",
    successMessage: "",
    };

    try{
    const {data} = await api.put(`${API_TESTIMONIAL}+${id}`,{...values})
    if(data.error){
    result.errorMessage = data.message;
    result.data = data.result;
    result.success = false;
    }else{
    result.success = true;
    result.data = data.result;
    result.successMessage = data.message
    }

    }catch (error) {
    result.success = false;
    result.errorMessage = "Found an unexpected error during the request";
    }
    return result;
}