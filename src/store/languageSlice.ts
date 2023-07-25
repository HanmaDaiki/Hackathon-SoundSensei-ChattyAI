import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: {
    en: {},
    ru: {}
  },
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
  },
})