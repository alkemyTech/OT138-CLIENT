import React from "react";
import SweetAlert from "sweetalert2-react";
export default function Alert({
  title,
  description,
  type,
  confirmButtonText,
  cancelButtonText,
  showConfirmButton,
  showCancelButton,
  confirmButtonColor,
  onConfirm,
  onCancel,
  show,
  setShow,
}) {
  return (
    <SweetAlert
      show={show}
      title={title}
      text={description}
      type={type}
      confirmButtonText={confirmButtonText ? confirmButtonText : "Ok"}
      cancelButtonText={cancelButtonText ? cancelButtonText : "Cancelar"}
      showCancelButton={showCancelButton}
      showConfirmButton={showConfirmButton}
      confirmButtonColor={confirmButtonColor ? confirmButtonColor : "green"}
      cancelButtonColor="red"
      onConfirm={onConfirm}
      onCancel={onCancel}
      onEscapeKey={() => setShow(false)}
      onOutsideClick={() => setShow(false)}
    />
  );
}
