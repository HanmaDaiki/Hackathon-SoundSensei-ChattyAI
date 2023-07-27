import { configureStore } from "@reduxjs/toolkit";
import { storyReducer } from "./storySlice";
import { languageReducer } from "./languageSlice";

export const store = configureStore({
  reducer: {
    story: storyReducer,
    lang: languageReducer
  },
});

export type AppDispatch = typeof store.dispatch;
