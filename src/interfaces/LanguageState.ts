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
    currentLanguage: 'ru' | 'en' | 'cn' | 'ae' | 'fr';
    language: {
      ru: lang;
      en: lang;
      cn: lang;
      ae: lang;
      fr: lang;
    };
}