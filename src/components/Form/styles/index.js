import React from "react";
import styled from "@emotion/styled";

export const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Button = styled.button`
  padding: 12px;
  border: 0;
  border-radius: 5px;
  color: #fff;
  font-size: 1.05em;
  min-width: 100px;
`;

export const SubmitButton = styled(Button)`
  background: rgb(0, 150, 0);
`;

export const CancelButton = styled(Button)`
  background: rgb(110, 110, 110);
`;
