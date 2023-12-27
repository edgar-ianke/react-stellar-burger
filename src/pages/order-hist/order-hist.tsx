import { useState, useEffect } from "react";
import profileStyles from "../authorization/authorization.module.css";
import { useDispatch } from "../../services/hooks/hooks";
import ProfileNav from "../../components/profile-nav/profile-nav";
import {Orders} from "../../components/orders/orders";
import orderHistStyles from "./order-hist.module.css";
import { WS_USER_CLOSE_CONNECTION, WS_USER_CONNECTION_START } from "../../services/actions/userFeed";
import { Outlet } from "react-router-dom";

export default function OrderHistory() {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch({ type: WS_USER_CONNECTION_START, payload: accessToken && accessToken.slice(7) });
    return () => {
      dispatch({ type: WS_USER_CLOSE_CONNECTION });
    };
  }, []);
  return (
    <div className={profileStyles.container}>
      <Outlet />
      <ProfileNav />
      <div className={orderHistStyles.main}>
        <Orders wide={true} user={true} />
      </div>
    </div>
  );
}
