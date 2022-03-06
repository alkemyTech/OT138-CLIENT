import React, { Fragment, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Form,Input,Label,Button,MessageError} from "../styles/FormTestimonial";
import {Formik} from "formik";
import {postTestimony,putTestimony} from "../services/requests/form_testimonial";
import {toast,Toaster} from 'react-hot-toast';


function FormTestimonial({name="",image="",content="",id}){

    const [ckeditor,SetCkeditor] = useState();
    const [errorCkeditor,SeterrorCkeditor] = useState("");




    return(

        <Formik initialValues={{name:name,image:image}} 
        
        validate={(values)=>{
        let errors = {};
        if(values.name.length < 4){
        errors.name = "The name is too short"
        }
        if(values.image.length < 20){
        errors.image = "The image url is too short"
        }
        return errors;
        }}

        onSubmit={async (values,{resetForm})=>{ 
        if(!ckeditor){
        SeterrorCkeditor("No added content")
        }else{
        SeterrorCkeditor("")
        values.content = ckeditor;
        if(!id){
        const {successMessage,success,errorMessage} = await postTestimony(values)
        if(success){
            toast.success(successMessage);
            resetForm();
            }else{
            toast.error(errorMessage);
            }
        }else{

        const {successMessage,success,errorMessage} = await putTestimony(values,id)
         if(success){
        toast.success(successMessage);
        resetForm();
        }else{
        toast.error(errorMessage);
        }
        }
       
       }
        }}
        >



        {({values,handleChange,touched,handleBlur,errors,handleSubmit})=>(
         <Fragment>
         <Toaster/>
         <Form onSubmit={handleSubmit}>
         <h1>Testimonial form</h1>
         <Label>Name</Label>
         <Input type='text' name='name'  value={values.name} onChange={handleChange}  onBlur={handleBlur}/>
         <MessageError>{touched.name && errors.name}</MessageError> 
         <Label>Image Url</Label>
         <Input type='text' name='image' value={values.image} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.image && errors.image}</MessageError> 
         <Label>Content</Label>
         <CKEditor editor={ ClassicEditor } data={content}  onChange={ ( event, editor ) => {
         const data = editor.getData();
         SetCkeditor(data);
         }}/>
        <MessageError>{errorCkeditor && errorCkeditor}</MessageError> 
         <Button type='submit'>{!name || !image || !content ? "Save testimonial" : "Updated testimonial"} </Button>
         </Form>
         </Fragment> 
        )}
         


        </Formik>

        



    )


}


export default FormTestimonial;