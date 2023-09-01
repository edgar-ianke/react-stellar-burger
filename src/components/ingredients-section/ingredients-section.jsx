import IngredientsSectionStyles from "./ingredients-section.module.css";
import Ingredients from "../ingredients/ingredients";
import { data } from "../../utils/data";

export default function IngredientsSection() {
  return (
    <>
      <div className={IngredientsSectionStyles.main}>
          <h2 name='Булки' className="text text_type_main-medium">Булки</h2>
          <Ingredients data={data} type={'bun'} key={data._id}/>
          <h2 name='Соусы' className="text text_type_main-medium">Соусы</h2>
          <Ingredients data={data} type={'sauce'} key={data._id}/>
          <h2 name='Начинки' className="text text_type_main-medium">Начинки</h2>
          <Ingredients data={data} type={'main'} key={data._id}/>
        </div>
    </>
  );
}
