import { api } from "../../utils/Api";
import { AppDispatch } from "../types";
import { OPEN_MODAL } from "./burger";
import { AppThunk } from "../types";

export const GET_USER_DATA: "GET_USER_DATA" = "GET_USER_DATA";
export const SET_AUTH_CHECKED: "SET_AUTH_CHECKED" = "SET_AUTH_CHECKED";
export const LOGOUT: "LOGOUT" = "LOGOUT";

export interface IGetUserData {
  readonly type: typeof GET_USER_DATA;
  readonly data: { name: string; email: string };
}

export interface ISetAuthChecked {
  readonly type: typeof SET_AUTH_CHECKED;
}
export interface ILogout {
  readonly type: typeof LOGOUT;
}
export type TUserActions = IGetUserData | ISetAuthChecked | ILogout;

export const checkAuth: AppThunk = () => (dispatch: AppDispatch) => {
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

export const login: AppThunk = (input: { email: string; password: string }) => (dispatch: AppDispatch | AppThunk) => {
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
      if (err.message === "email or password are incorrect") {
        alert(err.message);
      }
    });
};

export const register: AppThunk =
  (input: { name: string; email: string; password: string }) => (dispatch: AppDispatch | AppThunk) => {
    api
      .registration(input)
      .then(() => {
        dispatch(checkAuth());
      })
      .catch((err) => {
        console.error(err);
      });
  };

export const logout: AppThunk = () => (dispatch: AppDispatch | AppThunk) => {
  api
    .logout()
    .then(() => {
      dispatch({ type: LOGOUT });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    })
    .catch((err) => console.log(err));
};

export const editProfile: AppThunk =
  (input: { name?: string; email?: string; password?: string }) => (dispatch: AppDispatch | AppThunk) => {
    api
      .editProfile(input)
      .then(() => {
        dispatch(checkAuth());
        dispatch({ type: OPEN_MODAL });
      })
      .catch((err) => console.log(err));
  };
