import styled from "@emotion/styled";

export const LoginContainer = styled.section`
  display: flex;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 60%;
  .logo {
    height: 100vh;
    width: 100%;
    object-fit: cover;
  }

  @-webkit-keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }
  @keyframes heartbeat {
    from {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: center center;
      transform-origin: center center;
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    10% {
      -webkit-transform: scale(0.91);
      transform: scale(0.91);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    17% {
      -webkit-transform: scale(0.98);
      transform: scale(0.98);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
    33% {
      -webkit-transform: scale(0.87);
      transform: scale(0.87);
      -webkit-animation-timing-function: ease-in;
      animation-timing-function: ease-in;
    }
    45% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-animation-timing-function: ease-out;
      animation-timing-function: ease-out;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40%;
  background: #ebf5f0;
  @media (max-width: 768px) {
    min-height: 100vh;
    width: 100%;
    padding: 0 0.5rem;
  }
`;

export const Label = styled.label`
  margin: 2rem 0 0 0;
  font-weight: 500;
  font-size: 14px;
  margin: 0.5rem 0;
  span {
    color: red;
  }
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: rgb(0 0 0 / 10%) 0px 4px 6px -1px,
    rgb(0 0 0 / 6%) 0px 2px 4px -1px;
  width: 400px;
  min-width: 300px;
  max-width: 100%;
  min-height: 300px;
  height: 100%;
  flex: 1;
  max-height: 600px;
  background: #ffffff;
  border-width: 0px;
  border-style: solid;
  border-color: rgb(226, 232, 240);
  border-radius: 10px;
  padding: 2rem;
  h1 {
    margin: 0;
    text-align: center;
    font-size: 1.5rem;
  }
  p {
    margin: 0;
    color: gray;
    font-size: 12px;
    text-align: center;
    margin: 0 0 0.4rem 0;
  }
  @media (max-width: 768px) {
    height: 550px;
  }
`;

export const LoginFooter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  * {
    margin: 4px 0;
    cursor: pointer;
  }
`;
