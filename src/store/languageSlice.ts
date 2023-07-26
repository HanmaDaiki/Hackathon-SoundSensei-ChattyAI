import { createSlice } from "@reduxjs/toolkit";
import { LanguageState } from "../interfaces/LanguageState";

const initialState: LanguageState = {
  currentLanguage: 'ru',
  language: {
    en: {
      storyteller: 'Storyteller',
      chat: 'Chat',
      library: 'Library',
      favorites: 'Favorites',
      helloMessage: 'Hello! My name is a storyteller. I can come up with and tell a fairy tale',
      inputPlaceholder: 'What fairy tale do you want?',
      inputPlaceholderAwaiting: 'Now I will come up with something ...'
    },
    ru: {
      storyteller: 'Сказочник',
      chat: 'Чат ',
      library: 'Библиотека',
      favorites: 'Избранное',
      helloMessage: 'Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку',
      inputPlaceholder: 'Какую сказку ты хочешь?',
      inputPlaceholderAwaiting: 'Сейчас что-нибудь придумаю ...'
    },
    cn: {
      storyteller: '说故事的人',
      chat: '聊天 ',
      library: '图书馆',
      favorites: '最爱',
      helloMessage: '你好！我叫讲故事的人。我可以想出一个童话故事',
      inputPlaceholder: '你想要什么童话？',
      inputPlaceholderAwaiting: '现在我会想出一些东西 ...'
    },
    ae: {
      storyteller: 'القصص',
      chat: 'محادثة ',
      library: 'مكتبة',
      favorites: 'المفضلة',
      helloMessage: 'مرحبًا! اسمي رواة القصص. يمكنني الخروج وأخبر حكاية خرافية',
      inputPlaceholder: 'ما هي الحكاية الخيالية التي تريدها؟',
      inputPlaceholderAwaiting: 'الآن سوف أتوصل إلى شيء ...'
    },
    fr: {
      storyteller: 'Conteur',
      chat: 'Discuter ',
      library: 'Bibliothèque',
      favorites: 'Favoris',
      helloMessage: 'Bonjour! Mon nom est un conteur. Je peux trouver et raconter un conte de fées',
      inputPlaceholder: 'Quel conte de fées voulez-vous?',
      inputPlaceholderAwaiting: 'Maintenant, je vais trouver quelque chose ...'
    },
  },
}

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const languageReducer = languageSlice.reducer;
export const { setLanguage } = languageSlice.actions;