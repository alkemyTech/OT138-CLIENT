import styled from "@emotion/styled";

export const InputContainer = styled.input`
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
  margin: 0 0 0.5rem 0;
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  [type="number"] {
    -moz-appearance: textfield;
  }
  input[type="date"]:after {
    content: attr(placeholder);
  }
`;

export const TextAreaContainer = styled.textarea`
  min-width: 180px;
  width: 100%;
  background: #edf2f7;
  border: none;
  font-size: 1rem;
  height: 2.5rem;
  border-radius: 0.25rem;
  border: 2px solid transparent;
  transition: all 0.2s ease 0s;
  outline: none;
  margin: 0 0 0.5rem 0;
  min-height: 48px;
  height: 100px;
  padding: 10px 5px;
  /* Chrome, Safari, Edge, Opera */
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  [type="number"] {
    -moz-appearance: textfield;
  }
`;

export const LabelContainer = styled.label`
  margin: 2rem 0 0 0;
  font-weight: 500;
  font-size: 16px;
  margin: 0.5rem 0;
  color: var(--titles-color);
  span {
    color: red;
  }
`;

export const ButtonContainer = styled.button`
  height: 45px;
  background: #000000;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  max-width: 200px;
  width: 100%;
  &:hover {
    transform: scale(1.02);
  }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: ${props => props.align === "center" ? 'center' : props.align === "end" ? "flex-end" : 'flex-start'};
`;

export const SelectContainer = styled.select`
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
  margin: 0 0 0.5rem 0;
`

export const TextEditorContainer = styled.div`
  .ck-editor{
    width: 100%;
    margin-bottom: 20px;
    background-color: #edf2f7;
  }

`;