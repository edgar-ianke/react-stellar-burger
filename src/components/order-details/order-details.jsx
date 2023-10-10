import doneImg from "../../done.svg";
import orderDetailsStyles from "./order-details.module.css";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export default function OrderDetails() {
  const orderNumber = useSelector((store) => store.burger.createdOrder);
  return (
      <Modal>
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
