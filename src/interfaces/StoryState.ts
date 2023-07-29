export interface Message {
  owner: 'bot' | 'user';
  text: string;
}

export interface AllStoriesMessage {
  text: string;
  image: string;
}

export interface StoryState {
  currentStory: Message[];
  allStories: AllStoriesMessage[];
  statusApiIsLoading: boolean;
  generation: number;
}