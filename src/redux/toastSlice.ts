import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface ToastState {
  toast: Types.Toast | null;
}

const initialState: ToastState = {
  toast: null,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export const getToast = (state: RootState): Types.Toast | null =>
  state.toast.toast;

export default toastSlice.reducer;
