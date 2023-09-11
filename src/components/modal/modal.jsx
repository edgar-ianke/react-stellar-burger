import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes, { element } from "prop-types";

export default function Modal(props) {
  const handleClose = () => {
    props.onClose();
  };
  return (
    <ModalOverlay onClose={props.onClose}>
      <div className={modalStyles.modal}>
        {props.children}
        <div className={modalStyles.closeIcon} onClick={handleClose}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </ModalOverlay>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(element.isRequired).isRequired,
  openModal: PropTypes.func,
};
