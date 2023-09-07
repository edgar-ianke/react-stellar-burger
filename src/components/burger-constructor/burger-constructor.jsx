import burgerConsturctorStyles from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import OrderDetails from "../order-details/order-details";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

export default function BurgerConsturctor(props) {
  const bun = props.data.filter((item) => item.type === "bun")[0];
  const [visible, setVisible] = React.useState(false);

  const cart = props.data.map((item) => {
    return item.type !== "bun" && item.price;
  });
  const totalPrice = bun.price + cart.reduce((acc, currVal) => acc + currVal, 0);

  const openModal = () => {
    setVisible(true);
  };
  const closeModal = () => {
    setVisible(false);
  };

  const modal = <OrderDetails onClose={closeModal}></OrderDetails>;

  return (
    <>
      <section className={`${burgerConsturctorStyles.main} pt-25`}>
        <div className={`${burgerConsturctorStyles.bun} pb-4`}>
          <ConstructorElement
            key={-1}
            type="top"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <ul className={burgerConsturctorStyles.products}>
          {props.data.map((item, i) => {
            return (
              item.type !== "bun" && (
                <li key={i} className={burgerConsturctorStyles.ingr}>
                  <span className={burgerConsturctorStyles.drag}>
                    <DragIcon type="primary" />
                  </span>
                  <ConstructorElement text={item.name} price={item.price} thumbnail={item.image} />
                </li>
              )
            );
          })}
        </ul>
        <div className={`${burgerConsturctorStyles.bun} pt-4`}>
          <ConstructorElement
            key={-2}
            type="bottom"
            isLocked={true}
            text={bun.name}
            price={bun.price}
            thumbnail={bun.image}
          />
        </div>
        <div className={`${burgerConsturctorStyles.priceSection} pt-10`}>
          <p className="text text_type_digits-medium">{totalPrice}</p>
          <span className={burgerConsturctorStyles.icon}>
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
BurgerConsturctor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
