import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import React from "react";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { ingredientPropType } from "../../utils/prop-types";

export default function Ingredient(props) {
  const [isChosen, setChosen] = React.useState(false);

  const openDetails = () => {
    setChosen(true);
  };
  const closeDetails = () => {
    setChosen(false);
  };

  const detailsModal = <IngredientDetails onClose={closeDetails} item={props.data} />;

  return (
    <>
      <li onClick={openDetails} className={`${ingredientStyles.card} ml-4 mr-6 mb-10 mt-6`}>
        <img src={props.data.image} className={`${ingredientStyles.img} pl-4 pb-1 pr-4`} />
        <div className={ingredientStyles.price}>
          <p className="text text_type_digits-default pr-1">{props.data.price}</p>
          <CurrencyIcon key= {props.data._id} type="primary" />
        </div>
        <p className={`${ingredientStyles.name} text text_type_main-default pt-1`}>{props.data.name}</p>
      </li>
      {isChosen && detailsModal}
    </>
  );
}
Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
};
