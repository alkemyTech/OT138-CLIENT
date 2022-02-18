import React from 'react';
import styled from '@emotion/styled';
import AuthHeader from '../components/authHeader.js';
import { useFormik } from 'formik';
import { withTheme } from '@emotion/react';

// Returns an object with the error messages for handled input validation
// i.e. both fields required, correct email format and password min 6 chars length
const validate = values => {
    const errors = {};

    if(!values.email){
        errors.email = "Campo requerido";
    } else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email)){
        errors.email = "Formato de email inválido";
    }

    if(!values.password){
        errors.password = "Campo requerido"
    } else if(values.password.length < 6){
        errors.password = "La contraseña debe tener más de 6 caracteres";
    }
    return errors;
}

function Login(props){

    const formik = useFormik({
        initialValues: {
            email: props.email? props.email : '',
            password: ''
        },
        validate,
        // Only submits if there is not any validation error
        onSubmit: (values) => {
            attemptLogin(values);
        }
    })

    const attemptLogin = ({email, password}) => {
        // Code login function
        console.log("Login attempt");
    }

    const loginViewStyle = {
        backgroundColor: "#E7E0D2",
        height: "100vh",
    };

    const labelStyle = {
        width: "90%",
        maxWidth: "600px",
        display: "block",
        margin: "auto",
        marginTop: "10px",
    };

    const labelTextStyle = {
        display: "block",
    }

    const inputTextStyle = {
        width: "100%",
        padding: "0.5rem",
        boxSizing: "border-box",
        borderRadius: "10px",
        border: "none",
        textAlign: "center",
    };

    const buttonStyle = {
        width: "90%",
        maxWidth: "600px",
        padding: "0.5rem",
        boxSizing: "bordr-box",
        borderRadius: "10px",
        marginTop: "30px",
        border: "none",
        backgroundColor: "#17A768",
        color: 'white',
        };

    const validationErrorTextStyle = {
        display: "block",
        fontSize: "0.8rem",
    };

    return (
        <div style={loginViewStyle}>
            <AuthHeader logoSrc="../images/assets/logo.png" subtitle="Iniciar sesión"/>
            <form onSubmit={formik.handleSubmit}>
                <label style={labelStyle}>
                    <span style={labelTextStyle}>Email:</span>
                    <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} style={inputTextStyle}/>
                    {formik.errors.email ? 
                        <span style={validationErrorTextStyle}>{formik.errors.email}</span>:
                        null
                    }
                </label>
                <label style={labelStyle}>
                    <span style={labelTextStyle}>Contraseña:</span>
                    <input type="password" name="password" value={formik.values.password} onChange={formik.handleChange} style={inputTextStyle}/>
                    {formik.errors.password ? 
                        <span style={validationErrorTextStyle}>{formik.errors.password}</span>:
                        null
                    }
                </label>
                <button type="submit" style={buttonStyle}>Ingresar</button>
            </form>
        </div>
    )
}

export default Login;