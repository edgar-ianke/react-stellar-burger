import React from "react";
import { useSelector } from "react-redux";

export default function useForms() {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    name: "",
  });
  const onChange = (e) => {
    if (e.target.name === "name") {
      setValue({ ...value, name: e.target.value });
    } else if (e.target.name === "email") {
      setValue({ ...value, email: e.target.value });
    } else if (e.target.name === "password") {
      setValue({ ...value, password: e.target.value });
    }
    return;
  };
  return [value, onChange];
}
