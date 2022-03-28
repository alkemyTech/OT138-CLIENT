import styled from "@emotion/styled";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  box-shadow: 0px 2px 0px rgb(0 0 0 / 10%);
  a {
    width: fit-content;
  }
`;

export const HeaderBar = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  height: 4rem;
  width: 100%;
  max-width: 1440px;
  background-color: #fff;
  @media (max-width: 960px) {
    grid-template-columns: auto 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4rem;

  .logo__title {
    font-size: 1.2rem;
  }
  img {
    height: 75%;
    padding: 0 0.5rem;
  }
  @media (max-width: 960px) {
    .logo__title {
      margin: 0 0 0 10px;
    }
    img {
      padding: 0;
    }
  }
`;

export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: fit-content;
  button {
    width: 100%;
    height: 100%;
    display: block;
    background: none;
    border: none;
  }
  button:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .active {
    font-weight: bold;
  }
`;

export const NavList = styled.div`
  margin: 0;
  padding: 0;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px 0px rgba(0, 0, 0, 0.5);
`;

export const NavItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.textAlign === 'left' ? 'flext-start' : 'center'};
  text-align: center;
  margin: 0 10px;
  a {
    font-size: 16px;
  }
  svg {
    font-size: 16px;
    margin: 0 5px 0 0;
  }
  z-index: 2;
  @media (max-width: 960px) {
    display: none;
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

export const Avatar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-end;
  padding: 0 0.5rem;
  position: relative;
  cursor: pointer;
  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }
  svg {
    font-size: 16px;
  }
  p {
    font-size: 16px;
    margin: 0 5px;
  }
  @media (max-width: 1000px) {
    p {
      display: none;
    }
  }
`;

export const Hamburger = styled.div`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-self: flex-start;
  padding: 0 0.5rem;
  cursor: pointer;
  @media (max-width: 960px) {
    display: flex;
    font-size: 30px;
  }
`;

export const MobileNavBar = styled.div`
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4rem;
  z-index: 10;

  width: 100%;
  background: #fff;
  border-radius: 0 0 5px 5px;
  @media (max-width: 960px) {
    display: ${({ menuState }) => (menuState ? "flex" : "none")};
  }
  .active {
    font-weight: bold;
  }
`;
export const MobileItem = styled.div`
  display: none;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 10px 0;
  a {
    font-size: 16px;
  }
  svg {
    font-size: 16px;
    margin: 0 5px 0 0;
  }
  z-index: 3;

  display: ${({ open }) => (open ? "flex" : "none")};
  @media (max-width: 960px) {
    display: flex;
  }
`;

export const ProfileDropdown = styled.div`
  display: ${({ dropdownState }) => (dropdownState ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  min-width: 140px;
  width: 100%;
  background: #fff;
  position: absolute;
  top: 4.1rem;
  right: 0;
  z-index: 3;
  box-shadow: rgb(0 0 0 / 20%) 0px 8px 16px 0px;
  padding: 2rem 1rem;
  border-radius: 5px;
  a {
    margin: 4px 0;
    cursor: pointer;
  }
`;

export const LinksDropdown = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
  margin: 0;
  
  .dropdown__name {
    padding: 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .dropdown__content {
    border-radius: 5px;
    display: none;
    flex-direction: column;
    position: absolute;
    gap: 10px;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 2rem 1rem;
    z-index: 1;
  }

  &:hover .dropdown__content {
    display: flex;
  }

  @media (max-width: 960px) {
    display: none;
  }
`;

export const SessionButton = styled.button`
  height: 40px;
  background: #584afa;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  max-width: 140px;
  width: 100%;
  font-weight: bold;
  align-self: center;
  justify-self: flex-end;
  margin: 0 0.5rem;
  &:hover {
    transform: scale(1.02);
  }
`;
