import burgerConstructorStyle from "./burger-constructor.module.css";
import { ConstructorElement, CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_INGREDIENT } from "../../services/actions/burger";
import { useDrop } from "react-dnd";
import { v4 as uuidv4 } from "uuid";
import thumbNail from "../../img/thumbNail.png";
import { postOrder } from "../../services/actions/burger";
import OrderDetails from "../order-details/order-details";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import Modal from "../modal/modal";
import { useNavigate } from "react-router-dom";

export default function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((store) => store.burger.constructorIngredients);
  const { visible, isOrderEmpty, createdOrder, isOrderLoading } = useSelector((store) => store.burger);
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();

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
    if (user) {
      const orderIds = [bun, ...ingredients, bun];
      return dispatch(postOrder(orderIds));
    }
    return navigate("/login");
  };
  const content = (
    <div>
      <div className={`${burgerConstructorStyle.bun} pb-4`}>
        {Boolean(bun) ? (
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun?.name} (верх)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        ) : (
          <ConstructorElement
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
            return <BurgerConstructorElement index={i} key={item.key} data={item} />;
          })}
        </ul>
      }
      <div className={`${burgerConstructorStyle.bun} pt-4`}>
        {Boolean(bun) ? (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun?.name} (низ)`}
            price={bun?.price}
            thumbnail={bun?.image}
          />
        ) : (
          <ConstructorElement
            type="bottom"
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
        {
          <Button
            disabled={isOrderLoading}
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
