import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo, useState } from "react";
import profileStyles from "./authorization.module.css";
import { useDispatch, useSelector } from "react-redux";
import ProfileNav from "../../components/profile-nav/profile-nav";
import useForms from "../../services/form";
import { api } from "../../utils/Api";
import { OPEN_MODAL } from "../../services/actions/burger";
import Modal from "../../components/modal/modal";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const { visible } = useSelector((store) => store.burger);
  React.useEffect(() => {}, []);
  const [input, setInput, resetInput, active] = useForms({
    email: user.email,
    password: "",
    name: user.name,
  });
  const handleEditProfile = () => {
    api.editProfile(input).then(() => {
      dispatch({type: OPEN_MODAL})
    })
  };

  return (
    <div className={profileStyles.container}>
      {visible && <Modal><p className={`${profileStyles.note} text text_type_main-large`}>Данные успешно изменены!</p></Modal>}
      <ProfileNav />
      <div className={profileStyles.main}>
        <Input
          type="text"
          onChange={setInput}
          value={input.name}
          placeholder={"Имя"}
          name="name"
          extraClass="mb-6"
        />
        <EmailInput
          onChange={setInput}
          value={input.email}
          name={"email"}
          placeholder={"E-mail"}
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput onChange={setInput} value={input.password} name={"password"} icon="EditIcon" />
        <div>
          {<Button
            onClick={handleEditProfile}
            htmlType="button"
            type="primary"
            size="medium"
            extraClass="mt-6 mb-20 mr-10"
            disabled={!active}
          >
            Изменить данные профиля
          </Button>}
          <Button
            onClick={resetInput}
            htmlType="button"
            type="secondary"
            size="medium"
            extraClass={profileStyles.reset}
          >
            Сброс
          </Button>
        </div>
      </div>
    </div>
  );
}
