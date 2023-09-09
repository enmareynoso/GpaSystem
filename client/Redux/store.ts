import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./Accounts/Reducer";
import transactionsSlice from "./Transactions/Reducer"

const store = configureStore({
  reducer: {
    accounts: accountSlice,
    transactions: transactionsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
