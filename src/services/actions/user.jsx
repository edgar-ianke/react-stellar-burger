import { api } from "../../utils/Api";
import { useNavigate } from "react-router-dom";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAILED = "LOGIN_REQUEST_FAILED";
export const GET_USER_DATA = "GET_USER_DATA";

export const loginThunk = (input) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  api
    .login(input.email, input.password)
    .then((res) => {
      if (res.success) {
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", res.accessToken);
        dispatch({ type: LOGIN_REQUEST_SUCCESS });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_REQUEST_FAILED });
    });
};

export const userThunk = () => (dispatch) => {
  api
    .userGetData()
    .then((res) => {
      if (res.success) {
        dispatch({type: GET_USER_DATA, data: res.user})
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
