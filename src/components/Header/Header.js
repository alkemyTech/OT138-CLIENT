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
import { logout as logoutAction } from "../../actions/authActions";
import { status } from '../../constants';

function Header({ navItems, logout, auth }) {
    const [menuState, setMenuState] = useState(false);
    const [dropdownState, setDropdownState] = useState(false);
    const [dataState, setDataState] = useState('loading');
    const [profileData, setProfileData] = useState({
        image: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    useEffect(() => {
        if (auth.status === status.SUCCESS) {
            if (auth.authenticated) {
                setProfileData({
                    firstName: auth.user.firstName,
                    lastName: auth.user.lastName,
                    email: auth.user.email,
                    image: auth.user.image
                });
            }
            setDataState('loaded');
        } else if (auth.status === status.FETCHING) {
            setDataState('loading');
        } else if (auth.status === status.FAILURE) {
            setDataState('error');
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
                        <img src="/logo.png" alt="ong logo" />
                        <h2 className="logo__title">Alkemy ONG</h2>
                    </Logo>
                </Link>
                <NavBar>
                    {
                        navItems.map((item, index) => {
                            return (
                                <NavItem key={index}>
                                    <Link to={item.route}>{item.text}</Link>
                                </NavItem>
                            );
                        })
                    }
                </NavBar>
                {
                    dataState === "loaded" && auth.authenticated
                        ? (
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
                                    <Link onClick={() => logout()} to={"#"}>
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
                    {
                        navItems.map((item, index) => {
                            return (
                                <MobileItem key={index}>
                                    <Link to={item.route}>{item.text}</Link>
                                </MobileItem>
                            );
                        })
                    }
                </MobileNavBar>
            </HeaderBar>
        </HeaderContainer>
    );
}

const mapStateToProps = state => {
    return {
        auth: state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            logout: logoutAction
        },
        dispatch
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
