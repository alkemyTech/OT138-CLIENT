import React from "react";
import AuthHeader from "../components/AuthHeader";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import generalStyles from "../styles/generalStyles";

// Returns an object with the error messages for handled input validation
// i.e. fields required, correct email format and password min 6 chars length
const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Campo requerido";
  }

  if (!values.lastname) {
    errors.lastname = "Campo requerido";
  }

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

function Signup(props) {
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

  const attemptSignup = ({ name, lastname, email, password }) => {
    // Code signup function
    console.log("Signup attempt");
  };

  return (
    <div style={generalStyles.authView}>
      <AuthHeader
        logoSrc="../images/assets/logo.png"
        subtitle="Iniciar sesión"
      />
      <form onSubmit={formik.handleSubmit}>
        <label style={generalStyles.label}>
          <span style={generalStyles.labelText}>Nombre:</span>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            style={generalStyles.inputText}
          />
          {formik.errors.name ? (
            <span style={generalStyles.formValidationErrorText}>
              {formik.errors.name}
            </span>
          ) : null}
        </label>
        <label style={generalStyles.label}>
          <span style={generalStyles.labelText}>Apellido:</span>
          <input
            type="text"
            name="lastname"
            value={formik.values.lastname}
            onChange={formik.handleChange}
            style={generalStyles.inputText}
          />
          {formik.errors.lastname ? (
            <span style={generalStyles.formValidationErrorText}>
              {formik.errors.lastname}
            </span>
          ) : null}
        </label>
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
            <span style={generalStyles.formValidationErrorText}>
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
            <span style={generalStyles.formValidationErrorText}>
              {formik.errors.password}
            </span>
          ) : null}
        </label>
        <button type="submit" style={generalStyles.primaryButton}>
          Ingresar
        </button>
      </form>
      <Link to="/login" style={generalStyles.link}>
        Ya estoy registrado
      </Link>
    </div>
  );
}

export default Signup;
