import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConsturctor from "../burger-constructor/burger-constructor";
import appStyles from "./app.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import PuffLoader from "react-spinners/PuffLoader";

function App() {
  const dispatch = useDispatch();
  const { isIngredientsLoading } = useSelector((store) => store.burger);
  React.useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return !isIngredientsLoading ? (
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
    <div className={appStyles.loader}>
      <PuffLoader color="#ffffff" size={450} />
    </div>
  );
}

export default App;
