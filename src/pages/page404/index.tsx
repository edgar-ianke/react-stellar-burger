import styles from "./index.module.css";
import img from '../../404-error.png'

export default function Page404() {
  return (
    <div className={styles.main}
    >
      <p className="text text_type_main-large text_color_inactive pt-10 pb-10">Страница не найдена</p>
      <p className="text text_type_main-large text_color_inactive">404 - Not found</p>
      <img className="pt-10" src={img} alt='404' />
    </div>
  );
}
