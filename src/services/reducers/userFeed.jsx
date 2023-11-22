import { WS_USER_CONNECTION_SUCCESS, WS_USER_CONNECTION_CLOSED, WS_USER_GET_ORDERS, WS_USER_CONNECTION_ERROR} from "../actions/userFeed";

const initialState = { 
  wsConnected: false,
  orders: null,
};

export const wsUserFeedReducer = (state = initialState, action) => {
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
          orders: action.payload.orders,
        };
      }
      default: {
        return {
          state,
        };
      }
    }
  };
