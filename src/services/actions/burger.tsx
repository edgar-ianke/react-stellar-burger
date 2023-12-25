import { api } from "../../utils/Api";
import { AppDispatch, TIngredient } from "../types";

export const GET_INGREDIENTS_REQUEST: "GET_INGREDIENTS_REQUEST" = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED: "GET_INGREDIENTS_FAILED" = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS: "GET_INGREDIENTS_SUCCESS" = "GET_INGREDIENTS_SUCCESS";
export const OPEN_MODAL: "OPEN_MODAL" = "OPEN_MODAL";
export const CLOSE_MODAL: "CLOSE_MODAL" = "CLOSE_MODAL";
export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT: "REMOVE_INGREDIENT" = "REMOVE_INGREDIENT";
export const POST_ORDER_REQUEST: "POST_ORDER_REQUEST" = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS: "POST_ORDER_SUCCESS" = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED: "POST_ORDER_FAILED" = "POST_ORDER_FAILED";
export const MOVE_INGREDIENT: "MOVE_INGREDIENT" = "MOVE_INGREDIENT";
export const SET_CURRENT_INGREDIENT: "SET_CURRENT_INGREDIENT" = "SET_CURRENT_INGREDIENT";

export interface IGetIngredientsRequest {
  readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsFailed {
  readonly type: typeof GET_INGREDIENTS_FAILED;
}
export interface IGetIngredientsSuccess {
  readonly type: typeof GET_INGREDIENTS_SUCCESS;
  readonly data: ReadonlyArray<TIngredient>;
}
export interface IOpenModal {
  readonly type: typeof OPEN_MODAL;
}
export interface ICloseModal {
  readonly type: typeof CLOSE_MODAL;
}
export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly data: TIngredient;
}
export interface IRemoveIngredient {
  readonly type: typeof REMOVE_INGREDIENT;
  readonly key: string;
}
export interface IPostOrderRequest {
  readonly type: typeof POST_ORDER_REQUEST;
}
export interface IPostOrderSuccess {
  readonly type: typeof POST_ORDER_SUCCESS;
  readonly payload: number;
}
export interface IPostOrderFailed {
  readonly type: typeof POST_ORDER_FAILED;
}
export interface IMoveIngredient {
  readonly type: typeof MOVE_INGREDIENT;
  readonly data: { hoverIndex: number; dragIndex: number };
}
export interface ISetCurrentIngredient {
  readonly type: typeof SET_CURRENT_INGREDIENT;
  readonly payload: string;
}

export type TBurgerActions =
  | IGetIngredientsRequest
  | IGetIngredientsFailed
  | IGetIngredientsSuccess
  | IOpenModal
  | ICloseModal
  | IAddIngredient
  | IRemoveIngredient
  | IPostOrderRequest
  | IPostOrderSuccess
  | IPostOrderFailed
  | IMoveIngredient
  | ISetCurrentIngredient;

export const getIngredients = () => (dispatch: AppDispatch) => {
  dispatch({ type: GET_INGREDIENTS_REQUEST });
  api
    .getData()
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, data: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: GET_INGREDIENTS_FAILED });
    });
};

export const postOrder = (arr: Array<TIngredient>) => (dispatch: AppDispatch) => {
  dispatch({ type: POST_ORDER_REQUEST });
  api
    .postOrder(arr)
    .then((res) => {
      dispatch({ type: POST_ORDER_SUCCESS, payload: res.order.number });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: POST_ORDER_FAILED });
    });
};
