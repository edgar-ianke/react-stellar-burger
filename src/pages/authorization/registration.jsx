import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import registrationStyles from "./authorization.module.css";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../../utils/Api";
import useForms from "../../services/form";

export default function Registration() {
  const navigate = useNavigate();
  React.useEffect(() => {}, []);
  const [input, setInput] = useForms();
  const handleClick = (e) => {
    e.preventDefault();
    api.registration(input).then((res) => {
      if (res.success) {
        navigate("/");
      }
    });
  };
  return (
    <div className={registrationStyles.main}>
      <p className="text text_type_main-medium pb-6">Регистрация</p>
      <Input onChange={setInput} value={input.name} name={"name"} placeholder="Имя" extraClass="mb-6" />
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
        Зарегистрироваться
      </Button>
      <p className="text text_type_main-small text_color_inactive">
        Уже зарегистрированы?
        <span>
          {" "}
          <Link className={registrationStyles.link} to="/login">
            Войти
          </Link>
        </span>
      </p>
    </div>
  );
}
