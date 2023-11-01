import { LOGIN_REQUEST, LOGIN_REQUEST_SUCCESS, LOGIN_REQUEST_FAILED } from "../actions/user";

const initialStateUser = {
  loginRequest: false,
  loginSuccess: false,
  loginFailed: false,
  user: {
    name: null,
    email: null,
  },
};

export const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, loginRequest: true };
    }
    case LOGIN_REQUEST_SUCCESS: {
      return { ...state, loginRequest: false, loginSuccess: true };
    }
    case LOGIN_REQUEST_FAILED: {
      return { ...state, loginRequest: false, loginFailed: true };
    }
    default: {
      return state;
    }
  }
};
