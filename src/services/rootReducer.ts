import { combineReducers } from '@reduxjs/toolkit';

import { constructorReducer } from './slices/constructorSlice';
import { ingredientsReducer } from './slices/ingredientsSlice';
import { orderReducer } from './slices/orderSlice';
import { userReducer } from './slices/userSlice';

export const rootReducer = combineReducers({
  burgerConstructor: constructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  user: userReducer
});
