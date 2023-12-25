import { Input, EmailInput, PasswordInput, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import profileStyles from "./authorization.module.css";
import { useSelector, useDispatch } from "../../services/hooks/hooks";
import ProfileNav from "../../components/profile-nav/profile-nav";
import useForms, { TValue } from "../../services/form";
import doneIconStyles from "../../components/order-details/order-details.module.css";
import doneIcon from "../../done.svg";

import Modal from "../../components/modal/modal";
import { checkAuth, editProfile } from "../../services/actions/user";

export default function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user.user);
  const { visible } = useSelector((store) => store.burger);
  React.useEffect(() => {
    dispatch(checkAuth());
  }, []);
  const [input, setInput, resetInput, active] = useForms({
    email: user ? user.email : "",
    password: "",
    name: user ? user.name : "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editProfile(input));
    resetInput();
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e);
    const key = e.target.name;
      if (user && e.target.value === user[key as keyof typeof user]) resetInput();
   
  };

  return (
    <div className={profileStyles.container}>
      {visible && (
        <Modal>
          <p className={`${profileStyles.note} text text_type_main-large`}>Данные успешно изменены!</p>
        </Modal>
      )}
      <ProfileNav />
      <form className={profileStyles.main} onSubmit={handleSubmit}>
        <Input
          type={"text"}
          onChange={onChange}
          value={input.name}
          placeholder={"Имя"}
          name={"name"}
          errorText={"Ошибка"}
          size={"default"}
          icon={"EditIcon"}
          extraClass="mb-6"
        />
        <EmailInput
          onChange={onChange}
          value={input.email}
          name={"email"}
          placeholder={"E-mail"}
          isIcon={true}
          extraClass="mb-6"
        />
        <PasswordInput onChange={onChange} value={input.password} name={"password"} icon="EditIcon" />
        <div>
          {
            <Button htmlType="submit" type="primary" size="medium" extraClass="mt-6 mb-20 mr-10" disabled={!active}>
              Изменить данные профиля
            </Button>
          }
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
      </form>
    </div>
  );
}
