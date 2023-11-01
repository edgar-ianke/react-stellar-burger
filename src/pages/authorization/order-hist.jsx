import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import profileStyles from "./authorization.module.css";
import { useSelector } from "react-redux";
import ProfileNav from "../../components/profile-nav/profile-nav";


export default function OrderHistory() {
  const user = useSelector((store) => store.burger.burgerIngredients);
  React.useEffect(() => {}, []);
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
 

  return (
    <div className={profileStyles.container}>
    <ProfileNav />
      <div className={profileStyles.main}>
        Блок закрыт на ремонт
      </div>
    </div>
  );
}
