import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useRef } from "react";
import burgerIngredientsStyles from "./burger-ingredients.module.css";
import { useSelector } from "../../services/hooks/hooks";
import Ingredient from "../ingredient/ingredient";

export default function BurgerIngredients() {
  const ingredients = useSelector((store) => store.burger.burgerIngredients);
  const tabsRef = useRef<HTMLHeadingElement>(null);
  const bunRef = useRef<HTMLHeadingElement>(null);
  const sauceRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLHeadingElement>(null);
  const tabBar = [
    { name: "Булки", type: "bun", ref: bunRef },
    { name: "Соусы", type: "sauce", ref: sauceRef },
    { name: "Начинки", type: "main", ref: mainRef },
  ];

  const [activeTab, setActiveTab] = React.useState(tabBar[0].name);

  const handleTabClick = (ref: React.RefObject<HTMLHeadingElement>) => {
    ref.current && ref.current.scrollIntoView({ behavior: "smooth" }) ;
  };
  const handleScroll = () => {
    const distances: Array<{ name: string; distance: number }> = [];
    tabBar.forEach((item) => {
      if (item.ref.current && tabsRef.current) {
        distances.push({
          name: item.name,
          distance: Math.abs(item.ref.current.getBoundingClientRect().y - tabsRef.current.getBoundingClientRect().y),
        });
      }
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
              <h2 ref={tab.ref} className="text text_type_main-medium pt-10">
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
