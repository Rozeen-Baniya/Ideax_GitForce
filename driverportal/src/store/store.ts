import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transportReducer from "./transportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transport: transportReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
