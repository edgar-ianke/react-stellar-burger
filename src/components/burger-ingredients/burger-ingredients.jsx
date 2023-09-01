import { Counter, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import IngredientsSection from "../ingredients-section/ingredients-section";

export default function BurgerIngredients() {
  const [activeTab, setactiveTab] = React.useState("Булки");
  const handleClick = (e) => {
    setactiveTab(e)
  };
  return (
    <>
      <section className={burgerIngredientsStyles.main}>
        <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
        <div className={`${burgerIngredientsStyles.tabs} mb-10`}>
          <Tab value="Булки" active={activeTab === "Булки"} onClick={handleClick}>
            Булки
          </Tab>
          <Tab value="Соусы" active={activeTab === "Соусы"} onClick={handleClick}>
            Соусы
          </Tab>
          <Tab value="Начинки" active={activeTab === "Начинки"} onClick={handleClick}>
            Начинки
          </Tab>
        </div>
        <IngredientsSection />
      </section>
    </>
  );
}
