import React from "react";
import styled from "@emotion/styled";
import { ButtonContainer } from "../../Inputs/styles";

export const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export const SubmitButton = styled(ButtonContainer)`
  background: rgb(0, 150, 0);
`;

export const CancelButton = styled(ButtonContainer)`
  background: rgb(110, 110, 110);
`;