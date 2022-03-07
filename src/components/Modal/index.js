import React, { useState } from "react";
import {
  ModalContainer,
  ModalWrapper,
  ModalBody as ModalBodyStyle,
  ModalHeader as ModalHeaderStyle,
} from "./styles";

export default function ({ children, show = false, onClose }) {
  function handleBackdropClick() {
    if (onClose) {
      onClose();
    }
  }

  return (
    <ModalWrapper show={show} onClick={handleBackdropClick}>
      <ModalContainer>{children}</ModalContainer>
    </ModalWrapper>
  );
}

export function ModalHeader({ children }) {
  return <ModalHeaderStyle>{children}</ModalHeaderStyle>;
}

export function ModalBody({ children }) {
  return <ModalBodyStyle>{children}</ModalBodyStyle>;
}
