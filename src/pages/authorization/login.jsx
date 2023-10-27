import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import loginStyles from "./authorization.module.css";

export default function Login() {
  React.useEffect(() => {}, []);
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={loginStyles.main}>
      <p className="text text_type_main-medium pb-6">Вход</p>
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
        Войти
      </Button>
      <p className="text text_type_main-small text_color_inactive">
        Вы новый пользователь? <span className={loginStyles.link}>Зарегистрироваться</span>
      </p>
      <p className="text text_type_main-small text_color_inactive mt-4">
        Забыли пароль? <span className={loginStyles.link}>Восстановить пароль</span>
      </p>
    </div>
  );
}
