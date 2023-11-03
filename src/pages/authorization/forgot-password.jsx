import { EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import forgotPasswordStyles from "./authorization.module.css";
import { api } from "../../utils/Api";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {}, []);
  const [value, setValue] = React.useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    api.resetPW(value).then((res) => {
      if (res.success) {
        return navigate("/reset-password", { replace: true, state: { location } });
        //  <Navigate to='/reset-password' state={{from: location}}/>
      }
      return;
    });
  };
  return (
    <div className={forgotPasswordStyles.main}>
      <p className="text text_type_main-medium pb-6">Восстановление пароля</p>
      <EmailInput
        onChange={onChange}
        value={value}
        name={"email"}
        placeholder="Укажите e-mail"
        isIcon={false}
        extraClass="mb-6"
      />
      <Button onClick={handleClick} htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
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
    </div>
  );
}
