import burgerConstructorStyle from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useCallback, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT } from "../../services/actions";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import thumbNail from "../../img/drag.png";
import { postOrderThunk } from "../../services/actions";
import OrderDetails from "../order-details/order-details";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import update from "immutability-helper";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.burger.constructorIngredients);
  const { visible, isOrderEmpty, createdOrder } = useSelector((store) => store.burger);
  const [cards, setCards] = useState([...ingredients]);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => {
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
      return (Boolean(bun) && bun?.price * 2) + ingredients?.reduce((acc, currVal) => acc + currVal.price, 0);
    }
  }, [ingredients, bun, isOrderEmpty]);

  const submitOrder = () => {
    const orderIds = [bun, ...ingredients, bun];
    dispatch(postOrderThunk(orderIds));
  };
  const content = (
    <div>
      <div className={`${burgerConstructorStyle.bun} pb-4`}>
        {Boolean(bun) ? (
          <ConstructorElement
            key={uuidv4()}
            type="top"
            isLocked={true}
            text={`${bun?.name} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        ) : (
          <ConstructorElement
            key={uuidv4()}
            type="top"
            isLocked={true}
            text="Перетащите булку :)"
            extraClass={burgerConstructorStyle.thumbNail}
          />
        )}
      </div>
      {
        <ul className={burgerConstructorStyle.products}>
          {ingredients?.map((item, i) => {
            return <BurgerConstructorElement index={i} key={i} data={item} />;
          })}
        </ul>
      }
      <div className={`${burgerConstructorStyle.bun} pt-4`}>
        {Boolean(bun) ? (
          <ConstructorElement
            key={uuidv4()}
            type="bot"
            isLocked={true}
            text={`${bun?.name} (низ)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        ) : (
          <ConstructorElement
            key={uuidv4()}
            type="bot"
            isLocked={true}
            text="Перетащите булку :)"
            thumbnail={thumbNail}
            extraClass={burgerConstructorStyle.thumbNail}
          />
        )}
      </div>
      <div className={`${burgerConstructorStyle.priceSection} pt-10`}>
        <p className="text text_type_digits-medium">{totalPrice}</p>
        <span className={burgerConstructorStyle.icon}>
          <CurrencyIcon type="primary" />
        </span>
        <Button htmlType="button" onClick={submitOrder} type="primary" size="large" extraClass="ml-10 mr-4">
          Оформить заказ
        </Button>
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
      {visible && Boolean(createdOrder) && <OrderDetails />}
    </>
  );
}
