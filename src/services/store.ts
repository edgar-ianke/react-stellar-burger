import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./reducers";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";

import {
  WS_CONNECTION_START,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
} from "./actions/feed";
import {
  WS_USER_CONNECTION_START,
  WS_USER_CLOSE_CONNECTION,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_ORDERS,
} from "./actions/userFeed";

const wsUrl: string = "wss://norma.nomoreparties.space/orders/all";

const wsActions = {
  wsConnect: WS_CONNECTION_START,
  wsDisconnect: WS_CLOSE_CONNECTION,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_ORDERS,
  onError: WS_CONNECTION_ERROR,
};

const wsUserUrl: string = "wss://norma.nomoreparties.space/orders";

const wsUserActions = {
  wsConnect: WS_USER_CONNECTION_START,
  wsDisconnect: WS_USER_CLOSE_CONNECTION,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onMessage: WS_USER_GET_ORDERS,
  onError: WS_USER_CONNECTION_ERROR,
};

export const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUserUrl, wsUserActions))
  )
);


