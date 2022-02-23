import React, {useEffect} from "react";
import Home from "./components/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import FormContacto from "./views/Form_contact";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import { Footer } from "./components/Footer";

import Backoffice from "./views/Backoffice";
import Profile from "./views/Profile";
function App() {

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { checkAuthentication as checkAuthenticationAction } from './actions/authActions';

function App({ checkAuthentication }) {

  useEffect(() => {
    checkAuthentication();
  }, []);


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-form" element={<FormContacto />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/backoffice" element={<Backoffice />} />
      </Routes>
    </>
  );
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        checkAuthentication: checkAuthenticationAction
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(App);
