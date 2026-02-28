import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { TOrder } from '@utils-types';

export type OrderState = {
  feedOrders: TOrder[];
  total: number;
  totalToday: number;
  feedLoading: boolean;
  feedError: string | null;
  profileOrders: TOrder[];
  profileOrdersLoading: boolean;
  profileOrdersError: string | null;
  orderData: TOrder | null;
  orderDataLoading: boolean;
  orderError: string | null;
  orderModalData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: OrderState = {
  feedOrders: [],
  total: 0,
  totalToday: 0,
  feedLoading: false,
  feedError: null,
  profileOrders: [],
  profileOrdersLoading: false,
  profileOrdersError: null,
  orderData: null,
  orderDataLoading: false,
  orderError: null,
  orderModalData: null,
  orderRequest: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/create',
  async (ingredientIds: string[]) => {
    const data = await orderBurgerApi(ingredientIds);
    return data.order;
  }
);

export const fetchFeeds = createAsyncThunk('order/fetchFeeds', async () =>
  getFeedsApi()
);

export const fetchProfileOrders = createAsyncThunk(
  'order/fetchProfileOrders',
  async () => getOrdersApi()
);

export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchByNumber',
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0] || null;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
      state.orderRequest = false;
      state.error = null;
    },
    clearOrderData: (state) => {
      state.orderData = null;
      state.orderDataLoading = false;
      state.orderError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orderModalData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка оформления заказа';
      })
      .addCase(fetchFeeds.pending, (state) => {
        state.feedLoading = true;
        state.feedError = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.feedLoading = false;
        state.feedOrders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.feedLoading = false;
        state.feedError = action.error.message || 'Ошибка загрузки ленты';
      })
      .addCase(fetchProfileOrders.pending, (state) => {
        state.profileOrdersLoading = true;
        state.profileOrdersError = null;
      })
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.profileOrdersLoading = false;
        state.profileOrders = action.payload;
      })
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.profileOrdersLoading = false;
        state.profileOrdersError =
          action.error.message || 'Ошибка загрузки истории заказов';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderDataLoading = true;
        state.orderError = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderDataLoading = false;
        state.orderData = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderDataLoading = false;
        state.orderError = action.error.message || 'Ошибка загрузки заказа';
      });
  }
});

export const { clearOrderModal, clearOrderData } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
