import React, { useEffect } from "react";
import Home from "./views/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import FormContacto from "./views/Contact";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";
import Backoffice from "./views/Backoffice";
import Profile from "./views/Profile";
import Members from "./views/Members";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { checkAuthentication as checkAuthenticationAction } from "./actions/authActions";
import Protected from "./components/Routes/Protected";
import Activities from "./views/Activities";
import NotFound from "./views/NotFound";
import { ActivitiesByID } from "./views/Activities";
import ActivityEditor from "./views/BackOffice/Activities/ActivityEditor";
import UserEditor from "./views/BackOffice/Users/UserEditor";
import News, { NewsByID } from "./views/News";
import TestimonialsBackOffice from "./views/BackOffice/Testimonials";
import Testimonials from "./views/Testimonials";
import Sliders from "./views/BackOffice/Sliders/index";

function App({ checkAuthentication }) {
  useEffect(() => {
    checkAuthentication();
  }, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<NotFound/>}/>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<h1>Services</h1>} />
        <Route path="/registro" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<FormContacto />} />
        <Route path="/nosotros" element={<Members />} />
        <Route path="/testimonios" element={<Testimonials />} />
        <Route
          path="/perfil"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />
        <Route path="/actividades" element={<Activities />} />
        <Route path="/actividades/:id" element={<ActivitiesByID />} />
        <Route path="/novedades" element={<News />} />
        <Route path="/novedades/:id" element={<NewsByID />} />
        <Route
          path="/backoffice/*"
          element={
            <Protected isAdmin>
              <Backoffice />
            </Protected>
          }
        />

        <Route
          path="/backoffice/testimonials"
          element={
            <Protected isAdmin>
              <TestimonialsBackOffice />
            </Protected>
          }
        />

        <Route
          path="/backoffice/actividades/nueva"
          element={
            <Protected isAdmin>
              <ActivityEditor />
            </Protected>
          }
        />
        <Route
          path="/backoffice/actividades/editar/:id"
          element={
            <Protected isAdmin>
              <ActivityEditor />
            </Protected>
          }
        />
        <Route
          path="/backoffice/usuarios/editar/:id"
          element={
            <Protected isAdmin>
              <UserEditor />
            </Protected>
          }
        />

        <Route
          path="/backoffice/slider"
          element={
            <Protected isAdmin>
              <Sliders />
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