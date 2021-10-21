import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

import { RootState } from "./store";

const initialState: Types.Toast[] = [];

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.push({
        ...action.payload,
        id: uuidv4(),
      });
    },
    removeToast: (state, action) => {
      const filtered = state.filter((toast) => toast.id != action.payload);
      return [...filtered];
    },
  },
});

export const { addToast, removeToast } = toastSlice.actions;

export const getToasts = (state: RootState) => state.toast;

export default toastSlice.reducer;
