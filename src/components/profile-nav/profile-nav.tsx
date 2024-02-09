import { NavLink } from "react-router-dom";
import navStyles from "./profile-nav.module.css";
import { logout } from "../../services/actions/user";
import { useDispatch } from "../../services/hooks/hooks";

export default function ProfileNav() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const textStyleActive = `${navStyles.tab} text_type_main-medium`;
  const textStyleInactive = `${navStyles.tab} text_type_main-medium text_color_inactive`;

  return (
    <div className={navStyles.navbar}>
      <NavLink to="/profile/user" className={({ isActive }) => (isActive ? textStyleActive : textStyleInactive)}>
        Профиль
      </NavLink>
      <NavLink to="/profile/orders" className={({ isActive }) => (isActive ? textStyleActive : textStyleInactive)}>
        История заказов
      </NavLink>
      <button onClick={handleLogout} className={`${navStyles.tab} text_type_main-medium text_color_inactive`}>
        Выход
      </button>
      <p className={`${navStyles.tab} text_type_main-default text_color_inactive pt-20`}>
        В этом разделе вы можете изменить свои персональные данные
      </p>
    </div>
  );
}
