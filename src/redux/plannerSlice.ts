import { createSlice } from "@reduxjs/toolkit";

import { View } from "../constants/plannerViews";
import { RootState } from "./store";

interface PlannerState {
  unis: Types.University[];
  view: View;
}

const initialState: PlannerState = {
  unis: [],
  view: View.MAPPINGS,
};

export const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    setView: (state, action) => {
      state.view = action.payload;
    },
    setUnis: (state, action) => {
      state.unis = action.payload.unis;
    },
    resetUnis: (state) => {
      state.unis = [];
    },
  },
});

export const { setView, resetUnis, setUnis } = plannerSlice.actions;

export const getUnis = (state: RootState): Types.University[] =>
  state.planner.unis;

export const getCurrView = (state: RootState): View => state.planner.view;

export default plannerSlice.reducer;
