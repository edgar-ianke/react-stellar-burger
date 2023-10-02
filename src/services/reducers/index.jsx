import { combineReducers } from "redux";

const intitialState = { allIngredient: [], addedIngredient: [], ingredientDetails: {}, orderDetails: {} };

const composeEnhancers = composeWithDevTools({});

const reducer = (state, action) => {};
const rootReducer = combineReducers({
  reducer,
});
