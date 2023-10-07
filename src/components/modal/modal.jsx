import modalStyles from "./modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes, { element } from "prop-types";
import ReactDOM from "react-dom";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Loader from "react-js-loader";
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
        {isLoading && (
          <div className={modalStyles.loader}>
            <Loader type="spinner-default" bgColor={"#FFFFFF"} title={""} color={"#FFFFFF"} size={100} />
          </div>
        )}
        {!isLoading && props.children}
        <div className={modalStyles.closeIcon} onClick={handleClose}>
          <CloseIcon type="primary" />
        </div>
      </div>
    </>,
    modalRoot
  );
}
// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
//   children: PropTypes.arrayOf(element.isRequired).isRequired,
//   openModal: PropTypes.func,
//   isLoading: PropTypes.bool,
// };
