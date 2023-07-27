import { FC, useEffect, useState } from 'react';

import { StoryState } from '../../../interfaces/StoryState';
import { useSelector } from 'react-redux';
import { Message } from '../../ui/Message/Message';
import styles from './Chat.module.scss';
import { LanguageState } from '../../../interfaces/LanguageState';


export const Chat: FC = () => {
  const [hello, setHello] = useState('');

  const { currentStory } = useSelector((state: { story: StoryState }) => state.story);
  const { language, currentLanguage } = useSelector((state: { lang: LanguageState }) => state.lang);

  useEffect(() => {
    setHello(language[currentLanguage].helloMessage);
  }, [currentLanguage, language]);

  return(
    <div className={styles.chat}>
      <Message botMessage={true}>{hello}</Message>
      {currentStory.map((story, index) => (
        <Message key={index} botMessage={story.owner === 'bot'}>{story.text}</Message>
      ))}
    </div>
  );
};
