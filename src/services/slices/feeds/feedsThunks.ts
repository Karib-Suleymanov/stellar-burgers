import { createAsyncThunk } from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';

export const fetchFeeds = createAsyncThunk('feeds/fetch', async () =>
  getFeedsApi()
);
