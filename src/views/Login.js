import React from "react";
import AuthHeader from "../components/AuthHeader";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import generalStyles from "../styles/generalStyles";

// Returns an object with the error messages for handled input validation
// i.e. both fields required, correct email format and password min 6 chars length
const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Campo requerido";
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)) {
    errors.email = "Formato de email inválido";
  }

  if (!values.password) {
    errors.password = "Campo requerido";
  } else if (values.password.length < 6) {
    errors.password = "La contraseña debe tener más de 6 caracteres";
  }
  return errors;
};

function Login(props) {
  const formik = useFormik({
    initialValues: {
      email: props.email ? props.email : "",
      password: "",
    },
    validate,
    // Only submits if there is not any validation error
    onSubmit: (values) => {
      attemptLogin(values);
    },
  });

  const attemptLogin = ({ email, password }) => {
    // Code login function
    console.log("Login attempt");
  };

  return (
    <div style={generalStyles.authView}>
      <AuthHeader
        logoSrc="../images/assets/logo.png"
        subtitle="Iniciar sesión"
      />
      <form onSubmit={formik.handleSubmit}>
        <label style={generalStyles.label}>
          <span style={generalStyles.labelText}>Email:</span>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            style={generalStyles.inputText}
          />
          {formik.errors.email ? (
            <span style={generalStyles.validationErrorText}>
              {formik.errors.email}
            </span>
          ) : null}
        </label>
        <label style={generalStyles.label}>
          <span style={generalStyles.labelText}>Contraseña:</span>
          <input
            type="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            style={generalStyles.inputText}
          />
          {formik.errors.password ? (
            <span style={generalStyles.validationErrorText}>
              {formik.errors.password}
            </span>
          ) : null}
        </label>
        <button type="submit" style={generalStyles.primaryButton}>
          Ingresar
        </button>
      </form>
      <Link to="/registro" style={generalStyles.link}>
        Aún no tengo cuenta
      </Link>
    </div>
  );
}

export default Login;
