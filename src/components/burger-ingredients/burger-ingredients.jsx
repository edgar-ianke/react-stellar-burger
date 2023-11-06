import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { createRef } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { useSelector } from "react-redux";
import Ingredient from "../ingredient/ingredient";

export default function BurgerIngredients() {
  const ingredients = useSelector((store) => store.burger.burgerIngredients);
  const tabsRef = createRef();
  const bunRef = createRef();
  const sauceRef = createRef();
  const mainRef = createRef();
  const tabBar = [
    { name: "Булки", type: "bun", ref: bunRef },
    { name: "Соусы", type: "sauce", ref: sauceRef },
    { name: "Начинки", type: "main", ref: mainRef },
  ];

  const [activeTab, setActiveTab] = React.useState(tabBar[0].name);

  const handleTabClick = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleScroll = () => {
    const distances = [];
    tabBar.forEach((item) => {
      distances.push({
        name: item.name,
        distance: Math.abs(item.ref.current.getBoundingClientRect().y - tabsRef.current.getBoundingClientRect().y),
      });
      distances.sort((a, b) => a.distance - b.distance);
      setActiveTab(distances[0].name);
    });
  };

  return (
    <section className={burgerIngredientsStyles.main}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>
      <nav className={`${burgerIngredientsStyles.tabs}`} ref={tabsRef}>
        {tabBar.map((el, i) => {
          return (
            <Tab key={i + 1} value={el.name} active={activeTab === el.name} onClick={() => handleTabClick(el.ref)}>
              {el.name}
            </Tab>
          );
        })}
      </nav>
      <div className={burgerIngredientsStyles.section} onScroll={handleScroll}>
        {tabBar.map((tab, ind) => {
          return (
            <div key={ind}>
              <h2 ref={tab.ref} name={tab.type} className="text text_type_main-medium pt-10">
                {tab.name}
              </h2>
              <ul className={`${burgerIngredientsStyles.container}`}>
                {ingredients.map((item, i) => {
                  return tab.type === item.type && <Ingredient key={item._id} data={item} />;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
