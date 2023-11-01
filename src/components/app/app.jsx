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
import HomePage from "../../pages/home";
import Profile from "../../pages/authorization/profile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderHistory from "../../pages/authorization/order-hist";
import { userThunk } from "../../services/actions/user";
function App() {
  const dispatch = useDispatch();
  const { isIngredientsLoading } = useSelector((store) => store.burger);
  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return !isIngredientsLoading ? (
    <>
      <Router>
        <AppHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile/user" element={<Profile />} />
          <Route path="/profile/history" element={<OrderHistory />} />
        </Routes>
      </Router>
    </>
  ) : (
    <img alt="loader" src={burgerImg} className={appStyles.loader} />
  );
}

export default App;
