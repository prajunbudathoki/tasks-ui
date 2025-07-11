import { configureStore } from "@reduxjs/toolkit";
import { boardSlice } from "./boardSlice";

export const store = configureStore({
  reducer: {
    boards: boardSlice.reducer,
  },
});
