export interface Message {
  owner: 'bot' | 'user';
  text: string;
}

export interface AllStoriesMessage {
  text: string;
  isLiked: boolean;
  image: string;
}

export interface StoryState {
  currentStory: Message[];
  allStories: AllStoriesMessage[];
  favoritesStories: AllStoriesMessage[];
  statusApiIsLoading: boolean;
}