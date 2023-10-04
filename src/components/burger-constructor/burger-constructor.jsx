import burgerConstructorStyle from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { BurgerContext } from "../../services/burgerContext";
import { api } from "../../utils/Api";

export default function BurgerConstructor() {
  const ingredients = React.useContext(BurgerContext);
  const bun = ingredients.data.filter((item) => item.type === "bun")[0];
  const [visible, setVisible] = React.useState(false);
  const [orderNumber, setOrder] = React.useState(null);
  const [isLoading, setLoading] = React.useState(false);
  const cart = ingredients.data.map((item) => {
    return item.type !== "bun" && item.price;
  });
  const totalPrice = 2 * bun.price + cart.reduce((acc, currVal) => acc + currVal, 0);

  const getOrderIds = () => {
    const orderIds = cart.map((item) => item._id);
    orderIds.push(bun._id);
    orderIds.unshift(bun._id);
    return orderIds;
  };

  const openModal = () => {
    setLoading(true)
    setVisible(true);
    api.postOrder(getOrderIds()).then((res) => {
      setOrder(res.order.number);
      setLoading(false)

    })
  };
  const closeModal = () => {
    setVisible(false);
  };
  const modal = <OrderDetails orderNumber={orderNumber} isLoading={isLoading} onClose={closeModal}></OrderDetails>;

  return (
    <>
      <section className={`${burgerConstructorStyle.main} pt-25`}>
        <div className={`${burgerConstructorStyle.bun} pb-4`}>
          <ConstructorElement
            key={-1}
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={burgerConstructorStyle.products}>
          {ingredients.data.map((item, i) => {
            return (
              item.type !== "bun" && (
                <li key={i} className={burgerConstructorStyle.ingr}>
                  <span className={burgerConstructorStyle.drag}>
                    <DragIcon type="primary" />
                  </span>
                  <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
                </li>
              )
            );
          })}
        </ul>
        <div className={`${burgerConstructorStyle.bun} pt-4`}>
          <ConstructorElement
            key={-2}
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`${burgerConstructorStyle.priceSection} pt-10`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <span className={burgerConstructorStyle.icon}>
            <CurrencyIcon type="primary" />
          </span>
          <Button onClick={openModal} htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4">
            Оформить заказ
          </Button>
        </div>
      </section>
      {visible && modal}
    </>
  );
}
