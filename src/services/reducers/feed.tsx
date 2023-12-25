import { WS_CONNECTION_SUCCESS, WS_CONNECTION_CLOSED, WS_GET_ORDERS, WS_CONNECTION_ERROR, TFeedActions } from "../actions/feed";
import { TInitialStateFeed } from "../types";

const initialState = {
  wsConnected: false,
  orders: null,
  total: null,
  totalToday: null,
};


export const wsFeedReducer = (state: TInitialStateFeed = initialState, action: TFeedActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS: {
      return {
        ...state,
        wsConnected: true,
      };
    }
    case WS_CONNECTION_ERROR: {
      return {
        ...state,
        wsConnected: false,
      };
    }
    case WS_CONNECTION_CLOSED: {
      return {
        ...state,
        wsConnected: false,
        orders: null,
      };
    }
    case WS_GET_ORDERS: {
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    }
    default: {
      return state;
    }
  }
};
