import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import registrationStyles from "./authorization.module.css";

export default function Registration() {
  React.useEffect(() => {}, []);
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={registrationStyles.main}>
      <p className="text text_type_main-medium pb-6">Регистрация</p>
      <Input
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="Имя"
        isIcon={false}
        extraClass="mb-6"
      />
      <EmailInput
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput onChange={onChange} value={value} name={"password"} />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
      Зарегистрироваться
      </Button>
      <p className="text text_type_main-small text_color_inactive">
        Уже зарегистрированы? <span className={registrationStyles.link}>Войти</span>
      </p>
    </div>
  );
}