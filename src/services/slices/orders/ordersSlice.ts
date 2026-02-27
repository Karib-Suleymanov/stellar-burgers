import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrder, fetchProfileOrders } from './ordersThunks';

type TOrdersState = {
  orders: TOrder[];
  order: TOrder | null;
  isLoading: boolean;
};

const initialState: TOrdersState = {
  orders: [],
  order: null,
  isLoading: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  selectors: {
    getProfileOrders: (sliceState) => sliceState.orders,
    getOrder: (sliceState) => sliceState.order,
    getIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileOrders.pending, () => {})
      .addCase(fetchProfileOrders.rejected, () => {})
      .addCase(fetchProfileOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(fetchOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrder.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchOrder.fulfilled, (state, action) => {
        state.order = action.payload.orders[0];
        state.isLoading = false;
      });
  }
});

export const { getProfileOrders, getOrder } = ordersSlice.selectors;
