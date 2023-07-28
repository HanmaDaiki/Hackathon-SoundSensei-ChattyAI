import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoryState } from '../interfaces/StoryState';
import { Configuration, OpenAIApi } from 'openai';
import { generateRandomNumber } from '../utils/generateRandomNumber';
import { imagesCard } from '../utils/constants';

const initialState: StoryState = {
  currentStory: [],
  allStories: [],
  favoritesStories: [],
  statusApiIsLoading: false,
};

export const getOpenAiStory = createAsyncThunk('story/getOpenAiStory', async (data: { prompt: string, keyWords: string }) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: `${data.keyWords} ${data.prompt}` }],
    });
    return result.data.choices[0].message?.content;
  } catch (err) {
    console.log(err);
  }
});

const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    loadData: (state) => {
      state.allStories = JSON.parse(localStorage.getItem('allStories') || '[]');
      state.favoritesStories = JSON.parse(localStorage.getItem('favoritesStories') || '[]');
      state.currentStory = JSON.parse(
        localStorage.getItem('currentStory') || `[]`
      );
    },

    addUserMessageToCurrentStory: (state, action) => {
      state.currentStory.push({ owner: 'user', text: action.payload });
    },

    saveCurrentStory: (state) => {
      localStorage.setItem('currentStory', JSON.stringify(state.currentStory));
    },

    saveAllStories: (state) => {
      localStorage.setItem('allStories', JSON.stringify(state.allStories));
      localStorage.setItem(
        'currentStory',
        JSON.stringify([])
      );
    },

    toggleLikeStory: (state, action) => {
      state.allStories.forEach((story, index) => {
        if(story.text === action.payload) {
          state.allStories[index].isLiked = !state.allStories[index].isLiked;
          if(state.allStories[index].isLiked) {
            state.favoritesStories.push(state.allStories[index]);
          }

          if(!state.allStories[index].isLiked) {
            state.favoritesStories = state.favoritesStories.filter((story) => story.text !== state.allStories[index].text);
          }
        }
      });

      localStorage.setItem('favoritesStories', JSON.stringify(state.favoritesStories));
      localStorage.setItem('allStories', JSON.stringify(state.allStories));
    },

    nextStory: (state) => {
      if(state.currentStory.length > 0) {
        state.allStories.push({ isLiked: false, text: state.currentStory.reduce((accumulator, currentValue) => accumulator + currentValue.text, ''), image: imagesCard[generateRandomNumber(imagesCard.length)] });
        state.currentStory = [];
      }
    },

    updateStatusApiIsLoading(state, action) {
      state.statusApiIsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOpenAiStory.fulfilled, (state, action) => {
      if (typeof action.payload === 'string') {
        state.currentStory.push({ owner: 'bot', text: action.payload });
        localStorage.setItem('currentStory', JSON.stringify(state.currentStory));
      }
    });
  },
});

export const {
  addUserMessageToCurrentStory,
  nextStory,
  saveCurrentStory,
  saveAllStories,
  loadData,
  updateStatusApiIsLoading,
  toggleLikeStory
} = storySlice.actions;
export const storyReducer = storySlice.reducer;
