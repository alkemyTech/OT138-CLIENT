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
import ImageLoader from "../ImageLoader";
import { navItems as navItemsConstant } from "../../constants";
import toast from "react-hot-toast";
import { isAdmin } from '../../helpers';

function Header({ logout, auth }) {
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
  const [navItems, setNavItems] = useState({routes:[]});
  useEffect(() => {
    (async () => {
      const result = await getPublicData();
      if (!result.error && result.data) {
        setPublicData(result.data);
      } else {
        console.warn("No se encontraron datos de la organización.");
      }
    })();
  }, []);

  useEffect(() => {
    // prevent if navItemsConstant is not an Array
    if (navItemsConstant instanceof Array) {
      // Find all routes that match nav items constants
      const matchedRoutes = navItemsConstant.filter((elem) => {
        return pathname.includes(elem.basePath);
      });
      // use the first matched route
      setNavItems(matchedRoutes[0]);
    } else {
      toast.error("Ocurrió un error al cargar la barra de navegación.");
    }
  }, [pathname]);

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

  return (!navItems.hide &&
    <HeaderContainer>
      <HeaderBar>
        <Hamburger onClick={() => setMenuState(!menuState)}>
          <FaBars />
        </Hamburger>
        <Link to="/">
          <Logo>
            <ImageLoader
              src={publicData.image}
              alt="ong logo"
              loaderWidth="128px"
              loaderHeight="48px"
              loaderStyle={{ padding: "0rem 0.5rem" }}
            />
          </Logo>
        </Link>
        <NavBar>
          {navItems.routes.map((item, index) => {
            return (
              <NavItem
                key={index}
                className={pathname === item.route ? "active" : ""}>
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
              {isAdmin(auth.user) && <Link to={"/backoffice"}>BackOffice</Link>}
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
          {navItems.routes.map((item, index) => {
            return (
              <MobileItem
                key={index}
                className={pathname === item.route ? "active" : ""}>
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
