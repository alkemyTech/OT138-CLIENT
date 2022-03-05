import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {Form,Input,Label,Button,MessageError} from "../styles/FormTestimonial";
import {Formik} from "formik";


function FormTestimonial(){

    return(

        <Formik initialValues={{name:"",image:"",content:""}} 
        
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
        onSubmit={(values)=>{
        console.log(values)
        }}
        >



        {({values,handleChange,touched,handleBlur,errors,handleSubmit})=>(
         <Form onSubmit={handleSubmit}>
         <h1>Testimonial form</h1>
         <Label>Name</Label>
         <Input type='text' name='name'  value={values.name} onChange={handleChange}  onBlur={handleBlur}/>
         <MessageError>{touched.name && errors.name}</MessageError> 
         <Label>Image Url</Label>
         <Input type='text' name='image' value={values.image} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.image && errors.image}</MessageError> 
         <Label>Content</Label>
         <CKEditor editor={ ClassicEditor } data={values.content}  onChange={ ( event, editor ) => {
         const data = editor.getData();
         console.log({data});
         }}/>
         <Button type='submit'>Enviar formulario</Button>
         </Form>
        )}
         


        </Formik>

        



    )


}


export default FormTestimonial;