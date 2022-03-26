import React from "react";
import { Modal as ResponsiveModal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";

export default function Modal({ children, ...rest }) {
  return (
    <ResponsiveModal styles={modalStyles} {...rest}>
      {children}
    </ResponsiveModal>
  );
}

const modalStyles = {
  modalContainer: {
    padding: "0.5rem",
  },
  modal: {
    borderRadius: "5px",
    width: "100%",
    maxWidth: "500px",
    margin: "0",
  },
};
