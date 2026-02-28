import { rootReducer } from './rootReducer';
import {
  constructorReducer,
  ingredientsReducer,
  orderReducer,
  userReducer
} from './slices';

describe('rootReducer', () => {
  it('должен корректно инициализировать state', () => {
    const unknownAction = { type: 'UNKNOWN_ACTION' };
    const state = rootReducer(undefined, unknownAction);

    expect(state).toEqual({
      burgerConstructor: constructorReducer(undefined, unknownAction),
      ingredients: ingredientsReducer(undefined, unknownAction),
      order: orderReducer(undefined, unknownAction),
      user: userReducer(undefined, unknownAction)
    });
  });
});
