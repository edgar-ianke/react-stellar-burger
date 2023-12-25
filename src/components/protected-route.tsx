import { useSelector } from "../services/hooks/hooks";
import { Navigate, useLocation } from "react-router-dom";
import { FC, ReactElement, ReactChild } from "react";

interface IProtected {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

const Protected: FC<IProtected> = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.user.isAuthChecked);
  const user = useSelector((store) => store.user.user);
  const location = useLocation();


  if (!isAuthChecked) {

    return  <p className="text text_type_main-large">Загружаем данные пользователя</p>;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component } : IProtected) => (
  <Protected onlyUnAuth={true} component={component} />
);





