import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ordersStyles from "./orders.module.css";
import formatDate from "../../utils/formatDate";
import {} from "../../services/actions/feed";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import makeDictionary from "../../utils/makeDictionary";
import { types } from "../../utils/data";
import { useMemo } from "react";

export default function Orders({ wide = false, user = false }) {
  const ingredients = useSelector((store) => store.burger.burgerIngredients);
  const location = useLocation();
  const ingredientDictionary = makeDictionary(ingredients);
  const ordersAll = useSelector((store) => store.feed.orders);
  const ordersUser = useSelector((store) => store.userFeed.orders);
  const orders = useMemo(() => (user ? ordersUser?.reverse() : ordersAll));

  return (
    <div className={ordersStyles.orders}>
      {orders?.map((order) => {
        const orderId = order._id;
        const link = user ? `/profile/orders/${orderId}` : `/feed/${orderId}`;
        const extra = order.ingredients.length > 6 ? order.ingredients.length - 6 : null;
        const ingrs = order.ingredients.slice(0, 6);
        const totalPrice = order.ingredients.reduce((acc, item) => {
          if (ingredientDictionary.hasOwnProperty(item)) {
            return acc + ingredientDictionary[item].price;
          }
          return acc;
        }, 0);

        return (
          <Link key={order.number} state={{ background: location }} to={link}>
            <div className={ordersStyles.orderCard}>
              <div className={ordersStyles.cardHeader}>
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">{formatDate(order.createdAt)}</p>
              </div>
              <p className={`text text_type_main-medium ${ordersStyles.orderName}`}>{order.name}</p>
              {wide && (
                <p
                  className={
                    order.status !== "done"
                      ? `text text_type_main-default`
                      : `${ordersStyles.done} text text_type_main-default`
                  }
                >
                  {types[order.status]}
                </p>
              )}
              <div className={ordersStyles.details}>
                <ul className={ordersStyles.ingrs}>
                  {ingrs.map((item, i) => {
                    if (ingredientDictionary.hasOwnProperty(item)) {
                      const { image } = ingredientDictionary[item];
                      if (extra && i === 5) {
                        return (
                          <li key={i} className={ordersStyles.wrap}>
                            <span className={ordersStyles.ingr}>
                              <p className={ordersStyles.dop}>{`+${extra}`}</p>
                              <img className={`${ordersStyles.img} ${ordersStyles.img_extra}`} src={image} />
                            </span>
                          </li>
                        );
                      }
                      return (
                        <li key={i} className={ordersStyles.wrap}>
                          <span className={ordersStyles.ingr}>
                            <img className={ordersStyles.img} src={image} />
                          </span>
                        </li>
                      );
                    }
                  })}
                </ul>
                <div className={ordersStyles.price}>
                  <p className="text text_type_digits-default pr-2">{totalPrice}</p>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
