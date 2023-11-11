import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/burger";
import { useNavigate } from "react-router-dom";
const modalRoot = document.getElementById("modal-root");

export default function Modal({ children, redirectTo = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burger.isLoading);
  const handleClose = () => {
    navigate(redirectTo, { replace: true });
    return dispatch({ type: CLOSE_MODAL });
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
}
