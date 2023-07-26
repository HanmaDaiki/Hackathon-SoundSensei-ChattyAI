import { FC } from 'react';

import styles from './Chat.module.scss';
import { StoryState } from '../../../interfaces/StoryState';
import { useSelector } from 'react-redux';
import { Message } from '../../ui/Message/Message';

export const Chat: FC = () => {
  const { currentStory, helloMessage } = useSelector((state: { story: StoryState }) => state.story);

  return(
    <div className={styles.chat}>
      <Message botMessage={true}>{helloMessage}</Message>
      {currentStory.map((story, index) => (
        <Message key={index} botMessage={story.owner === 'bot'}>{story.text}</Message>
      ))}
    </div>
  );
};
