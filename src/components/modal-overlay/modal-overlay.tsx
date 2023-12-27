import React, { FC, ReactNode } from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";

interface IModalOverlay {
  handleClose: () => void;
  children: ReactNode;
}

const ModalOverlay: FC<IModalOverlay> = ({ handleClose, children }) => {
  const handleOverlayClose = (evt: React.MouseEvent) => {
    if (evt.target === evt.currentTarget) {
      handleClose();
    }
  };
  const handleEscClose = (evt: KeyboardEvent) => {
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
};

export default ModalOverlay;
