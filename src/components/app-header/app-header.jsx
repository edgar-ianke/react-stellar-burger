import { Logo, BurgerIcon, ProfileIcon, ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import appHeaderStyles from "./app-header.module.css";

export default function AppHeader() {
  return (
    <>
      <header className={appHeaderStyles.header}>
        <a href='#' className={`${appHeaderStyles.menu} p-5`}>
          <BurgerIcon type="primary" />
          <p className="text text_type_main-default pl-2">Конструктор</p>
        </a>
        <a href='#' className={`${appHeaderStyles.menu} p-5 ml-2`}>
          <ListIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Лента заказов</p>
        </a>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <a href='#' className={`${appHeaderStyles.menu} p-5`}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default pl-2">Личный кабинет</p>
        </a>
      </header>
    </>
  );
}
