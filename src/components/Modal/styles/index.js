import React from "react";
import styled from "@emotion/styled";

export const ModalWrapper = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
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
  width: 100%;
  border-radius: 10px;
  margin: 10px;
  z-index: 9999;
  @media (min-width: 480px) {
    max-width: 480px;
  }

  @media (min-width: 768px) {
    max-width: ${(props) => (props.size === "sm" ? "480px" : "768px")};
  }

  @media (min-width: 1024px) {
    max-width: ${(props) =>
      props.size === "sm" ? "480px" : props.size === "md" ? "768px" : "1024px"};
  }
`;

export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: column;
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
  padding: 0;
  font-size: 1.4rem;
  text-align: center;
`;
