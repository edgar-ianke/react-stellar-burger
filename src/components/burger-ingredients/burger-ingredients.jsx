import { Counter, Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import IngredientsSection from "../ingredients-section/ingredients-section";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { BurgerContext } from "../../services/burgerContext";

export default function BurgerIngredients() {
  const ingredients = React.useContext(BurgerContext)

  const tabBar = [
    { name: "Булки", type: "bun" },
    { name: "Соусы", type: "sauce" },
    { name: "Начинки", type: "main" },
  ];

  const [activeTab, setActiveTab] = React.useState(tabBar[0].name);
  const handleClick = (e) => {
    setActiveTab(e);
  };
  return (
    <>
      <section className={burgerIngredientsStyles.main}>
        <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
        <nav className={`${burgerIngredientsStyles.tabs}`}>
          {tabBar.map((el, i) => {
            return (
              <Tab key={i + 1} value={el.name} active={activeTab === el.name} onClick={handleClick}>
                {el.name}
              </Tab>
            );
          })}
        </nav>
        <IngredientsSection type={tabBar} data={ingredients.data}/>
      </section>
    </>
  );
}