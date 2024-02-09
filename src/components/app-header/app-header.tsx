import { NavLink, useLocation, useMatch } from "react-router-dom";
import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";
import { useMemo } from "react";
import { TIconProps } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils";

export default function AppHeader() {
  const location = useLocation();
  const iconStyles: Record<string, TIconProps["type"]> = useMemo(() => {
    return {
      burgerIcon: location.pathname === "/" ? "primary" : "secondary",
      listIcon: location.pathname === "/feed" ? "primary" : "secondary",
      profileIcon: location.pathname === "/profile/user" ? "primary" : "secondary",
    };
  }, [location]);
  const textStyleActive: string = `${appHeaderStyles.menu} p-5`;
  const textStyleInactive: string = `${appHeaderStyles.menu} p-5 text_color_inactive`;
  return (
    <>
      <header className={appHeaderStyles.header}>
        <div className={appHeaderStyles.icons}>
          <NavLink to="/" className={({ isActive }) => (isActive ? textStyleActive : textStyleInactive)}>
            <BurgerIcon type={iconStyles.burgerIcon} />
            <p className="text text_type_main-default pl-2">Конструктор</p>
          </NavLink>
          <NavLink to="/feed" className={({ isActive }) => (isActive ? textStyleActive : textStyleInactive)}>
            <ListIcon type={iconStyles.listIcon} />
            <p className="text text_type_main-default pl-2">Лента заказов</p>
          </NavLink>
        </div>
        <NavLink to='/' className={appHeaderStyles.logo}>
          <Logo />
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? textStyleActive : textStyleInactive)} to="/profile/user">
          <ProfileIcon type={iconStyles.profileIcon} />
          <p className="text text_type_main-default pl-2">Личный кабинет</p>
        </NavLink>
      </header>
    </>
  );
}
