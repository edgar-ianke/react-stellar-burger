import {
  GET_USER_DATA,
  SET_AUTH_CHECKED,
  LOGOUT,
  TUserActions,
} from "../actions/user";
import { TInitialStateUser } from "../types";

const initialStateUser = {
  isAuthChecked: false,
  user: null,
  pwResetRequest: false,
};

export const userReducer = (state: TInitialStateUser = initialStateUser, action: TUserActions) => {
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
    default: {
      return state;
    }
  }
};
