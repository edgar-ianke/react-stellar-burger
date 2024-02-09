import {
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_GET_ORDERS,
  WS_USER_CONNECTION_ERROR,
  TUserFeedActions,
} from "../actions/userFeed";
import { TInitialStateFeed } from "../types";

const initialState = {
  wsConnected: false,
  orders: null,
};

export const wsUserFeedReducer = (state: TInitialStateFeed = initialState, action: TUserFeedActions) => {
  switch (action.type) {
    case WS_USER_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_USER_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_USER_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        orders: null,
      };
    }
    case WS_USER_GET_ORDERS: {
      return {
        ...state,
        orders: action.payload.orders?.reverse(),
      };
    }
    default: {
      return state;
    }
  }
};
