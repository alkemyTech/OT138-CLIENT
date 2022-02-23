import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import { Container } from "../components/Wrappers/Containers";
import {
    LoginContainer,
    LogoContainer,
    FormContainer,
    LoginForm,
    Label,
    LoginFooter,
} from "../styles/Login";
import { Input, Button } from "../components/Inputs";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { login } from "../actions/authActions";

// Returns an object with the error messages for handled input validation
// i.e. both fields required, correct email format and password min 6 chars length
const validate = (values) => {
    const errors = {};

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
        // Call the login action with user credentials.
        props.login({ email, password });
    };

    // Add a useEffect hook to execute a function everytime isAuthenticated value changes,
    // this should trigger after calling props.login which updates the store.
    useEffect(() => {
        // Check if the user is authenticated
        if (props.isAuthenticated) {
            // Redirect outside the component.
            console.log('isAuthenticated: ', props.isAuthenticated);
        }
    }, [props.isAuthenticated]);

    // Add a useEffect hook to execute a function everytime isFetchingAuth value changes,
    // this should trigger after calling props.login which updates the store.
    // This way we can update the UI.
    useEffect(() => {

        if (props.isFetchingAuth) {
            // Update loading state. e.g.:
            // setLoading(true);
        } else {
            // setLoading(false);
        }
    }, [props.isFetchingAuth]);

    const [source, setSource] = useState(
        photos[Math.floor(Math.random() * photos.length)]
    );
    return (
        <Container>
            <LoginContainer>
                <FormContainer>
                    <LoginForm onSubmit={formik.handleSubmit}>
                        <h1>Ingreso a Alkemy ONG</h1>
                        <p>Servicio de Autentificación</p>
                        <Label>
                            Email{" "}
                            <span>
                                {formik.errors.email ? (
                                    <span>{formik.errors.email}</span>
                                ) : null}
                            </span>
                        </Label>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Ingresa tu Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                        <Label>
                            Contraseña{" "}
                            <span>
                                {formik.errors.password ? (
                                    <span>{formik.errors.password}</span>
                                ) : null}
                            </span>
                        </Label>
                        <Input
                            type="password"
                            name="password"
                            placeholder="Ingresa tu Contraseña"
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
                            <b>ENTRAR</b>
                        </Button>
                        <LoginFooter>
                            <Link to="/registro">
                                <Label>¿No tienes cuenta?</Label>
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

// This function updates the Login prop 'isAuthenticated' every time the redux store changes.
// Reference: https://react-redux.js.org/using-react-redux/connect-mapstate
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.authenticated,
        isFetchingAuth: state.auth.isFetching
    }
}

// This function adds the login action as a prop of Login component
// Reference: https://react-redux.js.org/using-react-redux/connect-mapdispatch
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            login,
        },
        dispatch
    );
};

// Subscribe Login component to the redux store
// Reference: https://react-redux.js.org/api/connect
export default connect(mapStateToProps, mapDispatchToProps)(Login);
