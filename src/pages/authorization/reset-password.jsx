import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import forgotPasswordStyles from "./authorization.module.css";

export default function ResetPassword() {
  React.useEffect(() => {}, []);
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={forgotPasswordStyles.main}>
      <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
      <PasswordInput
        onChange={onChange}
        value={value}
        name={"password"}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
      />
          <Input
        onChange={onChange}
        value={value}
        name={"password"}
        placeholder="Введите код из письма"
        extraClass="mb-6"
      />
      <Button htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
        Сохранить
      </Button>
      <p className="text text_type_main-small text_color_inactive">
        Вспомнили пароль? <span className={forgotPasswordStyles.link}>Войти</span>
      </p>
    </div>
  );
}
