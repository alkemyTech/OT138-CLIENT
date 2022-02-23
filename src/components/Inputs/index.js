import React from "react";

import {
  InputContainer,
  TextAreaContainer,
  LabelContainer,
  ButtonContainer,
} from "./styles";
export const Input = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  defaultValue,
  onKeyDown,
  onKeyPress,
  min,
  max,
}) => {
  return (
    <InputContainer
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
    ></InputContainer>
  );
};

export const Label = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  defaultValue,
  onKeyDown,
  onKeyPress,
  children,
}) => {
  return (
    <LabelContainer
      onKeyPress={onKeyPress}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >
      {children}
    </LabelContainer>
  );
};

export const TextArea = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  defaultValue,
  rows,
  columns,
  onKeyDown,
}) => {
  return (
    <TextAreaContainer
      onKeyDown={onKeyDown}
      rows={rows}
      columns={columns}
      placeholder={placeholder}
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    ></TextAreaContainer>
  );
};

export const Button = ({ children, name, type, onChange, onClick, style }) => {
  return (
    <ButtonContainer
      name={name}
      type={type}
      onChange={onChange}
      onClick={onClick}
      style={style}
    >
      {children}
    </ButtonContainer>
  );
};