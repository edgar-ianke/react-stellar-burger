import doneImg from "../../done.svg";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

export default function IngredientDetails(props) {
  return (
    <Modal onClose={props.onClose} openModal={props.openModal}>
      <p className={ingredientDetailsStyles.title}>Детали ингредиента</p>
      <img className={ingredientDetailsStyles.img} src={props.item.image} />
      <p className="text text_type_main-medium pt-4 pb-8">{props.item.name}</p>
      <ul className={ingredientDetailsStyles.nutritionsList}>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.item.calories}</p>
        </li>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.item.proteins}</p>
        </li>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.item.fat}</p>
        </li>
        <li className={ingredientDetailsStyles.nutritions}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.item.carbohydrates}</p>
        </li>
      </ul>
    </Modal>
  );
}
IngredientDetails.propTypes = {
  item: ingredientPropType.isRequired,
};
