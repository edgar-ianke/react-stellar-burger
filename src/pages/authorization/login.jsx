import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import loginStyles from "./authorization.module.css";
import { Link } from "react-router-dom";
import useForms from "../../services/form";
import { api } from "../../utils/Api";
import { useNavigate } from "react-router-dom";
import { loginThunk } from "../../services/actions/user";
import { useDispatch } from "react-redux";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {}, []);
  const [input, setInput] = useForms();
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(loginThunk(input));
    navigate('/');
  };
  return (
    <div className={loginStyles.main}>
      <p className="text text_type_main-medium pb-6">Вход</p>
      <EmailInput
        onChange={setInput}
        value={input.email}
        name={"email"}
        placeholder="Логин"
        isIcon={false}
        extraClass="mb-6"
      />
      <PasswordInput onChange={setInput} value={input.password} name={"password"} />
      <Button onClick={handleClick} htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
        Войти
      </Button>
      <p className="text text_type_main-small text_color_inactive">
        Вы новый пользователь?{" "}
        <Link className={loginStyles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-small text_color_inactive mt-4">
        Забыли пароль?{" "}
        <Link className={loginStyles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
