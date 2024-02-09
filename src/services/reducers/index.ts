import { burgerReducer } from "./burger";
import { wsFeedReducer } from "./feed";
import { userReducer } from "./user";
import { wsUserFeedReducer } from "./userFeed";
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
  burger: burgerReducer,
  user: userReducer,
  feed: wsFeedReducer,
  userFeed: wsUserFeedReducer,
});
