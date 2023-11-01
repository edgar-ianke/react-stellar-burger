import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import profileStyles from "./authorization.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../components/profile-nav/profile-nav";
import useForms from "../../services/form";
import { api } from "../../utils/Api";
import { userThunk } from "../../services/actions/user";
export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  React.useEffect(() => {
    dispatch(userThunk());
  }, []);
  const [input, setInput] = useForms();
  const handleEditProfile = () => {
    const submitForm = {
      email: input.email ? input.email : user.email,
      name: input.name ? input.name : user.name,
      password: input.password,
    };
    api.editProfile(submitForm);
  };
  return (
    <div className={profileStyles.container}>
      <ProfileNav />
      <div className={profileStyles.main}>
        <p className="text text_type_main-medium pb-6">Окно редактирования профиля</p>
        <Input
          type="text"
          onChange={setInput}
          value={input.name}
          placeholder={user?.name}
          name="name"
          extraClass="mb-6"
        />
        <EmailInput
          onChange={setInput}
          value={input.email}
          name={"email"}
          placeholder={user?.email}
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput onChange={setInput} value={input.password} name={"password"} icon="EditIcon" />
        <Button onClick={handleEditProfile} htmlType="button" type="primary" size="medium" extraClass="mt-6 mb-20">
          Изменить данные профиля
        </Button>
      </div>
    </div>
  );
}
