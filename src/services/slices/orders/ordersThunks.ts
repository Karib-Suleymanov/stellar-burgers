import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi, getOrdersApi } from '@api';

export const fetchProfileOrders = createAsyncThunk('orders/fetch', async () =>
  getOrdersApi()
);

export const fetchOrder = createAsyncThunk(
  'orders/fetchOrder',
  async (orderNumber: number) => getOrderByNumberApi(orderNumber)
);
