import React from 'react';
import styled from '@emotion/styled';
import {Formik } from 'formik';


const Container = styled.section`
width:100%;
height:100vh;
display:flex;
justify-content:center;
background-color:#EEEEEE;
padding:20px;


`;


const ContainColumn = styled.div`
display:flex;
width:60%;
height:450px;
margin-top:100px;

@media (max-width:1298px){
flex-direction:column;
margin-top:0px;
}

@media (max-width:800px){
width:100%;
}
`;


const Colum = styled.div`
padding:30px;
display:flex;
justify-content:center;
align-items:center;
text-align:center;
background-image:url("https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80");
background-size:cover;
border-radius:10px 0px 0px 10px;
width:50%;
h1{
color:#fff;
font-size:50px;
}

@media (max-width:1298px){
width:100%;
border-radius:10px 10px 0px 0px;
}

`;

const Form = styled.form`
padding:30px;
width:50%;
border-radius:0px 10px 10px 0px;
background-color:#fff;
@media (max-width:1298px){
width:100%;
border-radius:0px 0px 10px 10px;
}
`;

const Input = styled.input`
border:none;
display:block;
width:100%;
padding:15px;
margin-top:20px;
outline:none;
border-radius:5px;
background-color:#e6e6e7;
font-size:15px;
`;

const Textarea = styled.input`
border:none;
display:block;
padding:40px;
margin-top:20px;
width:100%;
outline:none;
background-color:#e6e6e7;
border-radius:5px;
font-size:18px;
`;


const Button = styled.button`
border:none;
background-color:#116530;
color:#fff;
padding:10px 20px;
font-size:15px;
border-radius:5px;
margin-top:20px;
cursor:pointer;
font-family: "Open Sans", sans-serif;
transition:500ms ease;
&:hover{
background-color:#357C3C;
}
`;

const MessageError = styled.span`
color:#DA1212;
font-size:12px;
margin-left:5px;
font-family: "Open Sans", sans-serif;
font-weight:bold;
display:block;

`;


function FormContacto(){
return(  
    <Container>
    <ContainColumn>
    <Colum>
    <h1>It's time to bring your business online.</h1>
    </Colum>
    <Formik
    initialValues={{
    nombre:"",
    email:"",
    mensaje:""
    }}


    onSubmit={(valores,{resetForm})=>{
      resetForm();
      console.log(valores) 
    }}

    validate={(valores)=>{
    let errores = {};

    //VALIDATION NAME
    if(!valores.nombre || (valores.nombre).length < 4){
    errores.nombre = "Por favor ingresar un nombre"
    }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)){
    errores.nombre = "El nombre solo puede contener letras y espacios"
    } 
               
    
    //VALIDATION EMAIL
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(valores.email)){
    errores.email = "Ingresa un correo valido"
    }


    //VALIDATION MESSAGE
    if((valores.mensaje).length < 30){
    errores.mensaje = "El mensaje es muy corto";
    }

    return errores;
}}>
        {({values,handleSubmit,handleChange,handleBlur,errors,touched})=>(
         <Form onSubmit={handleSubmit}>
         <Input name="nombre" type="text" placeholder='Nombre completo' value={values.nombre} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.nombre &&  errors.nombre}</MessageError>
         <Input name="email" type="email" placeholder='Correo electronico' value={values.email} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.email && errors.email}</MessageError>
         <Textarea name="mensaje" placeholder='Mensaje' value={values.mensaje} onChange={handleChange} onBlur={handleBlur}/>
         <MessageError>{touched.mensaje && errors.mensaje}</MessageError>
         <Button type='submit'>Enviar formulario</Button>
         </Form>

        )}
       
       </Formik>
       </ContainColumn>
       </Container>
    )


}

export default FormContacto;