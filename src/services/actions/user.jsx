import { api } from "../../utils/Api";
import { useNavigate } from "react-router-dom";

export const GET_USER_DATA = "GET_USER_DATA";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const LOGOUT = "LOGOUT";
export const PW_RESET_REQUEST = "PW_RESET_REQUEST";

export const loginThunk = (input) => (dispatch) => {
  api
    .login(input.email, input.password)
    .then((res) => {
      if (res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        dispatch(checkAuth());
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

export const userThunk = () => (dispatch) => {
  api
    .userGetData()
    .then((res) => {
      if (res.success) {
        dispatch({ type: GET_USER_DATA, data: res.user });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

export const checkAuth = () => (dispatch) => {
  if (localStorage.getItem("accessToken")) {
    api
      .userGetData()
      .then((res) => {
        if (res.success) {
          dispatch({ type: GET_USER_DATA, data: res.user });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        dispatch({ type: SET_AUTH_CHECKED });
      });
  } else {
    dispatch({ type: SET_AUTH_CHECKED });
  }
};

export const logoutThunk = () => (dispatch) => {
  api.logout().then(() => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  });
};
