export interface Message {
  owner: 'bot' | 'user';
  text: string;
}

export interface StoryState {
  currentStory: Message[];
  allStories: Message[][];
  statusApiIsLoading: boolean;
  helloMessage: string;
}