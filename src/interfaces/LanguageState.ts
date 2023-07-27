export interface lang {
    storyteller: string;
    chat: string;
    library: string;
    favorites: string;
    helloMessage: string;
    inputPlaceholder: string;
    inputPlaceholderAwaiting: string;
};

export interface LanguageState {
    currentLanguage: 'ru' | 'en' | 'zh' | 'ae' | 'fr';
    language: {
      ru: lang;
      en: lang;
      zh: lang;
      ae: lang;
      fr: lang;
    };
}