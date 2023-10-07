import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConsturctor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import React from "react";
import { api } from "../../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  const dispatch = useDispatch();
  const { isLoading, loadingSuccess, burgerIngredients } = useSelector((store) => store.burger);
  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return !isLoading ? (
    <>
      <AppHeader />
      <main className={appStyles.main}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConsturctor />
        </DndProvider>
      </main>
    </>
  ) : (
    <p>Загрузка...</p>
  );
}

export default App;
