import React, { useEffect } from "react";
import Home from "./components/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import FormContacto from "./views/Form_contact";
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
import { ActivitiesByID } from "./views/Activities";
import ActivityEditor from "./views/BackOffice/ActivityEditor";
import UserEditor from "./views/BackOffice/UserEditor";
import EditForm from "./views/BackOffice/EditForm";
import News, { NewsByID } from "./views/News";
import TableTestimonial from "./views/BackOffice/Table_testimonial";
import Testimonials from "./views/Testimonials";

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
          path="/backoffice/testimonios"
          element={
            <Protected isAdmin>
              <TableTestimonial />
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
              <EditForm />
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