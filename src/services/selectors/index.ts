import { RootState } from '../store';

export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

export const selectIngredients = (state: RootState) => state.ingredients.data;

export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;

export const selectIngredientById = (state: RootState, id: string) =>
  state.ingredients.data.find((ingredient) => ingredient._id === id) || null;

export const selectOrderRequest = (state: RootState) =>
  state.order.orderRequest;

export const selectOrderModalData = (state: RootState) =>
  state.order.orderModalData;

export const selectUser = (state: RootState) => state.user.user;

export const selectAuthError = (state: RootState) => state.user.error;

export const selectFeedOrders = (state: RootState) => state.order.feedOrders;

export const selectProfileOrders = (state: RootState) =>
  state.order.profileOrders;

export const selectOrderData = (state: RootState) => state.order.orderData;

export const selectOrderDataLoading = (state: RootState) =>
  state.order.orderDataLoading;

export const selectOrderError = (state: RootState) => state.order.orderError;

export const selectFeedTotal = (state: RootState) => state.order.total;

export const selectFeedTotalToday = (state: RootState) =>
  state.order.totalToday;

export const selectFeedLoading = (state: RootState) => state.order.feedLoading;

export const selectFeedError = (state: RootState) => state.order.feedError;

export const selectProfileOrdersLoading = (state: RootState) =>
  state.order.profileOrdersLoading;

export const selectProfileOrdersError = (state: RootState) =>
  state.order.profileOrdersError;

export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;

export const selectUpdateUserError = (state: RootState) =>
  state.user.updateUserError;
