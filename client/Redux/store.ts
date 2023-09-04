import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./Accounts/Reducer";

const store = configureStore({
  reducer: {
    accounts: accountSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
