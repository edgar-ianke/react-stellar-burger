import feedStyles from "./feed.module.css";
import { useEffect, useMemo } from "react";
import { WS_CLOSE_CONNECTION, WS_CONNECTION_CLOSED, WS_CONNECTION_START } from "../../services/actions/feed";
import {Orders} from "../../components/orders/orders";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "../../services/hooks/hooks";

export default function Feed() {
  const { orders, total, totalToday } = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CLOSE_CONNECTION });
    }
  }, []);
  const doneOrders = useMemo(() => orders?.filter((order) => order.status === "done").slice(0, 5), [orders]);

  const preparingOrders = useMemo(
    () => orders?.filter((order) => order.status === "pending" || order.status === "created").slice(0, 5),
    [orders]
  );

  return (
    <div className={feedStyles.main}>
      <Outlet />
      <h2 className="text text_type_main-large">Лента заказов</h2>
      <div className={feedStyles.content}>
        <Orders />
        <div className={feedStyles.stats}>
          <div className={feedStyles.sectionInfo}>
            <div className={feedStyles.board}>
              <h3 className="text text_type_main-medium">Готовы:</h3>
              <ul className={feedStyles.list}>
                {doneOrders?.map((item, i) => (
                  <li key={i} className={`${feedStyles.ready} text text_type_digits-default pb-2`}>
                    {item.number}
                  </li>
                ))}
              </ul>
            </div>
            <div className={feedStyles.board}>
              <h3 className="text text_type_main-medium">В работе:</h3>
              <ul className={feedStyles.list}>
                {preparingOrders?.map((item, i) => (
                  <li key={i} className={`${feedStyles.ready} text text_type_digits-default pb-2`}>
                    {item.number}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text text_type_main-medium pt-10">Выполнено за все время:</p>
          <p className={`${feedStyles.glow} text text_type_digits-large`}>{total}</p>
          <p className="text text_type_main-medium pt-10">Выполнено за сегодня:</p>
          <p className={`${feedStyles.glow} text text_type_digits-large`}>{totalToday}</p>
        </div>
      </div>
    </div>
  );
}
