import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import forgotPasswordStyles from "./authorization.module.css";
import { api } from "../../utils/Api";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {}, []);
  const [value, setValue] = React.useState("");
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    api.resetPW(value).then((res) => {
      if (res.success) {
        return navigate("/reset-password", { replace: true, state: { location } });
      }
      return;
    });
  };
  return (
    <form className={forgotPasswordStyles.main} onSubmit={handleSubmit}>
      <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
      <EmailInput
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20">
        Восстановить пароль
      </Button>
      <p className="text text_type_main-small text_color_inactive">
        Вспомнили пароль?
        <span>
          {" "}
          <Link className={forgotPasswordStyles.link} to="/login">
            Войти
          </Link>
        </span>
      </p>
    </form>
  );
}
