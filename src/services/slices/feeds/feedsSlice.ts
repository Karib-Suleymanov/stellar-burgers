import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeeds } from './feedsThunks';

type TFeedsState = {
  orders: TOrder[];
  currentOrder: TOrder | null;
  total: number;
  totalToday: number;
  isLoading: boolean;
  error?: string;
};

const initialState: TFeedsState = {
  orders: [],
  currentOrder: null,
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
};

export const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (sliceState) => sliceState.orders,
    getOrderByNumber: (sliceState) => (targetNumber: number) =>
      sliceState.orders.find(({ number }) => number === targetNumber),
    getFeed: (sliceState) => ({
      total: sliceState.total,
      totalToday: sliceState.totalToday
    }),
    getFeedsIsLoading: (sliceState) => sliceState.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.error = action.error.message;
        state.isLoading = false;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.isLoading = false;
      });
  }
});

export const { getFeedOrders, getOrderByNumber, getFeed, getFeedsIsLoading } =
  feedsSlice.selectors;
