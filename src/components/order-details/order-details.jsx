import doneImg from "../../done.svg";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderDetailsStyles from "./order-details.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";

export default function OrderDetails(props) {
  const orderNumber = 1337;
  return (
      <Modal onClose={props.onClose} openModal={props.openModal}>
        <p className={orderDetailsStyles.orderNumber}>{orderNumber}</p>
        <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
        <img src={doneImg} />
        <p className="text text_type_main-default pt-15">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive pt-2 pb-30">
          Дождитесь готовности на орбитальной станции
        </p>
      </Modal>
  );
}
