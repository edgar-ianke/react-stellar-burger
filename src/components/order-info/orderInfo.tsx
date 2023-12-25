import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import orderInfoStyles from "./orderInfo.module.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import makeDictionary from "../../utils/makeDictionary";
import { statuses } from "../../utils/data";
import formatDate from "../../utils/formatDate";
import { useEffect } from "react";
import { WS_CONNECTION_START } from "../../services/actions/feed";
import { WS_USER_CONNECTION_START } from "../../services/actions/userFeed";

export default function OrderInfo({ user = false }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_USER_CONNECTION_START, payload: localStorage.getItem("accessToken")?.slice(7) });
    dispatch({ type: WS_CONNECTION_START });
  }, []);
  const ingredients = useSelector((store) => store.burger.burgerIngredients);
  const ordersAll = useSelector((store) => store.feed.orders);
  const ordersUser = useSelector((store) => store.userFeed.orders);
  const orders = user ? ordersUser : ordersAll;
  const ingredientDictionary = makeDictionary(ingredients);
  const id = useParams().orderId;
  const currentOrder = orders?.filter((item) => item._id === id)[0];
  const ingrs = currentOrder?.ingredients;
  const ingrsToRender = ingrs?.reduce(
    (acc: Record<string, { name: string; price: number; image: string; quantity: number }>, item: string) => {
      if (ingredientDictionary.hasOwnProperty(item)) {
        if (acc.hasOwnProperty(item)) {
          acc[item].quantity += 1;
        } else {
          acc[item] = {
            name: ingredientDictionary[item].name,
            price: ingredientDictionary[item].price,
            image: ingredientDictionary[item].image,
            quantity: 1,
          };
        }
      }
      return acc;
    },
    {}
  );
  const totalPrice = ingrs?.reduce((acc, item) => {
    if (ingredientDictionary.hasOwnProperty(item)) {
      return acc + ingredientDictionary[item].price;
    }
    return acc;
  }, 0);
  return (
    <div className={orderInfoStyles.main}>
      <p className={`${orderInfoStyles.number} text text_type_digits-default`}>{`#${currentOrder?.number}`}</p>
      <p className="pt-10 text text_type_main-medium">{currentOrder?.name}</p>
      <p className={`${orderInfoStyles.done} text text_type_main-default pt-3`}>
        {currentOrder && statuses[currentOrder.status]}
      </p>
      <p className={`text text_type_main-medium pt-15 pb-6`}>Состав:</p>
      <ul className={orderInfoStyles.ingrsContainer}>
        {ingrsToRender &&
          Object.values(ingrsToRender).map((item, i) => {
            return (
              <li key={i} className={orderInfoStyles.ingr}>
                <div className={orderInfoStyles.wrap}>
                  <div className={orderInfoStyles.back}>
                    <img className={orderInfoStyles.img} src={item.image} alt={item.name} />
                  </div>
                </div>
                <p className="text text_type_main-default">{item.name}</p>
                <div className={orderInfoStyles.price}>
                  <p className="text text_type_digits-default pr-2">
                    {item.quantity} X {item.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            );
          })}
      </ul>
      <div className={orderInfoStyles.timePriceContainer}>
        <p className="text text_type_main-default text_color_inactive">{currentOrder && formatDate(currentOrder.createdAt)}</p>
        <div className={orderInfoStyles.price}>
          <p className="text text_type_digits-default pr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
