import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import profileStyles from "./authorization.module.css";
import { useSelector } from "react-redux";
import ProfileNav from "../../components/profile-nav/profile-nav";
import useForms from "../../services/form";
import { api } from "../../utils/Api";


export default function Profile() {
  const user = useSelector((store) => store.burger.burgerIngredients);
  React.useEffect(() => {
    api.user().then(res => console.log(res))
  }, []);
  const [input, setInput] = useForms();

  return (
    <div className={profileStyles.container}>
    <ProfileNav />
      <div className={profileStyles.main}>
        <p className="text text_type_main-medium pb-6">Регистрация</p>
        <Input type="text" onChange={setInput} value={input.name} placeholder={"Имя"} name="name" extraClass="mb-6" />
        <EmailInput
          onChange={setInput}
          value={input.email}
          name={"email"}
          placeholder="e-mail"
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput onChange={setInput} value={input.password} name={"password"} icon="EditIcon" />
        <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
          Изменить данные профиля
        </Button>
      </div>
    </div>
  );
}
