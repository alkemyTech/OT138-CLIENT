import React from "react";
import styled from "@emotion/styled";
import { ButtonContainer } from "../../Inputs/styles";

export const FormStyle = styled.form`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
`;

export const SubmitButton = styled(ButtonContainer)`
  background: rgb(0, 150, 0);
`;

export const CancelButton = styled(ButtonContainer)`
  background: rgb(110, 110, 110);
`;

export const InputFeedback = styled.div`
    color: ${props => props.type === 'error' ? 'rgb(240,0,0)' : '#000'};
    font-size: 0.9em;
`;