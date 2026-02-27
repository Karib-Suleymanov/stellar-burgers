import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchBurgerIngredients = createAsyncThunk(
  'burgerIngredients/fetchAll',
  async () => getIngredientsApi()
);
