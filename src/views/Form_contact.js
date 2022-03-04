import React, { Fragment } from 'react';
import {Formik } from 'formik';
import Header from "../components/Header/Landing";
import {Container,ContainColumn,Colum,Form,Input,Textarea,Button,MessageError} from "../styles/FormContact";




function FormContacto(){
return(  

    <Fragment>
    <Header/>
    <Container>
    <ContainColumn>
    <Colum>
    <h1>It's time to bring your business online.</h1>
    </Colum>
    <Formik
    initialValues={{
    name:"",
    email:"",
    message:""
    }}


    onSubmit={(values,{resetForm})=>{
      resetForm();
      console.log(values) 
    }}

    validate={(values)=>{
    let errores = {};

    //VALIDATION NAME
    if(!values.name || (values.name).length < 4){
    errores.name = "Please enter a name"
    }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)){
    errores.name = "The name can only contain letters and spaces"
    } 
               
    
    //VALIDATION EMAIL
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)){
    errores.email = "Enter a valid email"
    }


    //VALIDATION MESSAGE
    if((values.message).length < 30){
    errores.message = "The message is very short";
    }

    return errores;
}}>
        {({values,handleSubmit,handleChange,handleBlur,errors,touched})=>(
         <Form onSubmit={handleSubmit}>
         <Input name="name" type="text" placeholder='Full name' value={values.name} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.name &&  errors.name}</MessageError>
         <Input name="email" type="email" placeholder='Email' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.email && errors.email}</MessageError>
         <Textarea name="message" placeholder='Message' value={values.message} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.message && errors.message}</MessageError>
         <Button type='submit'>Send form</Button>
         </Form>

        )}
       
       </Formik>
       </ContainColumn>
       </Container>
       </Fragment>
    )


}

export default FormContacto;