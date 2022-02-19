import React from "react";
import { ContainerStyle, ContentStyle } from "./styles";

export const Containers = ({ children }) => {
  return <ContainerStyle>{children}</ContainerStyle>;
};

export const Content = ({ children }) => {
  return <ContentStyle>{children}</ContentStyle>;
};
