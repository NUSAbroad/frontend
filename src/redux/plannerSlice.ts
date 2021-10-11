import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "./store";

interface PlannerState {
  unis: string[];
}

const initialState: PlannerState = {
  unis: [],
};

export const plannerSlice = createSlice({
  name: "planner",
  initialState,
  reducers: {
    addNewUni: (state, action) => {
      state.unis.push(action.payload.uni);
    },
  },
});

export const { addNewUni } = plannerSlice.actions;

export const getUnis = (state: RootState): string[] => state.planner.unis;

export default plannerSlice.reducer;
