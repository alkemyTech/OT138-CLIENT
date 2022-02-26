import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  HeaderContainer,
  HeaderBar,
  Logo,
  NavBar,
  NavItem,
  MobileNavBar,
  Avatar,
  Hamburger,
  MobileItem,
  ProfileDropdown,
  SessionButton,
} from "../../styles/Header";
import { FaBars, FaCaretDown, FaCaretUp } from "react-icons/fa";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfileData } from "../../actions/authActions";

function Header(props) {
  const [dataState, setDataState] = useState("loading");
  const [profileData, setProfileData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    let data = await props.getProfileData();
    if (data.payload.success) {
      let { image, firstName, lastName, email } = data.payload.user;
      setProfileData({
        image: image,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      setDataState("loaded");
    } else {
      setDataState("error");
    }
  };
  const [menuState, setMenuState] = useState(false);
  const [dropdownState, setDropdownState] = useState(false);

  return (
    <HeaderContainer>
      <HeaderBar>
        <Hamburger onClick={() => setMenuState(!menuState)}>
          <FaBars />
        </Hamburger>
        <Link to="/">
          <Logo>
            <img src="/logo.png" alt="ong logo" />
            <h2 className="logo__title">Alkemy ONG</h2>
          </Logo>
        </Link>
        <NavBar>
          {props.navItems.map((item, index) => {
            return (
              <NavItem key={index}>
                <Link to={item.route}>{item.text}</Link>
              </NavItem>
            );
          })}
        </NavBar>
        {dataState === "loaded" ? (
          <Avatar onClick={() => setDropdownState(!dropdownState)}>
            <img
              src={profileData?.image ? profileData?.image : ""}
              alt="ong logo"
            />
            <p>
              {profileData?.firstName} {profileData?.lastName}
            </p>
            {dropdownState ? <FaCaretUp /> : <FaCaretDown />}
            <ProfileDropdown dropdownState={dropdownState}>
              <Link to={"/perfil"}>Mi Perfil</Link>
              <Link to={"/backoffice"}>BackOffice</Link>
              <Link onClick={() => {}} to={"#"}>
                Cerrar Sesión
              </Link>
            </ProfileDropdown>
          </Avatar>
        ) : dataState !== "loading" ? (
          <SessionButton>
            <Link to="/login">Iniciar Sesión</Link>
          </SessionButton>
        ) : null}
        <MobileNavBar menuState={menuState}>
          {props.navItems.map((item, index) => {
            return (
              <MobileItem key={index}>
                <Link to={item.route}>{item.text}</Link>
              </MobileItem>
            );
          })}
        </MobileNavBar>
      </HeaderBar>
    </HeaderContainer>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProfileData,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Header);
