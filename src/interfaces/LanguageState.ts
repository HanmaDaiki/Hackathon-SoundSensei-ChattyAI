export interface lang {
  storyteller: string;
  chat: string;
  library: string;
  favorites: string;
  helloMessage: string;
  inputPlaceholder: string;
  inputPlaceholderAwaiting: string;
  keyWords: string;
  miniStory: string;
  emptyLib: string;
  emptyFav: string;
  hint: string;
  hintNewTale: string;
  hintFavTale: string;
  hintMic: string;
  searchPlaceholder: string;
  notFoundPage: string;
}

export interface LanguageState {
  currentLanguage: "ru" | "en" | "zh" | "fr";
  language: {
    ru: lang;
    en: lang;
    zh: lang;
    fr: lang;
  };
}
