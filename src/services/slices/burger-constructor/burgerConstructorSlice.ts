import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';
import { orderBurger } from './burgerConstructorThunks';

// типизация состояния конструктора
type TBurgerConstructorState = {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

// начальное состояние
const initialState: TBurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getConstructorItems: (state) => state.constructorItems, // получить ингредиенты
    getOrderRequest: (state) => state.orderRequest, // статус заказа
    getOrderModalData: (state) => state.orderModalData // данные заказа
  },
  reducers: {
    setBun(state, action: PayloadAction<TIngredient>) {
      state.constructorItems.bun = action.payload;
    },
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        state.constructorItems.ingredients.push(action.payload);
      },
      prepare: (ingredient: TIngredient) => {
        const id = nanoid();
        return {
          payload: {
            ...ingredient,
            id
          }
        };
      }
    },
    removeIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          ({ id }) => id !== action.payload.id
        );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      const currentIndex = action.payload;
      const newIndex = currentIndex - 1;

      const [movedItem] = state.constructorItems.ingredients.splice(
        currentIndex,
        1
      );
      state.constructorItems.ingredients.splice(newIndex, 0, movedItem);
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      const currentIndex = action.payload;
      const newIndex = currentIndex + 1;

      const [movedItem] = state.constructorItems.ingredients.splice(
        currentIndex,
        1
      );

      state.constructorItems.ingredients.splice(newIndex, 0, movedItem);
    },
    clearConstructorItems: (state) => {
      state.constructorItems = {
        bun: null,
        ingredients: []
      };
      state.orderModalData = null;
    },
    clearOrderData: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderModalData = action.payload.order;
        state.orderRequest = false;
        state.constructorItems = {
          bun: null,
          ingredients: []
        };
      });
  }
});

export const {
  setBun,
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructorItems,
  clearOrderData
} = burgerConstructorSlice.actions;

export const { getConstructorItems, getOrderRequest, getOrderModalData } =
  burgerConstructorSlice.selectors;
