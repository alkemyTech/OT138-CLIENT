import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { Container } from "../components/Wrappers/Containers";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login as loginAction } from "../actions/authActions";
import { TailSpin } from "react-loader-spinner";
import {
  FormContainer,
  Label,
  LoginContainer,
  LoginFooter,
  LoginForm,
  LogoContainer,
  BrandContainer,
  Brand,
} from "../styles/Login";
import { Button, Input } from "../components/Inputs";
import { register } from "../services/requests/auth";
import { SendridRegister } from "../services/requests/sendGrid";

// Returns an object with the error messages for handled input validation
// i.e. fields required, correct email format and password min 6 chars length
const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "*";
  }

  if (!values.lastName) {
    errors.lastName = "*";
  }

  if (!values.email) {
    errors.email = "*";
  } else if (!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(values.email)) {
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

function Signup({ login }) {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    },
    validate,
    // Only submits if there is not any validation error
    onSubmit: (values) => {
      attemptSignup(values);
    },
  });

  const attemptSignup = async (values) => {
    setLoading(true);
    const { success, errorMessage, errorFields } = await register(values);
    await SendridRegister(values);

    if (success) {
      toast.success("Cuenta creada");
      login(values);
      navigation("/");
    } else {
      if (errorFields) {
        Object.values(errorFields).forEach((fieldError) => {
          toast.error(fieldError);
        });
      }
      toast.error(errorMessage);
    }

    setLoading(false);
  };

  const [source, setSource] = useState(
    photos[Math.floor(Math.random() * photos.length)]
  );

  return (
    <Container>
      <Toaster />
      <LoginContainer>
        <FormContainer>
          <LoginForm onSubmit={formik.handleSubmit}>
            <BrandContainer>
              <Link to="/">
                <Brand>
                  <img src="/logo.png" alt="Somos mas logo" />
                </Brand>
              </Link>
            </BrandContainer>
            <h1>Crear cuenta</h1>
            <br />
            <Label>
              Nombres{" "}
              {formik.errors.firstName ? (
                <span>{formik.errors.firstName}</span>
              ) : null}
            </Label>
            <Input
              placeholder="Nombres"
              type="text"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <Label>
              Apellidos{" "}
              {formik.errors.lastName ? (
                <span>{formik.errors.lastName}</span>
              ) : null}
            </Label>
            <Input
              placeholder="Apellidos"
              type="text"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            />
            <Label>
              Número de Celular{" "}
              {formik.errors.phone ? <span>{formik.errors.phone}</span> : null}
            </Label>
            <Input
              placeholder="Celular"
              type="number"
              name="phone"
              value={formik.values.phone}
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
              disabled={loading}
              style={{
                margin: "0.8rem 0",
                alignSelf: "center",
              }}
            >
              <div style={{ display: "flex", justifyContent: "center" }}>
                {loading ? (
                  <TailSpin height="25" width="25" color="white" />
                ) : (
                  <b>Registrarme</b>
                )}
              </div>
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      login: loginAction,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Signup);
