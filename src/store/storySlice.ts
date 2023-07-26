import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoryState } from '../interfaces/StoryState';
import { Configuration, OpenAIApi } from 'openai';

const initialState: StoryState = {
  currentStory: [{ owner: 'bot', text: 'Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку' }],
  allStories: [],
  statusApiIsLoading: false,
};

export const getOpenAiStory = createAsyncThunk('story/getOpenAiStory', async (data: { prompt: string }) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const result = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: data.prompt }],
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
      state.currentStory = JSON.parse(
        localStorage.getItem('currentStory') ||
          '[{"owner":"bot","text":"Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку"}]'
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
        JSON.stringify([
          { owner: 'bot', text: 'Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку' },
        ])
      );
    },

    nextStory: (state) => {
      if (state.allStories.length === 20) {
        state.allStories.shift();
      }
      
      if ([...state.currentStory.filter((story) => story.owner === 'bot')].length > 1) {
        state.allStories.push([...state.currentStory.filter((story) => story.owner === 'bot')]);
        state.currentStory = [
          { owner: 'bot', text: 'Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку' },
        ];
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
} = storySlice.actions;
export const storyReducer = storySlice.reducer;
