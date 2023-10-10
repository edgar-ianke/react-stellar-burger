import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions";

const modalRoot = document.getElementById("modal-root");

export default function Modal(props) {
  const dispatch = useDispatch();
  const isLoading = useSelector((store) => store.burger.isLoading);
  const handleClose = () => {
    dispatch({type: CLOSE_MODAL});
  };
  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={modalStyles.modal}>
        {!isLoading && props.children}
        <div className={modalStyles.closeIcon} onClick={handleClose}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </>,
    modalRoot
  );
}
