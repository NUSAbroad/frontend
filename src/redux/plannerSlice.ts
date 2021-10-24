import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

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
        const removeMapping = { ...uni, Mappings: [] };
        newUnis.push(removeMapping);
        state.unis = newUnis;
      }
    },
    removeUni: (state, action) => {
      const uni = action.payload;
      state.unis = [...state.unis].filter((newUni) => newUni.id !== uni.id);
    },
    addMapping: (state, action) => {
      const { uni, mapping } = action.payload;
      const newUnis = [...state.unis];
      let relatedUniIndex = newUnis.findIndex((newUni) => newUni.id === uni.id);
      if (relatedUniIndex === -1) {
        const removeMapping = { ...uni, Mappings: [] };
        newUnis.push(removeMapping);
        relatedUniIndex = newUnis.length - 1;
      }
      const relatedUni = { ...newUnis[relatedUniIndex] };
      const index = relatedUni.Mappings.findIndex(
        (map) => map.id === mapping.id
      );
      if (index === -1) {
        const newMappings = [...relatedUni.Mappings];
        newMappings.push(mapping);
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
      newUnis[relatedUniIndex] = relatedUni;
      state.unis = newUnis;
    },
    createMapping: (state, action) => {
      const uniId = action.payload;
      const emptyMapping: Types.Mapping = {
        id: uuidv4(),
        nusModuleFaculty: "",
        nusModuleCode: "",
        nusModuleName: "",
        nusModuleCredits: 0,
        partnerModuleCode: "",
        partnerModuleName: "",
        partnerModuleCredits: 0,
        updatedAt: new Date().toISOString(),
      };
      const uniIndex = state.unis.findIndex((uni) => uni.id === uniId);
      if (uniIndex === -1) {
        return;
      }
      state.unis[uniIndex].Mappings.push(emptyMapping);
    },
    updateMapping: (state, action) => {
      const { uniId, mapping } = action.payload;
      const uniIndex = state.unis.findIndex((uni) => uni.id === uniId);
      if (uniIndex === -1) {
        return;
      }
      const mappingIndex = state.unis[uniIndex].Mappings.findIndex(
        (m) => m.id === mapping.id
      );
      if (mappingIndex === -1) {
        return;
      }
      state.unis[uniIndex].Mappings[mappingIndex] = mapping;
    },
  },
});

export const {
  setView,
  resetUnis,
  addUni,
  removeUni,
  addMapping,
  removeMapping,
  createMapping,
  updateMapping,
} = plannerSlice.actions;

export const getUnis = (state: RootState): Types.University[] =>
  state.planner.present.unis;

export const getCurrView = (state: RootState): View =>
  state.planner.present.view;

export default plannerSlice.reducer;
