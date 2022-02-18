import React from 'react';
import styled from '@emotion/styled';
import AuthHeader from '../components/AuthHeader.js';
import { useFormik } from 'formik';
import { withTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

// Returns an object with the error messages for handled input validation
// i.e. fields required, correct email format and password min 6 chars length
const validate = values => {
    const errors = {};
    
    if(!values.name){
        errors.name = "Campo requerido";
    }

    if(!values.lastname){
        errors.lastname = "Campo requerido";
    }

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

function Signup(props){

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            password: ''
        },
        validate,
        // Only submits if there is not any validation error
        onSubmit: (values) => {
            attemptSignup(values);
        }
    })

    const attemptSignup = ({name, lastname, email, password}) => {
        // Code login function
        console.log("Signup attempt");
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
        display: "block",
        margin: "auto",
        marginTop: "30px",
        border: "none",
        backgroundColor: "#17A768",
        color: 'white',
        };

    const validationErrorTextStyle = {
        display: "block",
        fontSize: "0.8rem",
    };

    const linkStyle = {
        display: 'block',
        textAlign: 'center',
        marginTop: '20px'
    }

    return (
        <div style={loginViewStyle}>
            <AuthHeader logoSrc="../images/assets/logo.png" subtitle="Iniciar sesión"/>
            <form onSubmit={formik.handleSubmit}>
                <label style={labelStyle}>
                    <span style={labelTextStyle}>Nombre:</span>
                    <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} style={inputTextStyle}/>
                    {formik.errors.name ? 
                        <span style={validationErrorTextStyle}>{formik.errors.name}</span>:
                        null
                    }
                </label>
                <label style={labelStyle}>
                    <span style={labelTextStyle}>Apellido:</span>
                    <input type="text" name="lastname" value={formik.values.lastname} onChange={formik.handleChange} style={inputTextStyle}/>
                    {formik.errors.lastname ? 
                        <span style={validationErrorTextStyle}>{formik.errors.lastname}</span>:
                        null
                    }
                </label>
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
            <Link to="/login" style={linkStyle}>Ya estoy registrado</Link>
        </div>
    )
}

export default Signup;