import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StoryState } from '../interfaces/StoryState';
import { Configuration, OpenAIApi } from 'openai';

const initialState: StoryState = {
  currentStory: [{ owner: 'bot', text: 'Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку' }],
  allStories: [],
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
    addUserMessageToCurrentStory: (state, action) => {
      state.currentStory.push({ owner: 'user', text: action.payload });
    },

    nextStory: (state) => {
      if(state.allStories.length === 20) {
        state.allStories.shift();
      }

      state.allStories.push([...state.currentStory.filter(story => story.owner === 'bot')]);
      state.currentStory = [{ owner: 'bot', text: 'Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку' }];
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getOpenAiStory.fulfilled, (state, action) => {
      if (typeof action.payload === 'string') {
        state.currentStory.push({ owner: 'bot', text: action.payload });
      }
    });
  },
});

export const { addUserMessageToCurrentStory, nextStory } = storySlice.actions;
export const storyReducer = storySlice.reducer;
