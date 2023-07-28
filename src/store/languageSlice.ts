import { createSlice } from "@reduxjs/toolkit";
import { LanguageState } from "../interfaces/LanguageState";

const initialState: LanguageState = {
  currentLanguage: "ru",
  language: {
    en: {
      storyteller: "Storyteller",
      chat: "Chat",
      library: "Library",
      favorites: "Favorites",
      helloMessage:
        "Hello! My name is a storyteller. I can come up with and tell a fairy tale",
      inputPlaceholder: "What fairy tale do you want?",
      inputPlaceholderAwaiting: "Now I will come up with something ...",
      keyWords: "Tell the fairy tale about ",
      miniStory: "Tell a fairy tale in one sentence",
      emptyLib: `We have not yet come up with a single fairy tale \n It's time to create them in a Chat :)`,
      emptyFav: "Mark the heart of any fairy tale,\n and it will appear here",
      hint: "Hint",
      hintNewTale:
        "Let's come up with another fairy tale? Click to clean the chat",
      hintFavTale:
        "Click on the heart, and the fairy tale will remain in your Library",
      hintMic:
        "To create a fairy tale, click the button with the asterisk and speak",
    },
    ru: {
      storyteller: "Сказочник",
      chat: "Чат ",
      library: "Библиотека",
      favorites: "Избранное",
      helloMessage:
        "Привет! Меня зовут Сказочник. Могу придумать и рассказать сказку",
      inputPlaceholder: "Какую сказку ты хочешь?",
      inputPlaceholderAwaiting: "Сейчас что-нибудь придумаю ...",
      keyWords: "Расскажи сказку о ",
      miniStory: "Расскажи сказку короткую в одном предложении ",
      emptyLib:
        "Мы еще не придумали ни одной сказки\n Пора создавать их в Чате :)",
      emptyFav: "Отметь сердечком любую сказку,\n и она появится здесь",
      hint: "Подсказка",
      hintNewTale: "Придумаем другую сказку? Нажми чтобы очистить чат",
      hintFavTale: "Нажми на сердечко, и сказка сохранится в твоей Библиотеке",
      hintMic: "Чтобы создать сказку зажми кнопку со звёздочкой и говори",
    },
    zh: {
      storyteller: "说故事的人",
      chat: "聊天 ",
      library: "图书馆",
      favorites: "最爱",
      helloMessage: "你好！我叫童话。我可以想出一个童话故事",
      inputPlaceholder: "你想要什么童话？",
      inputPlaceholderAwaiting: "现在我会想出一些东西 ...",
      keyWords: "讲述童话 ",
      miniStory: "用一句话讲一个童话",
      emptyLib: "我们还没有提出一个童话故事是时候在聊天中创建它们:)",
      emptyFav: "标记任何童话的心，\n 它将出现在这里",
      hint: "暗示",
      hintNewTale: "让我们想出另一个童话呢？点击清洁聊天",
      hintFavTale: "单击心脏，童话故事将留在您的图书馆中",
      hintMic: "要创建一个童话故事，请用星号单击按钮然后说话",
    },
    ae: {
      storyteller: "القصص",
      chat: "محادثة ",
      library: "مكتبة",
      favorites: "المفضلة",
      helloMessage: "مرحبًا! اسمي رواة القصص. يمكنني الخروج وأخبر حكاية خرافية",
      inputPlaceholder: "ما هي الحكاية الخيالية التي تريدها؟",
      inputPlaceholderAwaiting: "الآن سوف أتوصل إلى شيء ...",
      keyWords: "أخبر الحكاية الخيالية عن",
      miniStory: "أخبر حكاية خرافية في جملة واحدة",
      emptyLib:
        "لم نتوصل بعد إلى قصة خرافية واحدةن الوقت لإنشائها في الدردشة :)",
      emptyFav: "Отметь сердечком любую сказку,\n и она появится здесь",
      hint: "تَلمِيح",
      hintNewTale: "دعنا نتوصل إلى قصة خرافية أخرى؟ انقر لتنظيف الدردشة",
      hintFavTale: "انقر على القلب ، وستبقى الحكاية الخيالية في 'مكتبتك'",
      hintMic: "لإنشاء قصة خرافية ، انقر فوق الزر مع العلامة النجمية والتحدث",
    },
    fr: {
      storyteller: "Conteur",
      chat: "Discuter ",
      library: "Bibliothèque",
      favorites: "Favoris",
      helloMessage:
        "Bonjour! Mon nom est un Conteur. Je peux trouver et raconter un conte de fées",
      inputPlaceholder: "Quel conte de fées voulez-vous?",
      inputPlaceholderAwaiting: "Maintenant, je vais trouver quelque chose ...",
      keyWords: "Raconter le conte de fées",
      miniStory: "Raconter un conte de fées en une phrase",
      emptyLib:
        "Nous n'avons pas encore trouvé un seul conte de fées\n Il est temps de les créer dans un Chat :)",
      emptyFav: "Marquez le cœur de tout conte de fées,\n et il apparaîtra ici",
      hint: "Indice",
      hintNewTale:
        "Voyons un autre conte de fées? Cliquez pour nettoyer le chat",
      hintFavTale:
        "Cliquez sur le cœur et le conte de fées restera dans votre Bibliothèque",
      hintMic:
        "Pour créer un conte de fées, cliquez sur le bouton avec l'astérisque et parlez",
    },
  },
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      state.currentLanguage = action.payload;
    },
  },
});

export const languageReducer = languageSlice.reducer;
export const { setLanguage } = languageSlice.actions;
