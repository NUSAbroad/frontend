import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface OnboardState {
  isVisible: boolean;
}

const initialState: OnboardState = {
  isVisible: true,
};

export const onboardSlice = createSlice({
  name: "onboard",
  initialState,
  reducers: {
    showOnboard: (state) => {
      state.isVisible = true;
    },
    hideOnboard: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showOnboard, hideOnboard } = onboardSlice.actions;

export const getIsVisible = (state: RootState): boolean =>
  state.onboard.isVisible;

export default onboardSlice.reducer;
