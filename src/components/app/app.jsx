import AppHeader from "../app-header/app-header";
import appStyles from "./app.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions/burger";
import burgerImg from "../../img/burger-neon.svg";
import Login from "../../pages/authorization/login";
import Registration from "../../pages/authorization/registration";
import ForgotPassword from "../../pages/authorization/forgot-password";
import ResetPassword from "../../pages/authorization/reset-password";
import HomePage from "../../pages/home/home";
import Profile from "../../pages/authorization/profile";
import { Routes, Route, useLocation } from "react-router-dom";
import OrderHistory from "../../pages/order-hist/order-hist";
import { checkAuth } from "../../services/actions/user";
import { OnlyAuth, OnlyUnAuth } from "../protected-route";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Page404 from "../../pages/page404";
import Feed from "../../pages/feed/feed";
import OrderInfo from "../order-info/orderInfo";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isIngredientsLoading } = useSelector((store) => store.burger);
  const background = location.state && location.state.background;
  React.useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkAuth());
  }, []);

  return !isIngredientsLoading ? (
    <>
      <AppHeader />
      <Routes>
        <Route path="/" element={<HomePage />}>
          {background && (
            <Route
              path="/ingredients/:ingredientId"
              element={
                <Modal redirectTo={"/"}>
                  <IngredientDetails />
                </Modal>
              }
            />
          )}
        </Route>
        <Route path="/feed" element={<Feed />}>
          {background && (
            <Route
              path="/feed/:orderId"
              element={
                <Modal redirectTo={"/feed"}>
                  <OrderInfo />
                </Modal>
              }
            />
          )}
        </Route>
        <Route path="/login" element={<OnlyUnAuth component={<Login />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPassword />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<Registration />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPassword />} />} />
        <Route path="/profile/user" element={<OnlyAuth component={<Profile />} />} />
        <Route path="/profile/orders" element={<OnlyAuth component={<OrderHistory />} />}>
          {background && (
            <Route
              path="/profile/orders/:orderId"
              element={
                <Modal redirectTo={"/profile/orders"}>
                  <OrderInfo user={true} />
                </Modal>
              }
            />
          )}
        </Route>
        {!background && (
          <Route
            path="/ingredients/:ingredientId"
            element={
              <div className={appStyles.background}>
                <IngredientDetails />
              </div>
            }
          />
        )}
        {!background && (
          <Route
            path="/feed/:orderId"
            element={
              <div className={appStyles.background}>
                <OrderInfo />
              </div>
            }
          />
        )}
        {!background && (
          <Route
            path="/profile/orders/:orderId"
            element={
              <div className={appStyles.background}>
                <OrderInfo user={true} />
              </div>
            }
          />
        )}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  ) : (
    <img alt="loader" src={burgerImg} className={appStyles.loader} />
  );
}

export default App;
