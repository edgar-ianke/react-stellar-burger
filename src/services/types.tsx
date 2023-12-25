import { TBurgerActions } from "./actions/burger";
import { TUserActions } from "./actions/user";
import { TUserFeedActions } from "./actions/userFeed";
import { store } from "./store";
import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator, Dispatch } from "redux";
import { TFeedActions } from "./actions/feed";

type TApplicationActions = TBurgerActions | TFeedActions | TUserActions | TUserFeedActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = Dispatch<TApplicationActions>;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TApplicationActions>
>;

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  key?: string;
};

export type TWsOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TWsGetOrdersResponse = {
  success: boolean;
  orders: Array<TWsOrder>;
  total: number;
  totalToday: number;
};

export type TInitialStateBurger = {
  burgerIngredients: readonly TIngredient[];
  constructorIngredients: { bun: TIngredient | null; ingredients: TIngredient[],
 };
  currentIngredient: TIngredient | null;
  createdOrder: number;
  isIngredientsLoading: boolean;
  isOrderLoading: boolean;
  loadingSuccess: boolean;
  visible: boolean;
  isOrderEmpty: boolean;
  isLoading?: boolean;
};
export type TInitialStateFeed = {
  wsConnected: boolean;
  orders: null | Array<TWsOrder>;
  total?: null | number;
  totalToday?: null | number;
};
export type TInitialStateUser = {
  isAuthChecked: boolean;
  user: null | { name: string; email: string };
  pwResetRequest: boolean;
};

