import React from "react";
import ReactDOM from "react-dom";
import ModalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

export default function ModalOverlay(props) {
  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      props.onClose();
    }
  };
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      props.onClose();
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
  }, []);
  return ReactDOM.createPortal(
    <>
      <div onClick={handleOverlayClose} className={ModalOverlayStyles.main}>
        {props.children}
      </div>
    </>,
    modalRoot
  );
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};
