import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import { EditIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import profileStyles from "./authorization.module.css";

import { NavLink } from "react-router-dom";

export default function Profile() {
  React.useEffect(() => {}, []);
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const tabClass = ({ isActive }) =>
    isActive
      ? `${profileStyles.tab} text text_type_main-medium`
      : `${profileStyles.tab} text text_type_main-default text_color_inactive`;

  return (
    <div className={profileStyles.container}>
      <div className={profileStyles.navbar}>
        <NavLink to="/profile" className={tabClass}>
          Профиль
        </NavLink>
        <NavLink to="/profile" className={tabClass}>
          История
        </NavLink>
        <NavLink to="/profile" className={tabClass}>
          Выход
        </NavLink>
        <p className={`${profileStyles.tab} text text_type_main-default text_color_inactive pt-20`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </div>
      <div className={profileStyles.main}>
        <p className="text text_type_main-medium pb-6">Регистрация</p>
        <Input type="text" onChange={onChange} value={value} placeholder={"Имя"} name="name" extraClass="mb-6" />
        <EmailInput
          onChange={onChange}
          value={value}
          name={"email"}
          placeholder="e-mail"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput onChange={onChange} value={value} name={"password"} icon="EditIcon" />
        <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
          Зарегистрироваться
        </Button>
      </div>
    </div>
  );
}
