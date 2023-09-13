import React from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";
import PropTypes from "prop-types";

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
    return () => document.addEventListener("keydown", handleEscClose);
  }, []);
  return <div onClick={handleOverlayClose} className={ModalOverlayStyles.main}></div>;
}
ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};