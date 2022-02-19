import React, { Fragment, useState } from "react";
import { BrowserRouter as Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Counter from "./components/Counter";
import Login from "./views/Login";
import Signup from "./views/Signup";
import { Link, NavLink } from "react-router-dom";
import "./App.css";
import styled from "styled-components";
import Logo from "./Img/logo.png";
import IconBurger from "./Img/menu.png";

function App() {
  const [high, SetHigh] = useState("0px");
  function MostrarMenu() {
    SetHigh("100vh");
  }
  function OcultarMenu() {
    SetHigh("0px");
  }

  return (
    <Fragment>
      <header>
        <Menu>
          <Link to="/">
            <img src={Logo} width="60px" alt="logo" />
          </Link>
          <ListMenu>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/services">Services</NavLink>
            <NavLink to="/signup">Signup</NavLink>
            <NavLink to="/login">Login</NavLink>
          </ListMenu>
          <IconMenu src={IconBurger} alt="menu" onClick={MostrarMenu} />
        </Menu>

        <MenuMobil alto={high} onClick={OcultarMenu}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/signup">Signup</NavLink>
          <NavLink to="/login">Login</NavLink>
        </MenuMobil>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<h1>services</h1>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Fragment>
  );
}

const Menu = styled.nav`
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  width: 100%;
  -webkit-box-shadow: 0px 3px 7px -1px #000000;
  box-shadow: 0px 3px 7px -1px #000000;
`;

const MenuMobil = styled.nav`
  width: 100%;
  background: #323232;
  position: absolute;
  z-index: 3;
  top: 0;
  height: ${(props) => props.alto};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  transition: 500ms ease;

  a {
    font-size: 60px;
    margin: 20px 0px;
    color: #fff;
    transition: 500ms ease;
  }

  a.active {
    color: #270082;
  }
`;

const ListMenu = styled.div`
  a {
    margin: 0px 20px;
    font-size: 18px;
    color: #3b2284;
    transition: 500ms ease;
    border-bottom: 2px solid #fff;
  }

  a.active {
    color: #5800ff;
    border-bottom: 2px solid #5800ff;
  }

  @media (max-width: 778px) {
    display: none;
  }
`;

const IconMenu = styled.img`
  width: 50px;
  display: none;
  cursor: pointer;
  @media (max-width: 778px) {
    display: block;
  }
`;
export default App;
