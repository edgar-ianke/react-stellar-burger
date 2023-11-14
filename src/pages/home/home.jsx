import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import homeSttyles from "./home.module.css";
import { Outlet } from "react-router-dom";

export default function HomePage() {
  return (
    <main className={homeSttyles.main}>
      <Outlet />
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}
