import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILED, GET_USER_DATA } from "../actions/user";

const initialStateUser = {
  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,
  user: null,
};

export const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loginRequest: true };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return { ...state, loginRequest: false, loginSuccess: true, loginRequest: false };
    }
    case LOGIN_REQUEST_FAILED: {
      return { ...state, loginRequest: false, loginFailed: true, loginRequest: false };
    }
    case GET_USER_DATA: {
      return { ...state, user: { email: action.data.email, name: action.data.name } };
    }
    default: {
      return state;
    }
  }
};
