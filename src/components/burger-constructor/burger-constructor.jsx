import burgerConstructorStyle from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT, CLOSE_MODAL, REMOVE_INGREDIENT } from "../../services/actions";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import thumbNail from "../../img/drag.png";
import { postOrderThunk } from "../../services/actions";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.burger.constructorIngredients);
  const { visible, isOrderEmpty, isLoading, createdOrder } = useSelector((store) => store.burger);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => {
      return dispatch({ type: ADD_INGREDIENT, data: { ...item.data, key: uuidv4() } });
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const handleDelete = (key) => {
    dispatch({ type: REMOVE_INGREDIENT, key: key });
  };
  const mainStyle = isOver ? burgerConstructorStyle.mainOnHover : burgerConstructorStyle.main;
  const totalPrice = useMemo(() => {
    if (isOrderEmpty) {
      return 0;
    } else {
      return (Boolean(bun) && bun?.price * 2) + ingredients?.reduce((acc, currVal) => acc + currVal.price, 0);
    }
  }, [ingredients, bun, isOrderEmpty]);

  dispatch(postOrderThunk(orderIds))

  // const getOrderIds = () => {
  //   const orderIds = ingredients.map((item) => {
  //     console.log(item);
  //     return item._id;
  //   });
  //   orderIds.push(bun._id);
  //   orderIds.unshift(bun._id);
  //   return orderIds;
  // };

  const openModal = () => {
    setLoading(true);
    setVisible(true);
    api.postOrder(getOrderIds()).then((res) => {
      setOrder(res.order.number);
      setLoading(false);
    });
  };
  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };
  // const modal = <OrderDetails orderNumber={orderNumber} isLoading={isLoading} onClose={closeModal}></OrderDetails>;
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
            return (
              <li key={i} className={burgerConstructorStyle.ingr}>
                <span className={burgerConstructorStyle.drag}>
                  <DragIcon type="primary" />
                </span>
                <ConstructorElement
                  key={i}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                  handleClose={() => handleDelete(item.key)}
                />
              </li>
            );
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
        <Button htmlType="button" type="primary" size="large" extraClass="ml-10 mr-4">
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
      {/* {visible && modal} */}
    </>
  );
}
