import IngredientsSectionStyles from "./ingredients-section.module.css";
import Ingredient from "../ingredient/ingredient";
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";

export default function IngredientsSection(props) {
  return (
    <>
      <div className={IngredientsSectionStyles.main}>
        {props.type.map((tab, ind) => {
          return (
            <div key={ind}>
              <h2 name={tab.type}  className="text text_type_main-medium">
                {tab.name}
              </h2>
              <ul className={`${IngredientsSectionStyles.container}`}>
                {props.data.map((item, i) => {
                  return tab.type === item.type && <Ingredient key={i} data={item} />;
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
IngredientsSection.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  type: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    }).isRequired
  ),
};
