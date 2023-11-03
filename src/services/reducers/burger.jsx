import {
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_FAILED,
  OPEN_MODAL,
  POST_ORDER_REQUEST,
  POST_ORDER_FAILED,
  CLOSE_MODAL,
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  POST_ORDER_SUCCESS,
  MOVE_INGREDIENT,
  SET_CURRENT_INGREDIENT,
} from "../actions/burger";

const initialStateBurger = {
  burgerIngredients: [],
  constructorIngredients: { bun: null, ingredients: [] },
  currentIngredient: null,
  createdOrder: null,
  isIngredientsLoading: false,
  isOrderLoading: false,
  loadingSuccess: null,
  visible: false,
  isOrderEmpty: true,
};

export const burgerReducer = (state = initialStateBurger, action) => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return { ...state, isIngredientsLoading: true };
    }
    case GET_INGREDIENTS_FAILED: {
      return { ...state, isIngredientsLoading: false, loadingSuccess: false };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return { ...state, burgerIngredients: action.data, isIngredientsLoading: false, loadingSuccess: true };
    }
    case POST_ORDER_REQUEST: {
      return { ...state, isOrderLoading: true };
    }
    case POST_ORDER_FAILED: {
      return { ...state, isOrderLoading: false, loadingSuccess: false };
    }
    case POST_ORDER_SUCCESS: {
      return {
        ...state,
        isOrderEmpty: true,
        constructorIngredients: { ingredients: [], bun: null },
        createdOrder: action.payload,
        isOrderLoading: false,
        loadingSuccess: true,
        visible: true,
        currentIngredient: null,
      };
    }
    case SET_CURRENT_INGREDIENT: {
      return { ...state, currentIngredient: state.burgerIngredients.find((val) => val._id === action.payload) };
    }
    case OPEN_MODAL: {
      return { ...state, visible: true };
    }
    case CLOSE_MODAL: {
      return { ...state, visible: false };
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
