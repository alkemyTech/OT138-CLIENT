import React from "react";
import styled from "@emotion/styled";

export const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show === true ? "flex" : "none")};
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: #fff;
  min-width: 230px;
  min-height: 200px;
  border-radius: 10px;
`;

export const ModalBody = styled.div`
  padding: 1rem;
`;

export const ModalHeader = styled.div`
  padding: 1rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 10px;
  top: 10px;
  border: 0;
  background: transparent;
  font-weight: 600;
  font-size: 1.3rem;
  cursor: pointer;
`;

export const ModalTitle = styled.h1`
    margin: 0;
    font-size: 1.3rem;
    text-align: center;
`;