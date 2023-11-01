import { NavLink } from "react-router-dom";
import navStyles from './profile-nav.module.css'


export default function ProfileNav() {
const textStyleActive = `${navStyles.tab} text_type_main-medium`
const textStyleInactive = `${navStyles.tab} text_type_main-medium text_color_inactive`

  return (
    <div className={navStyles.navbar}>
      <NavLink to="/profile/user" className={({isActive}) => isActive ? textStyleActive : textStyleInactive}>
        Профиль
      </NavLink>
      <NavLink to="/profile/history" className={({isActive}) => isActive ? textStyleActive : textStyleInactive}>
        История заказов
      </NavLink>
      <button className={`${navStyles.tab} text_type_main-medium text_color_inactive`}>
        Выход
      </button>
      <p className={`${navStyles.tab} text_type_main-default text_color_inactive pt-20`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
