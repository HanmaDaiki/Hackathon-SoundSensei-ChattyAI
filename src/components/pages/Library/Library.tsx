import { FC } from 'react';

import { StoryState } from '../../../interfaces/StoryState';
import { useSelector } from 'react-redux';
import { Header } from '../../simple/Header/Header';
import styles from './Library.module.scss';
import { LanguageState } from '../../../interfaces/LanguageState';


export const Library: FC = () => {
  const { allStories } = useSelector((state: { story: StoryState }) => state.story);
  const { language, currentLanguage } = useSelector((state: { lang: LanguageState }) => state.lang);


  return(
    <div>
      <Header from={language[currentLanguage].library} />

      <div className={styles.container}>
        {
          allStories.map((story, index) => {
            return <span key={index}>{story.reduce((accumulator, currentValue) => accumulator + currentValue.text, '')}</span>
          })
        }
      </div>
    </div>
  );
};
