import React from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {
  InputContainer,
  TextAreaContainer,
  LabelContainer,
  ButtonContainer,
  ButtonGroup as ButtonGroupStyle,
  SelectContainer,
  TextEditorContainer
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
  disabled,
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
      disabled={disabled}
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

export const ButtonGroup = ({align, children}) => {
    return (
        <ButtonGroupStyle align={align}>
            {children}
        </ButtonGroupStyle>
    )
}

export const TextEditor = ({  name, data, onChange}) => {
  return(
    <TextEditorContainer>
      <CKEditor
        editor={ClassicEditor}
        name={name}
        data={data}
        onChange={onChange}
      />
    </TextEditorContainer>
  )
}

export const Select = ({children, name, onChange, value, defaultValue}) => {
  return(
    <SelectContainer 
      name={name}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    >{children}</SelectContainer>
  )
}