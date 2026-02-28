import {
  addIngredient,
  clearConstructor,
  constructorReducer,
  moveIngredientDown,
  moveIngredientUp,
  removeIngredient,
  setBun
} from './constructorSlice';
import { createOrder } from './orderSlice';
import {
  mockBun,
  mockMainIngredient,
  mockSauceIngredient,
  mockOrder,
  createOrderIngredients
} from '../__tests__/test-constants';

describe('constructorSlice reducer', () => {
  const initialState = {
    bun: null,
    ingredients: []
  };

  it('должен добавлять ингредиент в начинку', () => {
    const stateWithBun = constructorReducer(initialState, setBun(mockBun));
    const state = constructorReducer(
      stateWithBun,
      addIngredient(mockMainIngredient)
    );

    expect(state.bun).toEqual(mockBun);
    expect(state.ingredients).toEqual([mockMainIngredient]);
  });

  it('должен удалять ингредиент из начинки', () => {
    let state = constructorReducer(initialState, addIngredient(mockMainIngredient));
    state = constructorReducer(state, addIngredient(mockSauceIngredient));

    const newState = constructorReducer(
      state,
      removeIngredient(mockMainIngredient.id)
    );

    expect(newState.ingredients).toEqual([mockSauceIngredient]);
  });

  it('должен менять порядок ингредиентов в начинке', () => {
    let state = constructorReducer(initialState, addIngredient(mockMainIngredient));
    state = constructorReducer(state, addIngredient(mockSauceIngredient));

    const movedUpState = constructorReducer(state, moveIngredientUp(1));
    expect(movedUpState.ingredients).toEqual([mockSauceIngredient, mockMainIngredient]);

    const movedDownState = constructorReducer(movedUpState, moveIngredientDown(0));
    expect(movedDownState.ingredients).toEqual([mockMainIngredient, mockSauceIngredient]);
  });

  it('должен очищать конструктор по экшену clearConstructor', () => {
    let state = constructorReducer(initialState, setBun(mockBun));
    state = constructorReducer(state, addIngredient(mockMainIngredient));
    state = constructorReducer(state, addIngredient(mockSauceIngredient));

    const newState = constructorReducer(state, clearConstructor());

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([]);
  });

  it('должен очищать конструктор после успешного создания заказа', () => {
    let state = constructorReducer(initialState, setBun(mockBun));
    state = constructorReducer(state, addIngredient(mockMainIngredient));
    state = constructorReducer(state, addIngredient(mockSauceIngredient));

    const orderIngredients = createOrderIngredients();
    const newState = constructorReducer(
      state,
      createOrder.fulfilled(mockOrder, 'request-id', orderIngredients)
    );

    expect(newState.bun).toBeNull();
    expect(newState.ingredients).toEqual([]);
  });

  it('не должен добавлять булку в массив ingredients', () => {
    const state = constructorReducer(initialState, addIngredient(mockBun as any));
    
    expect(state.ingredients).toEqual([]);
    expect(state.bun).toBeNull();
  });

  it('не должен изменять состояние при moveIngredientUp с некорректным индексом', () => {
    let state = constructorReducer(initialState, addIngredient(mockMainIngredient));
    
    const newState = constructorReducer(state, moveIngredientUp(5));
    expect(newState.ingredients).toEqual([mockMainIngredient]);
  });

  it('не должен изменять состояние при moveIngredientDown с некорректным индексом', () => {
    let state = constructorReducer(initialState, addIngredient(mockMainIngredient));
    
    const newState = constructorReducer(state, moveIngredientDown(-1));
    expect(newState.ingredients).toEqual([mockMainIngredient]);
  });
});
