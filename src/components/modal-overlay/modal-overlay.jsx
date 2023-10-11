import React from "react";
import ModalOverlayStyles from "./modal-overlay.module.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions";

export default function ModalOverlay() {
  const dispatch = useDispatch();
  const handleOverlayClose = (evt) => {
    if (evt.target === evt.currentTarget) {
      dispatch({ type: CLOSE_MODAL });
    }
  };
  const handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      dispatch({ type: CLOSE_MODAL });
    }
  };
  React.useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => document.addEventListener("keydown", handleEscClose);
  }, []);
  return <div onClick={handleOverlayClose} className={ModalOverlayStyles.main}></div>;
}
