import { api } from "../../utils/Api";

export const REQUEST_PENDING = "REQUEST_PENDING";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const REQUEST_FAILED = " REQUEST_FAILED";
export const OPEN_INGREDIENT_DETAILS = "OPEN_INGREDIENT_DETAILS";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const REMOVE_INGREDIENT = "REMOVE_INGREDIENT";
export const POST_ORDER_SUCCESS = "POST_ORDER_SUCCESS";
export const MOVE_INGREDIENT = "MOVE_INGREDIENT";

export const getIngredients = () => (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  api
    .getData()
    .then((res) => {
      dispatch({ type: GET_INGREDIENTS_SUCCESS, data: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REQUEST_FAILED });
    });
};

export const postOrderThunk = (arr) => (dispatch) => {
  dispatch({ type: REQUEST_PENDING });
  api
    .postOrder(arr)
    .then((res) => {
      dispatch({ type: POST_ORDER_SUCCESS, payload: res.order.number });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: REQUEST_FAILED });
    });
};