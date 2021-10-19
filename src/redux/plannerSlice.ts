import { createSlice } from "@reduxjs/toolkit";

import { View } from "../constants/plannerViews";
import { RootState } from "./store";

interface PlannerState {
  unis: string[];
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
    addNewUni: (state, action) => {
      state.unis.push(action.payload.uni);
    },
    setView: (state, action) => {
      state.view = action.payload;
    },
  },
});

export const { addNewUni, setView } = plannerSlice.actions;

export const getUnis = (state: RootState): string[] => state.planner.unis;

export const getCurrView = (state: RootState): View => state.planner.view;

export default plannerSlice.reducer;
