import React from "react";

export default function useForms(
  initialState = {
    email: "",
    password: "",
    name: "",
  }
) {
  const [value, setValue] = React.useState(initialState);
  const [active, setActive] = React.useState(false);
  const resetValue = () => {
    setValue(initialState);
    setActive(false);
  };
  const onChange = (e) => {
    if (e.target.name === "name") {
      setValue({ ...value, name: e.target.value });
      setActive(true);
    } else if (e.target.name === "email") {
      setValue({ ...value, email: e.target.value });
      setActive(true);
    } else if (e.target.name === "password") {
      setValue({ ...value, password: e.target.value });
      setActive(true);
    }
    return;
  };
  return [value, onChange, resetValue, active];
}
