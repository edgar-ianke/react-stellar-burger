import burgerConstructorStyle from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo } from "react";
import { ADD_INGREDIENT } from "../../services/actions/burger";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import thumbNail from "../../img/thumbNail.png";

import { postOrder } from "../../services/actions/burger";
import OrderDetails from "../order-details/order-details";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import { TIngredient } from "../../services/types";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.burger.constructorIngredients);
  const { visible, isOrderEmpty, createdOrder, isOrderLoading } = useSelector((store) => store.burger);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  interface IItem {
    data: TIngredient;
  }
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item: IItem) => {
      return dispatch({ type: ADD_INGREDIENT, data: { ...item.data, key: uuidv4() } });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const mainStyle = isOver ? burgerConstructorStyle.mainOnHover : burgerConstructorStyle.main;
  const totalPrice = useMemo(() => {
    if (isOrderEmpty) {
      return 0;
    } else {
      const res = ingredients && ingredients.reduce((acc, currVal) => acc + currVal.price, 0);
      if (!!bun) {
        return bun.price * 2 + res;
      }
      return res;
    }
  }, [ingredients, bun, isOrderEmpty]);

  const submitOrder = () => {
    if (user && bun) {
      const orderIds = [bun, ...ingredients, bun];
      return dispatch(postOrder(orderIds));
    }
    return navigate("/login");
  };
  const checkOrder = useCallback(() => {
    if (isOrderLoading) {
      return true;
    } if (!bun){
      return true;
    }
   if (!ingredients[0]){
    return true;
  }
    return false;
  }, [bun, ingredients, isOrderLoading]);

  const content = (
    <div>
      <div className={`${burgerConstructorStyle.bun} pb-4`}>
        {!!bun ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun?.name} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        ) : null}
      </div>
      {
        <ul className={burgerConstructorStyle.products}>
          {ingredients[0] ? ingredients?.map((item, i) => {
            return <BurgerConstructorElement index={i} key={item.key} data={item} />;
          }): <p className="text text_type_main-medium pl-8 mt-20 mb-20">Перетащите хотя бы 1 ингредиент</p>}
        </ul>
      }
      <div className={`${burgerConstructorStyle.bun} pt-4`}>
        {!!bun ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun?.name} (низ)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        ) : <p className="text text_type_main-medium pl-8 mt-20 mb-20">Перетащите булку</p>}
      </div>
      <div className={`${burgerConstructorStyle.priceSection} pt-10`}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <span className={burgerConstructorStyle.icon}>
          <CurrencyIcon type="primary" />
        </span>
        {
          <Button
            disabled={checkOrder()}
            htmlType="button"
            onClick={submitOrder}
            type="primary"
            size="large"
            extraClass="ml-10 mr-4"
          >
            {isOrderLoading ? "Отправляем заказ на кухню..." : "Оформить заказ"}
          </Button>
        }
      </div>
    </div>
  );
  return (
    <>
      <section className={`${mainStyle} pt-25`} ref={drop}>
        {!isOrderEmpty ? (
          content
        ) : (
          <p className="text text_type_main-medium pl-4">Перетащите ингредиенты и булки для составления бургера</p>
        )}
      </section>
      {visible && Boolean(createdOrder) && (
        <Modal>
          <OrderDetails />
        </Modal>
      )}
    </>
  );
}
