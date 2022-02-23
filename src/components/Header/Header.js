import React, { useState } from 'react';
import { Link } from 'react-router-dom';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

import {
    BsTwitter,
    BsFacebook,
    BsInstagram
} from 'react-icons/bs';
import { GiHamburgerMenu } from 'react-icons/gi';
import {
    HeaderContainer,
    HeaderBar,
    Logo,
    NavBar,
    NavList,
    NavItem,
    SocialNavBar,
    SocialNavItem,
    SocialNavButton,
    NavButton,
    slideIn,
    slideOut,
} from '../../styles/Header'

function Header(props){
    
    const slideInAnimation = css`
        animation: ${slideIn} 1s ease forwards;
    `;
    
    const slideOutAnimation = css`
        animation: ${slideOut} 1s ease forwards;
    `;

    const [menuState, setMenuState] = useState('closed');
    const [animation, setAnimation] = useState(slideOutAnimation);
    
    const navItems = [
        {
            route: '/',
            text: 'Inicio'
        },
        {
            route: 'acerca_de',
            text: 'Acerca de nosotros'
        },
        {
            route: '/contacto',
            text: 'Contacto'
        },
        {
            route: '/perfil',
            text: 'Mi perfil'
        }
    ]

    const socialLinks = [
        {
            social: 'facebook',
            url: 'https://facebook.com/ong',
            icon: <BsFacebook />
        },
        {
            social: 'instagram',
            url: 'https://instagram/ong',
            icon: <BsInstagram />
        },
        {
            social: 'twitter',
            url: 'https://twitter.com/ong',
            icon: <BsTwitter />
        }
    ]

    function toggleMenu(){
        if(menuState === 'closed'){
            setMenuState('open');
            setAnimation(slideInAnimation);
        }
        else{
            setAnimation(slideOutAnimation);
            setTimeout(() => setMenuState('closed'), 900);
        }
    }


    return(
        <HeaderContainer>
            <HeaderBar>
                <Logo>
                    <img src="./logo.png" alt="ong logo" />
                </Logo>
                <GiHamburgerMenu onClick={toggleMenu}/>
            </HeaderBar>
                { menuState === 'open' &&
                <NavBar>
                    <NavList css={animation}>
                        { navItems.map( (item, index) => {
                            return (<NavItem key={index}><Link to={item.route}>{item.text}</Link></NavItem>);
                        })}
                        <NavItem>
                            <SocialNavBar>
                            { 
                                socialLinks.filter(item => item.url !== '').map( (item, index) => {
                                    return (
                                        <SocialNavItem key={index}><SocialNavButton href={item.url}>{item.icon}</SocialNavButton></SocialNavItem>
                                    )
                                })
                            }
                            </SocialNavBar>
                        </NavItem>
                        <NavItem><NavButton onClick={toggleMenu}>Cerrar</NavButton></NavItem>
                    </NavList>
                </NavBar>
                }
        </HeaderContainer>
    )
}

export default Header;