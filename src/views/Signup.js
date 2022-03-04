import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Wrappers/Containers";
import axios from "axios";
import {
  FormContainer,
  Label,
  LoginContainer,
  LoginFooter,
  LoginForm,
  LogoContainer,
} from "../styles/Login";
import { Button, Input } from "../components/Inputs";

// Returns an object with the error messages for handled input validation
// i.e. fields required, correct email format and password min 6 chars length
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "*";
  }

  if (!values.lastname) {
    errors.lastname = "*";
  }

  if (!values.email) {
    errors.email = "*";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Inválido";
  }

  if (!values.password) {
    errors.password = "*";
  } else if (values.password.length < 6) {
    errors.password = "Mínimo 6 caracteres";
  }
  return errors;
};
const photos = [
  "login__1.jpg",
  "login__2.jpg",
  "login__3.jpg",
  "login__4.jpg",
  "login__5.jpg",
];
function Signup(props) {

  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
    validate,
    // Only submits if there is not any validation error
    onSubmit: (values) => {
      attemptSignup(values);
    },
  });

  const attemptSignup = async ({ name, lastname, email, password }) => {
  
    await axios.post("http://localhost:4000/api/auth/register",{firstName:name,lastName:lastname,email:email,password:password})
    .then((response)=>{
    if(response.data.status === "200"){
    toast.success(response.data.message);
    setTimeout(()=>{
    navigation("/")
    },1500)
        
    }else if(response.data.status === "409"){
    toast.error(response.data.message);
    } 
    })
    .catch((error)=>{toast.error(error.data.message);})
  };

  const [source, setSource] = useState(
    photos[Math.floor(Math.random() * photos.length)]
  );
  return (
    
    <Container>
      <Toaster/>
      <LoginContainer>
        <FormContainer>
          <LoginForm onSubmit={formik.handleSubmit}>
            <h1>Registro en Alkemy ONG</h1>
            <p>Servicio de Autentificación</p>
            <Label>
              Nombres{" "}
              {formik.errors.name ? <span>{formik.errors.name}</span> : null}
            </Label>
            <Input
              placeholder="Nombres"
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <Label>
              Apellidos{" "}
              {formik.errors.lastname ? (
                <span>{formik.errors.lastname}</span>
              ) : null}
            </Label>
            <Input
              placeholder="Apellidos"
              type="text"
              name="lastname"
              value={formik.values.lastname}
              onChange={formik.handleChange}
            />
            <Label>
              Email{" "}
              {formik.errors.email ? <span>{formik.errors.email}</span> : null}
            </Label>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <Label>
              Contraseña{" "}
              {formik.errors.password ? (
                <span>{formik.errors.password}</span>
              ) : null}
            </Label>
            <Input
              placeholder="Contraseña"
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />

            <Button
              type="submit"
              style={{
                margin: "0.8rem 0",
                alignSelf: "center",
              }}
            >
              <b>REGISTRARME</b>
            </Button>
            <LoginFooter>
              <Link to="/login">
                <Label>¿Ya tienes cuenta?</Label>
              </Link>
              <Label>¿Olvidaste tu Contraseña?</Label>
            </LoginFooter>
          </LoginForm>
        </FormContainer>
        <LogoContainer>
          <img className="logo" src={source} alt="login__photo"></img>
        </LogoContainer>
      </LoginContainer>
    </Container>
  );
}

export default Signup;
