import React, { Fragment, useState } from 'react';
import Home from './Components/Home';
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import {Link, NavLink, Route, Routes} from "react-router-dom";
import './App.css';
import styled from 'styled-components';
import Logo from "./Img/logo.png";
import IconMenu from "./Img/menu.png";

function App() {

  const [alto,SetAlto] = useState("0px");
  function MostrarMenu(){SetAlto("100vh")}
  function OcultarMenu(){SetAlto("0px")}



  return (
   <Fragment>
   <header>
   <Menu>
   <Link to="/"><img src={Logo}  width="60px" alt="logo"/></Link>
   <ListMenu>
   <NavLink to="/">Home</NavLink>
   <NavLink to="/services">Services</NavLink>
   <NavLink to="/signup">Signup</NavLink>
   <NavLink to="/login">Login</NavLink>
   </ListMenu>
   <IconoMenu src={IconMenu} alt="menu" onClick={MostrarMenu}/>
    
  </Menu>

  <MenuMobil alto={alto} onClick={OcultarMenu}>
  <NavLink to="/">Home</NavLink>
  <NavLink to="/services">Services</NavLink>
  <NavLink to="/signup">Signup</NavLink>
  <NavLink to="/login">Login</NavLink>
  </MenuMobil>
  </header>

  <Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/services' element={<h1>Servicios</h1>}/>
  <Route path='/signup' element={<Signup/>}/>
  <Route path='/login' element={<Login/>}/>
  </Routes>
  </Fragment>
   
  );
}


const Menu = styled.nav`
padding:10px;
display:flex;
justify-content: space-between;
align-items:center;
background:#fff;
width:100%;
-webkit-box-shadow: 0px 3px 7px -1px #000000; 
box-shadow: 0px 3px 7px -1px #000000;

`;


const MenuMobil = styled.nav`

width:100%;
background:#323232;
position:absolute;
z-index:3;
top:0;
height:${props => props.alto};
display:flex;
justify-content:center;
flex-direction:column;
align-items:center;
overflow:hidden;
transition:500ms ease;

a{

font-size:60px;
margin:20px 0px;
color:#fff;
transition:500ms ease;

}

a.active{
color:#270082;
}
`;


const ListMenu = styled.div`
a{
margin:0px 20px;
font-size:18px;
color:#3b2284;
transition:500ms ease;
border-bottom:2px solid #fff;
}

a.active{
color:#5800FF;
border-bottom:2px solid #5800FF;
}

@media (max-width:778px){
display:none;
}

`;


const IconoMenu = styled.img`
width:50px;
display:none;
cursor:pointer;
@media (max-width:778px){
display:block;
}

`;
export default App;
