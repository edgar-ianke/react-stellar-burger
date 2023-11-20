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
    setValue(initialState)
    setActive(false);
  };
  const onChange = (e) => {
    const key = e.target.name;
    setValue({ ...value, [key]: e.target.value });
    setActive(true);
  };
  return [value, onChange, resetValue, active];
}