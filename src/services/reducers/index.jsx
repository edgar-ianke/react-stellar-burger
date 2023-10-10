import update from "immutability-helper";
import { combineReducers } from "redux";
import {
  REQUEST_FAILED,
  GET_INGREDIENTS_SUCCESS,
  REQUEST_PENDING,
  OPEN_INGREDIENT_DETAILS,
  CLOSE_MODAL,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  POST_ORDER_SUCCESS,
  MOVE_INGREDIENT,
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
      return { ...state, createdOrder: action.payload, isLoading: false, loadingSuccess: true, visible: true };
    }
    case OPEN_INGREDIENT_DETAILS: {
      return { ...state, currentIngredient: action.data, visible: true };
    }
    case CLOSE_MODAL: {
      return { ...state, currentIngredient: null, createdOrder: null, visible: false };
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
          ingredients: [
            ...state.constructorIngredients.ingredients.filter((item) => {
              return action.key !== item.key;
            }),
          ],
        },
        visible: false,
      };
    }
    case MOVE_INGREDIENT: {
      const newIngredients = [...state.constructorIngredients.ingredients];
      newIngredients.splice(action.data.hoverIndex, 0, newIngredients.splice(action.data.dragIndex, 1)[0]);
      return {
        ...state,
        constructorIngredients: {
          ...state.constructorIngredients,
          ingredients: newIngredients,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export const rootReducer = combineReducers({ burger: burgerReducer });
