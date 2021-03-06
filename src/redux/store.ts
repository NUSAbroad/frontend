import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import undoable, { excludeAction } from "redux-undo";

import onboardSlice from "./onboardSlice";
import plannerSlice, { setView } from "./plannerSlice";
import toastSlice from "./toastSlice";

const reducers = combineReducers({
  planner: undoable(plannerSlice, { filter: excludeAction([setView]) }),
  toast: toastSlice,
  onboard: onboardSlice,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
