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
    resetUnis: (state) => {
      state.unis = [];
    },
    addUni: (state, action) => {
      const uni = action.payload;
      const newUnis = [...state.unis];
      const index = newUnis.findIndex((newUni) => newUni.id === uni.id);
      if (index === -1) {
        const removeMapping = { ...uni, mappingsCount: 0, Mappings: [] };
        newUnis.push(removeMapping);
        state.unis = newUnis;
      }
    },
    removeUni: (state, action) => {
      const uni = action.payload;
      state.unis = [...state.unis].filter((newUni) => newUni.id !== uni.id);
    },
    addMapping: (state, action) => {
      const { uniId, mapping } = action.payload;
      const newUnis = [...state.unis];
      const relatedUniIndex = newUnis.findIndex((uni) => uni.id === uniId);
      if (relatedUniIndex === -1) {
        return;
      }
      const relatedUni = { ...newUnis[relatedUniIndex] };
      const index = relatedUni.Mappings.findIndex(
        (map) => map.id === mapping.id
      );
      if (index === -1) {
        const newMappings = [...relatedUni.Mappings];
        newMappings.push(mapping);
        relatedUni.mappingsCount = newMappings.length;
        relatedUni.Mappings = newMappings;
        newUnis[relatedUniIndex] = relatedUni;
        state.unis = newUnis;
      }
    },
    removeMapping: (state, action) => {
      const { uniId, mapping } = action.payload;
      const newUnis = [...state.unis];
      const relatedUniIndex = newUnis.findIndex((uni) => uni.id === uniId);
      if (relatedUniIndex === -1) {
        return;
      }
      const relatedUni = { ...newUnis[relatedUniIndex] };
      relatedUni.Mappings = [
        ...relatedUni.Mappings.filter((map) => map.id !== mapping.id),
      ];
      relatedUni.mappingsCount = relatedUni.Mappings.length;
      newUnis[relatedUniIndex] = relatedUni;
      state.unis = newUnis;
    },
  },
});

export const {
  setView,
  resetUnis,
  removeUni,
  addMapping,
  removeMapping,
  addUni,
} = plannerSlice.actions;

export const getUnis = (state: RootState): Types.University[] =>
  state.planner.unis;

export const getCurrView = (state: RootState): View => state.planner.view;

export default plannerSlice.reducer;
