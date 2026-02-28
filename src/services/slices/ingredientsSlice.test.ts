import {
  fetchIngredients,
  ingredientsReducer,
  initialState
} from './ingredientsSlice';
import { mockIngredients } from '../__tests__/test-constants';

describe('ingredientsSlice reducer', () => {
  it('должен выставлять isLoading=true при fetchIngredients.pending', () => {
    const state = ingredientsReducer(
      initialState,
      fetchIngredients.pending('request-id')
    );

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ингредиенты и выключать загрузку при fetchIngredients.fulfilled', () => {
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.fulfilled(mockIngredients, 'request-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.data).toEqual(mockIngredients);
  });

  it('должен сохранять ошибку и выключать загрузку при fetchIngredients.rejected', () => {
    const error = new Error('Не удалось загрузить ингредиенты');
    const state = ingredientsReducer(
      { ...initialState, isLoading: true },
      fetchIngredients.rejected(error, 'request-id')
    );

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Не удалось загрузить ингредиенты');
  });
});
