import doneImg from "../../done.svg";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientDetailsStyles from "./ingredient-details.module.css";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import { useSelector } from "react-redux";

export default function IngredientDetails() {
  const currentIngredient = useSelector((store) => store.burger.currentIngredient);
  return (
      <Modal>
        <p className={ingredientDetailsStyles.title}>Детали ингредиента</p>
        <img className={ingredientDetailsStyles.img} src={currentIngredient.image} />
        <p className="text text_type_main-medium pt-4 pb-8">{currentIngredient.name}</p>
        <ul className={ingredientDetailsStyles.nutritionsList}>
          <li className={ingredientDetailsStyles.nutritions}>
            <p className="text text_type_main-default text_color_inactive">Калории, ккал</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.calories}</p>
          </li>
          <li className={ingredientDetailsStyles.nutritions}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.proteins}</p>
          </li>
          <li className={ingredientDetailsStyles.nutritions}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.fat}</p>
          </li>
          <li className={ingredientDetailsStyles.nutritions}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{currentIngredient.carbohydrates}</p>
          </li>
        </ul>
      </Modal>
  );
}
IngredientDetails.propTypes = {
  onClose: PropTypes.func,
  openModal: PropTypes.func,
};
