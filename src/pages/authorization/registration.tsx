import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import registrationStyles from "./authorization.module.css";
import { Link } from "react-router-dom";
import useForms from "../../services/form";
import { useDispatch } from "react-redux";
import { register } from "../../services/actions/user";

export default function Registration() {
  const dispatch = useDispatch();
  const [input, setInput] = useForms();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(input));
  };
  return (
    <form className={registrationStyles.main} onSubmit={handleSubmit}>
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
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
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
    </form>
  );
}
