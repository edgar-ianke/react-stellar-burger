import { api } from "../../utils/Api";
import { OPEN_MODAL } from "./burger";

export const GET_USER_DATA = "GET_USER_DATA";
export const SET_AUTH_CHECKED = "SET_AUTH_CHECKED";
export const LOGOUT = "LOGOUT";
export const PW_RESET_REQUEST = "PW_RESET_REQUEST";

export const login = (input) => (dispatch) => {
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
      if (err.message === 'email or password are incorrect') {
        alert(err.message)
      }
    });
};

export const register = (input) => (dispatch) => {
  api
    .registration(input)
    .then(() => {
      dispatch(checkAuth());
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

export const logout = () => (dispatch) => {
  api.logout().then(() => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  });
};

export const editProfile = (input) => (dispatch) => {
  api.editProfile(input).then(() => {
    dispatch(checkAuth());
    dispatch({ type: OPEN_MODAL });
  });
};
