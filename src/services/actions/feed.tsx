import { TWsGetOrdersResponse } from "../types";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CLOSE_CONNECTION: "WS_CLOSE_CONNECTION" = "WS_CLOSE_CONNECTION";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" = "WS_CONNECTION_CLOSED";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_GET_ORDERS: "WS_GET_ORDERS" = "WS_GET_ORDERS";

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsCloseConnection {
  readonly type: typeof WS_CLOSE_CONNECTION;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload: TWsGetOrdersResponse;
}

export type TFeedActions =
  | IWsConnectionStart
  | IWsCloseConnection
  | IWsConnectionSuccess
  | IWsConnectionClosed
  | IWsConnectionError
  | IWsGetOrders;
