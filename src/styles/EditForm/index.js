import styled from "@emotion/styled";

export const Container = styled.div`
  width: 1000px;
  height: auto;
  margin: auto;
  font-family: "Open Sans", sans-serif;
  text-align: center;
  @media (max-width: 1000px) {
    width: 100%;
  }
`;

export const Form = styled.form`
  background-color: #fff;
  width: 500px;
  text-align: left;
  padding: 20px 20px 50px 20px;
  font-family: "Open Sans", sans-serif;
  border-radius: 10px;
  margin: auto;
  margin-top: 100px;
  -webkit-box-shadow: 0px 2px 15px 2px #000000;
  box-shadow: 0px 2px 15px 2px #000000;
  @media (max-width: 500px) {
    width: 100%;
    margin-top: 20px;
  }
`;

export const Input = styled.input`
  font-family: "Open Sans", sans-serif;
  min-width: 180px;
  width: 100%;
  background: #edf2f7;
  border: none;
  font-size: 1rem;
  height: 48px;
  padding: 0 0.5rem;
  border-radius: 0.25rem;
  border: 2px solid transparent;
  transition: all 0.2s ease 0s;
  outline: none;
  margin: 10px 0px;
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
`;

export const Button = styled.button`
  background-color: #000000;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  max-width: 200px;
  margin: 5px 5px;
  font-family: "Open Sans", sans-serif;
  &:hover {
    transform: scale(1.02);
  }
`;

export const MessageError = styled.span`
  color: #da1212;
  font-size: 12px;
  margin-left: 5px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  display: block;
`;

export const Table = styled.table`
  margin-top: 2px;
  font-family: "Open Sans", sans-serif;
  box-sizing: border-box;
  text-align: center;
  border-collapse: separate;
  border-style: hidden;
  width: 100%;
  overflow-x: auto;
  table-layout: fixed;
  thead th {
    padding: 10px;
    background: #ddd;
  }

  tbody td {
    padding: 10px;
    word-wrap: break-word;
  }

  tbody tr:nth-of-type(odd) {
    background: #eee;
  }

  tbody tr:last-child {
    border-bottom: 2px solid #ddd;
  }

  @media (min-width: 850px) {
    table-layout: auto;
  }
`;

export const ContainerModal = styled.div`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: 1s ease;
  overflow: hidden;
  opacity: ${(props) => props.opacity && props.opacity};
  z-index: ${(props) => props.index && props.index};
`;

export const Modal = styled.div`
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};
  background-color: #2c3333;
  border-radius: 10px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: 500ms ease all;
  overflow: hidden;
  @media (max-width: 500px) {
    width: 100%;
  }
`;

export const ButtomModal = styled.button`
  border: none;
  background-color: #da1212;
  color: #fff;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  transition: 500ms ease;
  * {
    margin: 0px 5px;
  }
  &:hover {
    background-color: #dd4a48;
  }
`;
