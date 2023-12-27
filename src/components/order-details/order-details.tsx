import doneImg from "../../img/done.svg";
import orderDetailsStyles from "./order-details.module.css";
import { useSelector } from "../../services/hooks/hooks";

export default function OrderDetails() {
  const orderNumber = useSelector((store) => store.burger.createdOrder);
  return (
    <>
      <p className={orderDetailsStyles.orderNumber}>{orderNumber}</p>
      <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
      <div className={orderDetailsStyles.image}>
        <img alt="Заказ готовится" className={orderDetailsStyles.done} src={doneImg} />
        <div className={orderDetailsStyles.layer1}></div>
        <div className={orderDetailsStyles.layer2}></div>
        <div className={orderDetailsStyles.layer3}></div>
      </div>
      <p className="text text_type_main-default pt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive pt-2 pb-30">
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  );
}
