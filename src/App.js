import React from "react";
import Home from "./components/Home";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { Route, Routes } from "react-router-dom";
import "./styles/App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<h1>Services</h1>} />
      <Route path="/registro" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
