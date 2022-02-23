import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const HeaderContainer = styled.header`
    width: 100%;
`

export const HeaderBar = styled.div `
    height: 80px;
    width: 100%;
    padding: 5px 20px 5px 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 3px solid rgba(0,0,0,0.9);
    background-color: white;
    svg{
        width: 30px;
        height: 30px;
        color: #3b2284;
    }
    `;
    
export const Logo = styled.div`
    widht: 40%;
    height: 100%;
    max-width: 300px;
    display: flex;
    align-items: center;
    img{
        height: 95%;
    }
    `;

export const NavBar = styled.nav`
    width: 100%;
    max-width: 450px;
    position: absolute;
    z-index: 5;
    top: 81px;
    right: 0px;
    button{
        width: 100%;
        height: 100%;
        display: block;
        background: none;
        border: none;
    }
    button:hover{
        background-color: rgba(0,0,0,0.5);
    }
    `;

export const NavList = styled.ul`
    margin: 0;
    padding: 0;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 5px 15px 0px rgba(0,0,0,0.5);
`;

export const NavItem = styled.li`
    width: 100%;
    border: (3px 3px 0 3px) solid white;
    list-style: none;
    text-align: center;
    a{
        width: 100%;
        height: 100%;
        display: block;
        padding: 10px;
        box-sizing: border-box;
    }
    a:hover{
        background-color: rgba(0,0,0,0.2);
    }
`;

export const NavButton = styled.button`
    width: 100%;
    height: 100%;
    display: block;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    background: none;
`;

export const SocialNavBar = styled.ul`
    width: 100%;
    display: 'flex;
    flexDirection: row;
    justify-content: space-around;
    padding: 20px;
    box-sizing: border-box;
`;

export const SocialNavItem = styled.li`
    list-style: none;
`;

export const SocialNavButton = styled.a`
    width: 30px;
    height: 30px;
    display: inline-block;
`;

export const slideIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const slideOut = keyframes`
    0% {
        opacity: 1;
    }
    100%{
        opacity: 0;
    }
`