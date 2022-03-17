import styled from "@emotion/styled";

export const ContainColumn = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 900px;
  width: 100%;
  height: 500px;
  margin: auto 0;
`;

export const Image = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  width: 50%;
  border-radius: 10px 0px 0px 10px;
`;

export const Form = styled.form`
  padding: 30px;
  width: 50%;
  border-radius: 0px 10px 10px 0px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
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

export const Textarea = styled.textarea`
  border: none;
  display: block;
  width: 100%;
  outline: none;
  padding: 15px;
  margin-top: 20px;
  background-color: #e6e6e7;
  border-radius: 5px;
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
  transition: 500ms ease;
  &:hover {
    background-color: #357c3c;
  }
`;

export const MessageError = styled.span`
  color: #da1212;
  font-size: 12px;
  margin-left: 5px;
  font-weight: bold;
  display: block;
`;
