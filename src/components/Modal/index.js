import React from "react";
import {
  ModalContainer,
  ModalWrapper,
  ModalBody as ModalBodyStyle,
  ModalHeader as ModalHeaderStyle,
  CloseButton
} from "./styles";

export default function ({ children, show = false, onClose }) {
  return (
    <ModalWrapper show={show}>
      <ModalContainer>
        <CloseButton onClick={onClose}>✕</CloseButton>
        {children}
      </ModalContainer>
    </ModalWrapper>
  );
}

export function ModalHeader({ children }) {
  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
}

export function ModalBody({ children }) {
  return <ModalBodyStyle>{children}</ModalBodyStyle>;
}
