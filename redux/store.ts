import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./boardSlice";

export const store = configureStore({
  reducer: {
    boards: boardSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
