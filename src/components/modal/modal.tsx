import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import { CLOSE_MODAL } from "../../services/actions/burger";
import { useNavigate, useLocation } from "react-router-dom";
import React, { FC, ReactNode } from "react";
import { string } from "prop-types";
const modalRoot: any = document.getElementById("modal-root");

interface IModal {
  children: ReactNode;
  redirectTo?: string;
}

const Modal: FC<IModal> = ({ children, redirectTo = '/' }) => {
  const location = useLocation().pathname;
  const link = redirectTo;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burger.isLoading);
  const handleClose = () => {
    navigate(redirectTo, { replace: true });
    dispatch({ type: CLOSE_MODAL });
  };
  return ReactDOM.createPortal(
    <>
      <ModalOverlay handleClose={handleClose}>
        <div className={modalStyles.modal}>
          {!isLoading && children}
          <div className={modalStyles.closeIcon} onClick={handleClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
      </ModalOverlay>
    </>,
    modalRoot
  );
};

export default Modal;
