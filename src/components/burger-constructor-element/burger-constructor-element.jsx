import burgerElementStyle from "./burger-constructor-element.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT, REMOVE_INGREDIENT } from "../../services/actions";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef, useEffect } from "react";
import update from "immutability-helper";

export default function BurgerConstructorElement({ data, index }) {
  const id = data._id;
  const dispatch = useDispatch();
  const ingredients = useSelector((store) => store.burger.constructorIngredients.ingredients);
  const handleDelete = (key) => {
    dispatch({ type: REMOVE_INGREDIENT, key: key });
  };
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "draggable-ingr",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [{ handlerId }, drop] = useDrop({
    accept: "draggable-ingr",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      const newArr = update(ingredients, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, ingredients[dragIndex]],
        ],
      });
      dispatch({ type: MOVE_INGREDIENT, data: newArr });
      item.index = hoverIndex;
      return;
    },
  });
  drag(drop(ref));
  return (
    <li style={{ opacity }} ref={ref} key={data.key} className={burgerElementStyle.ingr} data-handler-id={handlerId}>
      <span className={burgerElementStyle.drag}>
        <DragIcon type="primary" />
      </span>
      <ConstructorElement
        text={data.name}
        price={data.price}
        thumbnail={data.image}
        handleClose={() => handleDelete(data.key)}
      />
    </li>
  );
}
