import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StoryState } from "../interfaces/StoryState";
import { Configuration, OpenAIApi } from "openai";
import { generateRandomNumber } from "../utils/generateRandomNumber";
import { imagesCard } from "../utils/constants";

const initialState: StoryState = {
  currentStory: [],
  allStories: [],
  statusApiIsLoading: false,
  generation: 0,
};

export const getOpenAiStory = createAsyncThunk(
  "story/getOpenAiStory",
  async (data: { prompt: string; keyWords: string }) => {
    try {
      const configuration = new Configuration({
        apiKey: process.env.REACT_APP_API_KEY,
      });
      const openai = new OpenAIApi(configuration);

      const result = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: `${data.keyWords} ${data.prompt}` },
        ],
      });
      return result.data.choices[0].message?.content;
    } catch (err) {
      console.log(err);
    }
  }
);

const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    loadData: (state) => {
      state.allStories = JSON.parse(localStorage.getItem("allStories") || "[]");
      state.currentStory = JSON.parse(
        localStorage.getItem("currentStory") || `[]`
      );
      state.generation = JSON.parse(localStorage.getItem("generation") || "0");
    },

    addUserMessageToCurrentStory: (state, action) => {
      state.currentStory.push({ owner: "user", text: action.payload });
    },

    saveCurrentStory: (state) => {
      localStorage.setItem("currentStory", JSON.stringify(state.currentStory));
    },

    saveStory: (state) => {
      if (state.currentStory.length > 0) {
        if (state.allStories.length === 20) {
          state.allStories.pop();
        }

        state.allStories.unshift({
          text: state.currentStory
            .filter((story) => story.owner === "bot")
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue.text,
              ""
            ),
          image: imagesCard[generateRandomNumber(imagesCard.length)],
        });
        state.currentStory = [];
        state.generation = 0;
        localStorage.setItem("generation", JSON.stringify(state.generation));
        localStorage.setItem("allStories", JSON.stringify(state.allStories));
        localStorage.setItem("currentStory", JSON.stringify([]));
      }
    },

    nextStory: (state) => {
      state.currentStory = [];
      localStorage.setItem("currentStory", JSON.stringify([]));
    },

    deleteSavedStory: (state, action) => {
      state.allStories = state.allStories.filter(
        (story) => story.text !== action.payload
      );
      localStorage.setItem("allStories", JSON.stringify(state.allStories));
    },

    updateStatusApiIsLoading(state, action) {
      state.statusApiIsLoading = action.payload;
    },

    resetGenaration(state) {
      state.generation = 0;
      localStorage.setItem("generation", JSON.stringify(state.generation));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOpenAiStory.fulfilled, (state, action) => {
      if (typeof action.payload === "string") {
        state.currentStory.push({ owner: "bot", text: action.payload });
        state.generation += 1;
        localStorage.setItem("generation", JSON.stringify(state.generation));
        localStorage.setItem(
          "currentStory",
          JSON.stringify(state.currentStory)
        );
      }
    });
  },
});

export const {
  addUserMessageToCurrentStory,
  nextStory,
  saveCurrentStory,
  loadData,
  updateStatusApiIsLoading,
  saveStory,
  deleteSavedStory,
  resetGenaration,
} = storySlice.actions;
export const storyReducer = storySlice.reducer;
