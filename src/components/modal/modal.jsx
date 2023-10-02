import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes, { element } from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
const modalRoot = document.getElementById("modal-root");

export default function Modal(props) {
  const handleClose = () => {
    props.onClose();
  };
  return ReactDOM.createPortal(
    <>
    <ModalOverlay onClose={props.onClose}/>
      <div className={modalStyles.modal}>
        {props.children}
        <div className={modalStyles.closeIcon} onClick={handleClose}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(element.isRequired).isRequired,
  openModal: PropTypes.func,
};