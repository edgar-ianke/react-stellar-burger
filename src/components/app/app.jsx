import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConsturctor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import React, { useEffect } from "react";
import { api } from "../../utils/Api";

function App() {
  const [state, setState] = React.useState({ isLoading: null, data: [] });
  const getData = () => {
    setState({ ...state, isLoading: true });
    api
      .getData()
      .then((res) => {
        setState({ isLoading: false, data: res.data });
      })
      .catch((err) => {
        console.log(err);
        setState({ ...state, isLoading: false });
      });
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    state.isLoading === false && (
      <>
        <AppHeader />
        <main className={appStyles.main}>
          <BurgerIngredients data={state.data} />
          <BurgerConsturctor data={state.data} />
        </main>
      </>
    )
  );
}

export default App;
