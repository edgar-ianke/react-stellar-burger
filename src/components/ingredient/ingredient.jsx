import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import React, { useEffect } from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, OPEN_INGREDIENT_DETAILS } from "../../services/actions";
import { useDrag } from "react-dnd";

export default function Ingredient(props) {
  const data = props.data;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const { currentIngredient } = useSelector((store) => store.burger);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: OPEN_INGREDIENT_DETAILS, data: props.data });
  };

  const counter = 1;

  return (
    <>
      <li
        ref={drag}
        onClick={handleClick}
        id={props.data._id}
        className={`${ingredientStyles.card} ml-4 mr-6 mb-10 mt-6`}
      >
        <img src={props.data.image} className={`${ingredientStyles.img} pl-4 pb-1 pr-4`} />
        {counter && <Counter count={counter} size="default" extraClass="m-1" />}
        <div className={ingredientStyles.price}>
          <p className="text text_type_digits-default pr-1">{props.data.price}</p>
          <CurrencyIcon key={props.data._id} type="primary" />
        </div>
        <p className={`${ingredientStyles.name} text text_type_main-default pt-1`}>{props.data.name}</p>
      </li>
      {currentIngredient?._id === props.data._id && <IngredientDetails />}
    </>
  );
}
Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
};
