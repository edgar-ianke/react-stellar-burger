import React from "react";

export type TValue = {
  email: string;
  password: string;
  name: string;
};

export default function useForms(
  initialState = {
    email: "",
    password: "",
    name: "",
  }
): [TValue, (e: React.ChangeEvent<HTMLInputElement>) => void, (email: string, name: string) => void, boolean,  React.Dispatch<React.SetStateAction<boolean>>] {
  const [value, setValue] = React.useState<TValue>(initialState);
  const [active, setActive] = React.useState(false);
  const resetValue = (email: string, name: string) => {
    setValue({ ...value, email: email, name: name });
    setActive(false);
  };
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.name;
    setValue({ ...value, [key]: e.target.value });
    setActive(true);
  };
  return [value, onChange, resetValue, active, setActive];
}
