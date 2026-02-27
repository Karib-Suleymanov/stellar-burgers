import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const orderBurger = createAsyncThunk(
  'burgerConstructor/orderBurger',
  async (data: string[]) => orderBurgerApi(data)
);
