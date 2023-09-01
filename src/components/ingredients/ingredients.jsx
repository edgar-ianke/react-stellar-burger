import { data } from "../../utils/data";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./ingredients.module.css";
import img from "../../images-test/bun-02.png";

export default function Ingredients({ data, type }) {
  return (
    <>
      <ul className={ingredientsStyles.container}>
        {data.map((ingredient) => {
          return (
            ingredient.type === type && (
              <li className={`${ingredientsStyles.card} pl-4 pr-6 pb-10 pt-6`}>
                <img src={ingredient.image} className={`${ingredientsStyles.img} pl-4 pb-1 pr-4`} />
                <div className={ingredientsStyles.price}>
                  <p className="text text_type_digits-default pr-1">{ingredient.price}</p>
                  <CurrencyIcon key={ingredient._id} type="primary" />
                </div>
                <p className={`${ingredientsStyles.name} text text_type_main-default`}>{ingredient.name}</p>
              </li>
            )
          );
        })}
      </ul>
    </>
  );
}
