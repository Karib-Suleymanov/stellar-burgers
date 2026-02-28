import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import {
  isIngredientBun,
  isIngredientMain,
  isIngredientSauce
} from '../../../utils/ingredient';
import { fetchBurgerIngredients } from './burgerIngredientsThunks';

// типизация состояния ингредиентов
type TBurgerIngredientsState = {
  all: TIngredient[];
  isIngredientsLoading: boolean;
};

// начальное состояние
const initialState: TBurgerIngredientsState = {
  all: [],
  isIngredientsLoading: false
};

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {},
  selectors: {
    getAllIngredients: (sliceState) => sliceState.all,
    getBuns: (sliceState) => sliceState.all.filter(isIngredientBun),
    getMains: (sliceState) => sliceState.all.filter(isIngredientMain),
    getSauces: (sliceState) => sliceState.all.filter(isIngredientSauce),
    getIngredientById: (sliceState) => (targetId: string) =>
      sliceState.all.find(({ _id }) => _id === targetId),
    getIsIngredientsLoading: (sliceState) => sliceState.isIngredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBurgerIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
      })
      .addCase(fetchBurgerIngredients.rejected, (state) => {
        state.isIngredientsLoading = false;
      })
      .addCase(fetchBurgerIngredients.fulfilled, (state, action) => {
        state.all = action.payload;
        state.isIngredientsLoading = false;
      });
  }
});

export const {
  getAllIngredients,
  getBuns,
  getMains,
  getSauces,
  getIsIngredientsLoading,
  getIngredientById
} = burgerIngredientsSlice.selectors;
export const reducer = burgerIngredientsSlice.reducer;
