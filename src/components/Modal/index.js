import React from "react";
import {
  ModalContainer,
  ModalWrapper,
  ModalBody as ModalBodyStyle,
  ModalHeader as ModalHeaderStyle,
  ModalTitle as ModalTitleStyle,
  CloseButton,
} from "./styles";

export default function Modal({ children, show = false, onClose, size }) {
  return (
    show && (
      <ModalWrapper show={show}>
        <main>
          <ModalContainer size={size}>
            <CloseButton onClick={onClose}>✕</CloseButton>
            {children}
          </ModalContainer>
        </main>
      </ModalWrapper>
    )
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
