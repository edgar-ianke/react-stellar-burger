import React from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";

export default function ModalOverlay({ handleClose, children }) {
  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      handleClose();
    }
  };
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      handleClose();
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []);
  return (
    <div onClick={handleOverlayClose} className={ModalOverlayStyles.main}>
      {children}
    </div>
  );
}
