import { burgerReducer } from "./burger";
import { userReducer } from "./user";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({ burger: burgerReducer, user: userReducer });