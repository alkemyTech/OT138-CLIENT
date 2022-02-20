import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Counter from "./components/Counter";
import Login from "./views/Login";
import Signup from "./views/Signup";
import FormContacto from "./views/Form_contact";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/registro" element={<Signup />} />
        <Route exact path="/counter" element={<Counter />} />
        <Route exact path="/formulario-contacto" element={<FormContacto/>}/>
      </Routes>
    </Router>
  );
}

export default App;
