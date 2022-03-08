import React from "react";
import {
  ModalContainer,
  ModalWrapper,
  ModalBody as ModalBodyStyle,
  ModalHeader as ModalHeaderStyle,
  ModalTitle as ModalTitleStyle,
  CloseButton,
} from "./styles";

export default function ({ children, show = false, onClose, size }) {
  return (
    <ModalWrapper show={show}>
      <ModalContainer size={size}>
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

export function ModalTitle({ children }) {
  return <ModalTitleStyle>{children}</ModalTitleStyle>;
}
