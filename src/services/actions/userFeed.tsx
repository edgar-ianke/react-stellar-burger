import { TWsGetOrdersResponse } from "../types";

export const WS_USER_CONNECTION_START: "WS_USER_CONNECTION_START" = "WS_USER_CONNECTION_START";
export const WS_USER_CLOSE_CONNECTION: "WS_USER_CLOSE_CONNECTION" = "WS_USER_CLOSE_CONNECTION";
export const WS_USER_CONNECTION_SUCCESS: "WS_USER_CONNECTION_SUCCESS" = "WS_USER_CONNECTION_SUCCESS";
export const WS_USER_CONNECTION_CLOSED: "WS_USER_CONNECTION_CLOSED" = "WS_USER_CONNECTION_CLOSED";
export const WS_USER_CONNECTION_ERROR: "WS_USER_CONNECTION_ERROR" = "WS_USER_CONNECTION_ERROR";
export const WS_USER_GET_ORDERS: "WS_USER_GET_ORDERS" = "WS_USER_GET_ORDERS";

export interface IwsUserConnectionStart {
  readonly type: typeof WS_USER_CONNECTION_START;
}
export interface IwsUserCloseConnection {
  readonly type: typeof WS_USER_CLOSE_CONNECTION;
}
export interface IwsUserConnectionSuccess {
  readonly type: typeof WS_USER_CONNECTION_SUCCESS;
}
export interface IwsUserConnectionClosed {
  readonly type: typeof WS_USER_CONNECTION_CLOSED;
}
export interface IwsUserConnectionError {
  readonly type: typeof WS_USER_CONNECTION_ERROR;
}
export interface IwsUserGetOrders {
  readonly type: typeof WS_USER_GET_ORDERS;
  readonly payload: TWsGetOrdersResponse;
}

export type TUserFeedActions =
  | IwsUserConnectionStart
  | IwsUserCloseConnection
  | IwsUserConnectionSuccess
  | IwsUserConnectionClosed
  | IwsUserConnectionError
  | IwsUserGetOrders;