import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { logout as logoutAction } from "../../actions/authActions";
import { status } from "../../constants";
import { getPublicData } from "../../services/requests/publicData";

function Header({ navItems, logout, auth }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [menuState, setMenuState] = useState(false);
  const [dropdownState, setDropdownState] = useState(false);
  const [dataState, setDataState] = useState("loading");
  const [profileData, setProfileData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [publicData, setPublicData] = useState({});
  useEffect(() => {
    (async () => {
      const result = await getPublicData();
      if (!result.error) {
        setPublicData(result.data);
      }
    })();
  }, []);
  useEffect(() => {
    console.log(publicData);
  }, [publicData]);
  useEffect(() => {
    if (auth.status === status.SUCCESS) {
      if (auth.authenticated) {
        setProfileData({
          firstName: auth.user.firstName,
          lastName: auth.user.lastName,
          email: auth.user.email,
          image: auth.user.image,
        });
      }
      setDataState("loaded");
    } else if (auth.status === status.FETCHING) {
      setDataState("loading");
    } else if (auth.status === status.FAILURE) {
      setDataState("error");
    }
  }, [auth]);

  return (
    <HeaderContainer>
      <HeaderBar>
        <Hamburger onClick={() => setMenuState(!menuState)}>
          <FaBars />
        </Hamburger>
        <Link to="/">
          <Logo>
            <img src={publicData.image} alt="ong logo" />
            {/* <h2 className="logo__title">Alkemy ONG</h2> */}
          </Logo>
        </Link>
        <NavBar>
          {navItems.map((item, index) => {
            return (
              <NavItem
                key={index}
                className={pathname === item.route ? "active" : ""}
              >
                <Link to={item.route}>{item.text}</Link>
              </NavItem>
            );
          })}
        </NavBar>
        {dataState === "loaded" && auth.authenticated ? (
          <Avatar onClick={() => setDropdownState(!dropdownState)}>
            <img
              src={profileData?.image ? profileData?.image : "/pfp_default.png"}
              alt="ong logo"
            />
            <p>
              {profileData?.firstName} {profileData?.lastName}
            </p>
            {dropdownState ? <FaCaretUp /> : <FaCaretDown />}
            <ProfileDropdown dropdownState={dropdownState}>
              <Link to={"/perfil"}>Mi Perfil</Link>
              <Link to={"/backoffice"}>BackOffice</Link>
              <Link onClick={() => logout()} to={"#"}>
                Cerrar Sesión
              </Link>
            </ProfileDropdown>
          </Avatar>
        ) : dataState !== "loading" ? (
          <SessionButton onClick={() => navigate("/login")}>
            Iniciar Sesión
          </SessionButton>
        ) : null}
        <MobileNavBar menuState={menuState}>
          {navItems.map((item, index) => {
            return (
              <MobileItem
                key={index}
                className={pathname === item.route ? "active" : ""}
              >
                <Link to={item.route} onClick={() => setMenuState(!menuState)}>
                  {item.text}
                </Link>
              </MobileItem>
            );
          })}
        </MobileNavBar>
      </HeaderBar>
    </HeaderContainer>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      logout: logoutAction,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
