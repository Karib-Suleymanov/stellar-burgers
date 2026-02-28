import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

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

const bun: TIngredient = {
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
};

const mainIngredient: TConstructorIngredient = {
  _id: 'main-1',
  id: 'main-item-1',
  name: 'Котлета из метеорита',
  type: 'main',
  proteins: 800,
  fat: 400,
  carbohydrates: 120,
  calories: 4200,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};

const sauceIngredient: TConstructorIngredient = {
  _id: 'sauce-1',
  id: 'sauce-item-1',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

const order: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2026-02-23T10:00:00.000Z',
  updatedAt: '2026-02-23T10:10:00.000Z',
  number: 12345,
  ingredients: [bun._id, mainIngredient._id, sauceIngredient._id]
};

describe('constructorSlice reducer', () => {
  it('должен добавлять ингредиент в начинку', () => {
    const stateWithBun = constructorReducer(undefined, setBun(bun));
    const state = constructorReducer(
      stateWithBun,
      addIngredient(mainIngredient)
    );

    expect(state.bun).toEqual(bun);
    expect(state.ingredients).toEqual([mainIngredient]);
  });

  it('должен удалять ингредиент из начинки', () => {
    const stateWithIngredients = constructorReducer(
      constructorReducer(undefined, addIngredient(mainIngredient)),
      addIngredient(sauceIngredient)
    );

    const state = constructorReducer(
      stateWithIngredients,
      removeIngredient(mainIngredient.id)
    );

    expect(state.ingredients).toEqual([sauceIngredient]);
  });

  it('должен менять порядок ингредиентов в начинке', () => {
    const stateWithIngredients = constructorReducer(
      constructorReducer(undefined, addIngredient(mainIngredient)),
      addIngredient(sauceIngredient)
    );

    const movedUpState = constructorReducer(
      stateWithIngredients,
      moveIngredientUp(1)
    );
    expect(movedUpState.ingredients).toEqual([sauceIngredient, mainIngredient]);

    const movedDownState = constructorReducer(
      movedUpState,
      moveIngredientDown(0)
    );
    expect(movedDownState.ingredients).toEqual([
      mainIngredient,
      sauceIngredient
    ]);
  });

  it('должен очищать конструктор по экшену clearConstructor', () => {
    const stateWithIngredients = constructorReducer(
      constructorReducer(
        constructorReducer(undefined, setBun(bun)),
        addIngredient(mainIngredient)
      ),
      addIngredient(sauceIngredient)
    );

    const state = constructorReducer(stateWithIngredients, clearConstructor());

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });

  it('должен очищать конструктор после успешного создания заказа', () => {
    const stateWithIngredients = constructorReducer(
      constructorReducer(
        constructorReducer(undefined, setBun(bun)),
        addIngredient(mainIngredient)
      ),
      addIngredient(sauceIngredient)
    );

    const state = constructorReducer(
      stateWithIngredients,
      createOrder.fulfilled(order, 'request-id', [
        bun._id,
        mainIngredient._id,
        sauceIngredient._id,
        bun._id
      ])
    );

    expect(state.bun).toBeNull();
    expect(state.ingredients).toEqual([]);
  });
});
