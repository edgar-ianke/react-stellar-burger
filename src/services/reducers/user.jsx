import {
  GET_USER_DATA,
  SET_AUTH_CHECKED,
  LOGOUT,
  PW_RESET_REQUEST,
} from "../actions/user";

const initialStateUser = {
  isAuthChecked: false,
  user: null,
  pwResetRequest: false,
};

export const userReducer = (state = initialStateUser, action) => {
  switch (action.type) {
    case SET_AUTH_CHECKED: {
      return { ...state, isAuthChecked: true };
    }
    case GET_USER_DATA: {
      return { ...state, user: { email: action.data.email, name: action.data.name } };
    }
    case LOGOUT: {
      return { ...state, user: null };
    }
    case PW_RESET_REQUEST: {
      return { ...state, pwResetRequest: action.payload };
    }
    default: {
      return state;
    }
  }
};
