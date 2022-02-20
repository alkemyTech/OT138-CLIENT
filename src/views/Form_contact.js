import React from 'react';
import styled from '@emotion/styled';
import { useFormik } from 'formik';


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
height:500px;
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
width:60%;
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
width:40%;
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


function FormContacto(){


    const formik = useFormik({

        initialValues:{

            nombre:"",
            email:"",
            mensaje:""

        },

        onSubmit:values =>{

            console.log(values)
        }

    });

    return(
       
   <Container>

       <ContainColumn>
       <Colum>
       <h1>It's time to bring your business online.</h1>
       </Colum>
       <Form onSubmit={formik.handleSubmit}>
       <Input name="nombre" type="text" placeholder='Nombre completo' onChange={formik.handleChange} value={formik.values.nombre}/>
       <Input name="email" type="email" placeholder='Correo electronico' onChange={formik.handleChange} value={formik.values.email}/>
       <Textarea name="mensaje" placeholder='Mensaje' onChange={formik.handleChange} value={formik.values.mensaje}></Textarea>
       <Button type='submit'>Enviar formulario</Button>
       </Form>

       </ContainColumn>
       
   </Container>
    )


}

export default FormContacto;