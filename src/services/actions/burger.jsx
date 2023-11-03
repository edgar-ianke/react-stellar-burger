import { api } from "../../utils/Api";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const REQUEST_FAILED = " REQUEST_FAILED";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const POST_ORDER_REQUEST = "POST_ORDER_REQUEST";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const POST_ORDER_FAILED = "POST_ORDER_FAILED";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";
export const SET_CURRENT_INGREDIENT = "SET_CURRENT_INGREDIENT";

export const getIngredients = () => (dispatch) => {
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

export const postOrderThunk = (arr) => (dispatch) => {
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
