import { api } from "../../utils/Api";
import { useNavigate } from "react-router-dom";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_FAILED = "LOGIN_REQUEST_FAILED";

export const loginThunk = (input) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  api
    .login(input.email, input.password)
    .then((res) => {
      if (res.success) {
        const accessToken = res.accessToken.replace("Bearer ", "");
        localStorage.setItem("refreshToken", res.refreshToken);
        localStorage.setItem("accessToken", accessToken);
        dispatch({ type: LOGIN_REQUEST_SUCCESS });
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOGIN_REQUEST_FAILED });
    });
};
