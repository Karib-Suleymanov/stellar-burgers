import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { loginUser, logoutUser, registerUser, updateUser } from './userThunks';

type TAuthSliceState = {
  user: TUser | null;
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  error?: string;
};

const initialState: TAuthSliceState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  error: undefined
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    }
  },
  selectors: {
    getUserError: (sliceState) => sliceState.error,
    getUser: (sliceState) => sliceState.user,
    getUserName: (sliceState) => sliceState.user?.name,
    getIsAuthChecked: (sliceState) => sliceState.isAuthChecked,
    getIsAuthenticated: (sliceState) => sliceState.isAuthenticated
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isAuthChecked = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
      })
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      // logoutUser
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      // updateUser
      .addCase(updateUser.pending, (state) => {
        state.error = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
      });
  }
});

export const {
  getUserError,
  getUser,
  getUserName,
  getIsAuthChecked,
  getIsAuthenticated
} = userSlice.selectors;

export const { setUser, setIsAuthChecked, setIsAuthenticated } =
  userSlice.actions;
