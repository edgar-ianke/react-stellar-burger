import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { rootReducer } from "./services/reducers";
import thunk from "redux-thunk";
import { applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { BrowserRouter as Router } from "react-router-dom";
import { socketMiddleware } from "./services/middleware/socket-middleware";
import {
  WS_CONNECTION_START,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_GET_ORDERS,
} from "./services/actions/feed";
import {
  WS_USER_CONNECTION_START,
  WS_USER_CLOSE_CONNECTION,
  WS_USER_CONNECTION_SUCCESS,
  WS_USER_CONNECTION_CLOSED,
  WS_USER_CONNECTION_ERROR,
  WS_USER_GET_ORDERS,
} from "./services/actions/userFeed";

const wsUrl = "wss://norma.nomoreparties.space/orders/all";

const wsActions = {
  wsConnect: WS_CONNECTION_START,
  wsDisconnect: WS_CLOSE_CONNECTION,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onMessage: WS_GET_ORDERS,
  onError: WS_CONNECTION_ERROR,
};

const wsUserUrl = "wss://norma.nomoreparties.space/orders";

const wsUserActions = {
  wsConnect: WS_USER_CONNECTION_START,
  wsDisconnect: WS_USER_CLOSE_CONNECTION,
  onOpen: WS_USER_CONNECTION_SUCCESS,
  onClose: WS_USER_CONNECTION_CLOSED,
  onMessage: WS_USER_GET_ORDERS,
  onError: WS_USER_CONNECTION_ERROR,
};

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions), socketMiddleware(wsUserUrl, wsUserActions, localStorage.getItem("accessToken").slice(7)))
  )
);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
