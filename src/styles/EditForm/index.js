import styled from "@emotion/styled";

export const Container = styled.div`
  width: 900px;
  height: auto;
  margin: auto;
  @media (max-width: 1000px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    table {
      width: 100%;
    }

    table td[data-titulo] {
      text-align: left;
    }

    table td[data-titulo]::before {
      content: attr(data-titulo);
      margin-right: 5px;
      color: #69dadb;
      font-weight: bold;
    }

    table tr {
      display: flex;
      flex-direction: column;
      border: 2px solid #1f1d36;
      border-radius: 5px;
      padding: 1em;
      margin: 10px;
      margin-bottom: 1em;
      background-color: #191a19;
      color: #fff;
    }

    table td {
      border: none;
      background: none !important;
    }

    table thead {
      display: none;
    }
  }
`;

export const Form = styled.form`
  padding: 30px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 0px 10px 10px 0px;
  @media (max-width: 1298px) {
    border-radius: 0px 0px 10px 10px;
  }
`;

export const Input = styled.input`
  border: none;
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  outline: none;
  border-radius: 5px;
  background-color: #e6e6e7;
  font-size: 15px;
`;

export const Button = styled.button`
  border: none;
  background-color: #116530;
  color: #fff;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  transition: 500ms ease;
  * {
    margin: 0px 5px;
  }
  &:hover {
    background-color: #357c3c;
  }
`;

export const ButtonUpdate = styled.button`
  border: none;
  padding: 5px 10px;
  background: #357c3c;
  border-radius: 10px;
  color: #fff;
  margin: 5px;
  cursor: pointer;
`;

export const ButtonDelete = styled.button`
  border: none;
  padding: 5px 10px;
  background: #ff1700;
  border-radius: 10px;
  color: #fff;
  margin: 5px;
  cursor: pointer;
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
  width: 100%;
  tr,
  td,
  th {
    border: solid 2px #283618;
    text-align: center;
    padding: 10px;
  }
`;

export const ContainerModal = styled.div`
  width: ${(props) => props.width && props.width};
  height: ${(props) => props.height && props.height};
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transition: 500ms ease all;
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
