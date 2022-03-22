import React from "react";
import styled from "@emotion/styled";

export const ModalWrapper = styled.div`
<<<<<<< HEAD
  height: 100%;
  width: 100%;
  z-index: 9998;
=======
  padding-top: 15px;
  padding-bottom: 15px; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
>>>>>>> 2c0c6dd9438ecb5fb0fb2e12a09b199e9e888a4a
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show === true ? "flex" : "none")};
  overflow: hidden;

  main {
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const ModalContainer = styled.div`
  overflow: auto;
  position: relative;
  background-color: #fff;
  width: 100%;
  max-height: 100%;
  border-radius: 10px;
  z-index: 9999;
  margin: 10px;

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
