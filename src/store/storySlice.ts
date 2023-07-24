import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoryState } from "../interfaces/StoryState";
import { Configuration, OpenAIApi } from "openai";

import { openaiSettings } from "../utils/constants";

const initialState: StoryState = {
  currentStory: [],
  allStories: [],

};

export const getOpenAiStory = createAsyncThunk("story/getOpenAiStory", async (data: { prompt: string }) => {
  console.log(process.env.REACT_APP_API_KEY);
  
  try {
    const configuration = new Configuration({
      apiKey:process.env.REACT_APP_API_KEY,
    })
    const openai = new OpenAIApi(configuration);

    const result = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: data.prompt }],
    });
    return result.data.choices[0].message?.content;
  } catch (err) {
    console.log(err);
  }
});

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getOpenAiStory.fulfilled, (state, action) => {
      if(typeof action.payload === 'string') {
        state.currentStory.push(action.payload);
      }
    });
  }
});

export const storyReducer = storySlice.reducer;
