import { combineSlices, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { burgerIngredientsSlice } from './slices/burger-ingredients/burgerIngredientsSlice';
import { burgerConstructorSlice } from './slices/burger-constructor/burgerConstructorSlice';
import { ordersSlice } from './slices/orders/ordersSlice';
import { userSlice } from './slices/user/userSlice';
import { feedsSlice } from './slices/feeds/feedsSlice';

const rootReducer = combineSlices(
  burgerIngredientsSlice,
  burgerConstructorSlice,
  ordersSlice,
  userSlice,
  feedsSlice
); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> =
  selectorHook.withTypes<RootState>();

export default store;
