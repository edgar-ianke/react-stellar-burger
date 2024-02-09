import {  useParams } from "react-router-dom";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks/hooks";
import { SET_CURRENT_INGREDIENT } from "../../services/actions/burger";

export default function IngredientDetails() {
  const dispatch = useDispatch();
  const id = useParams().ingredientId;
  useEffect(() => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: id });
  }, []);
  const currentIngredient = useSelector((store) => store.burger.currentIngredient);
  return (
    <>
      <p className={ingredientDetailsStyles.title}>Детали ингредиента</p>
      <img className={ingredientDetailsStyles.img} src={currentIngredient?.image} />
      <p className="text text_type_main-medium pt-4 pb-8">{currentIngredient?.name}</p>
      <ul className={ingredientDetailsStyles.nutritionsList}>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.calories}</p>
        </li>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.proteins}</p>
        </li>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.fat}</p>
        </li>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{currentIngredient?.carbohydrates}</p>
        </li>
      </ul>
    </>
  );
}
