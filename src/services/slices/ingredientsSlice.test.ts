import {
  fetchIngredients,
  ingredientsReducer,
  initialState
} from './ingredientsSlice';

const mockIngredients = [
  {
    _id: 'bun-1',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
];

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
