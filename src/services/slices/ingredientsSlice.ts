import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

export type IngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
  error: string | null;
};

export const initialState: IngredientsState = {
  data: [],
  isLoading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchAll',
  async () => getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
