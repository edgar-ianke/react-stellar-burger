import burgerElementStyle from "./burger-constructor-element.module.css";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { MOVE_INGREDIENT, REMOVE_INGREDIENT } from "../../services/actions/burger";
import { useDispatch } from "../../services/hooks/hooks";
import { XYCoord, useDrag, useDrop } from "react-dnd";
import { useRef, FC } from "react";
import { TIngredient } from "../../services/types";

interface IProps {
  data: TIngredient;
  index: number;
}

const BurgerConstructorElement: FC<IProps> = ({ data, index }) => {
  const id = data._id;
  const dispatch = useDispatch();
  const handleDelete = (key: string | undefined) => {
    dispatch({ type: REMOVE_INGREDIENT, key: key });
  };
  const ref = useRef<HTMLLIElement>(null);
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
    hover(item: IProps, monitor) {
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
      const hoverClientY =  (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = hoverIndex;
      dispatch({ type: MOVE_INGREDIENT, data: { hoverIndex: hoverIndex, dragIndex: dragIndex } });

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
};

export default BurgerConstructorElement;
