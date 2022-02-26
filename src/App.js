import React, { useEffect } from "react";
import Home from "./components/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import FormContacto from "./views/Form_contact";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Backoffice from "./views/Backoffice";
import Profile from "./views/Profile";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkAuthentication as checkAuthenticationAction } from "./actions/authActions";
import { Protected } from "./components/Routes";
import Activities, { ActivitiesByID } from "./views/Activities";

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
        <Route path="/actividades" element={<Activities />} />
        <Route path="/actividades/:id" element={<ActivitiesByID />} />
        <Route
          path="/perfil"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route
          path="/backoffice"
          element={
            <Protected>
              <Backoffice />
            </Protected>
          }
        />
      </Routes>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      checkAuthentication: checkAuthenticationAction,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(App);
