import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeUser: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.isLoading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.activeUser = action.payload.user;
    },
    loginFailure(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.activeUser = null;
    },
    updateUserBalance(state, action) {
      if (state.activeUser && state.activeUser.id === action.payload.id) {
        state.activeUser.balance = action.payload.balance;
      }
    },
    addTransactionToHistory(state, action) {
      if (state.activeUser && state.activeUser.id === action.payload.id) {
        if (!state.activeUser.transactionHisotry) {
          state.activeUser.transactionHisotry = [];
        }
        state.activeUser.transactionHisotry.push(action.payload.transaction);
      }
    },
    removeTransactionFromHistory(state, action) {
      if (state.activeUser) {
        state.activeUser.transactionHisotry = state.activeUser.transactionHisotry.filter(
          transaction => transaction.reference !== action.payload.reference
        );
      }
    },
    updateUser(state, action) {
      if (state.activeUser && state.activeUser.id === action.payload.id) {
        state.activeUser = { ...state.activeUser, ...action.payload };
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateUserBalance,
  addTransactionToHistory,
  removeTransactionFromHistory,
  updateUser
} = userSlice.actions;
export const userReducer = userSlice.reducer;
