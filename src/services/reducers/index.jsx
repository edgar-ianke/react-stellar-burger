import { combineReducers } from "redux";
import {
  REQUEST_FAILED,
  GET_INGREDIENTS_SUCCESS,
  REQUEST_PENDING,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_MODAL,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
} from "../actions";

const initialState = {
  burgerIngredients: [],
  constructorIngredients: { bun: null, ingredients: [] },
  currentIngredient: null,
  createdOrder: null,
  isLoading: false,
  loadingSuccess: null,
  visible: false,
  isOrderEmpty: true,
};

const burgerReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PENDING: {
      return { ...state, isLoading: true };
    }
    case REQUEST_FAILED: {
      return { ...state, isLoading: false, loadingSuccess: false };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, burgerIngredients: action.data, isLoading: false, loadingSuccess: true };
    }
    case POST_ORDER_SUCCESS: {
      return { ...state, createdOrder: action.payload, isLoading: false, loadingSuccess: true };
    }
    case OPEN_INGREDIENT_DETAILS: {
      return { ...state, currentIngredient: action.data, visible: true };
    }
    case CLOSE_MODAL: {
      return { ...state, currentIngredient: null, visible: false };
    }
    case ADD_INGREDIENT: {
      return action.data.type === "bun"
        ? {
            ...state,
            isOrderEmpty: false,
            constructorIngredients: { ...state.constructorIngredients, bun: action.data },
          }
        : {
            ...state,
            isOrderEmpty: false,
            constructorIngredients: {
              ...state.constructorIngredients,
              ingredients: [...state.constructorIngredients.ingredients, action.data],
            },
          };
    }
    case REMOVE_INGREDIENT: {
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          ingredients: [...state.constructorIngredients.ingredients.filter((item) => {
            console.log(`${action.key} - экшн ${item.key} - итем`)
            return action.key !== item.key})],
        },
        visible: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({ burger: burgerReducer });
