import { Input, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import forgotPasswordStyles from "./authorization.module.css";
import { api } from "../../utils/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    if (location.state?.location.pathname !== "/forgot-password") {
      navigate("/forgot-password", { replace: true });
    }
  }, []);
  const [password, setPassword] = React.useState("");
  const [code, setCode] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.name === "password" ? setPassword(e.target.value) : setCode(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.changePW(password, code).then((res) => {
      if (res.success) {
        navigate("/", { replace: true });
      }
      return;
    });
  };
  return (
    <form className={forgotPasswordStyles.main} onSubmit={handleSubmit}>
      <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
      <PasswordInput
        onChange={onChange}
        value={password}
        name={"password"}
        placeholder="Введите новый пароль"
        extraClass="mb-6"
      />
      <Input onChange={onChange} value={code} name={"code"} placeholder="Введите код из письма" extraClass="mb-6" />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
        Сохранить
      </Button>
      <p className="text text_type_main-small text_color_inactive">
        Вспомнили пароль?
        <span>
          {" "}
          <Link to="/login" className={forgotPasswordStyles.link}>
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
}
