import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientStyles from "./ingredient.module.css";
import { ingredientPropType } from "../../utils/prop-types";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL, SET_CURRENT_INGREDIENT } from "../../services/actions/burger";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
export default function Ingredient(props) {
  const { bun, ingredients } = useSelector((store) => store.burger.constructorIngredients);
  const data = props.data;
  const ingredientId = data._id;
  const location = useLocation();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: { data },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch({ type: SET_CURRENT_INGREDIENT, payload: ingredientId });
    dispatch({ type: OPEN_MODAL, data: data });
  };

  const counter =
    data.type === "bun" && data._id === bun?._id
      ? 2
      : data.type !== "bun"
      ? ingredients?.filter((item) => item._id === data._id).length
      : null;
  return (
    <Link state={{ background: location }} key={ingredientId} to={`/ingredients/${ingredientId}`}>
      <li ref={drag} onClick={handleClick} id={data._id} className={`${ingredientStyles.card} ml-4 mr-6 mb-10 mt-6`}>
        <img src={data.image} alt={data.name} className={`${ingredientStyles.img} pl-4 pb-1 pr-4`} />
        {counter > 0 && <Counter count={counter} size="default" extraClass="m-1" />}
        <div className={ingredientStyles.price}>
          <p className="text text_type_digits-default pr-1">{data.price}</p>
          <CurrencyIcon key={data._id} type="primary" />
        </div>
        <p className={`${ingredientStyles.name} text text_type_main-default pt-1`}>{data.name}</p>
      </li>
    </Link>
  );
}
Ingredient.propTypes = {
  data: ingredientPropType.isRequired,
};
