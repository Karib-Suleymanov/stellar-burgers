import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

export const mockBun: TIngredient = {
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

export const mockMainIngredient: TConstructorIngredient = {
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

export const mockSauceIngredient: TConstructorIngredient = {
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

export const mockIngredients = [mockBun];

export const mockOrder: TOrder = {
  _id: 'order-1',
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2026-02-23T10:00:00.000Z',
  updatedAt: '2026-02-23T10:10:00.000Z',
  number: 12345,
  ingredients: [mockBun._id, mockMainIngredient._id, mockSauceIngredient._id]
};

export const createOrderIngredients = () => [
  mockBun._id,
  mockMainIngredient._id,
  mockSauceIngredient._id,
  mockBun._id
];

export const createMockIngredient = (
  type: 'bun' | 'main' | 'sauce',
  customData: Partial<TIngredient> = {}
): TIngredient => ({
  _id: `test-${type}-${Date.now()}`,
  name: `Тестовый ${type}`,
  type,
  proteins: 100,
  fat: 50,
  carbohydrates: 75,
  calories: 500,
  price: 200,
  image: 'https://test.com/image.png',
  image_mobile: 'https://test.com/image-mobile.png',
  image_large: 'https://test.com/image-large.png',
  ...customData
});

export const createMockConstructorIngredient = (
  baseIngredient: TIngredient,
  customId?: string
): TConstructorIngredient => ({
  ...baseIngredient,
  id: customId || `${baseIngredient._id}-${Date.now()}`
});

export const createConstructorState = () => ({
  bun: mockBun,
  ingredients: [mockMainIngredient, mockSauceIngredient]
});
