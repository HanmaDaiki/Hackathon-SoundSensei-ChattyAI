import { FC } from 'react';

import { StoryState } from '../../../interfaces/StoryState';
import { useSelector } from 'react-redux';
import { Header } from '../../simple/Header/Header';
import styles from './Library.module.scss';
import { LanguageState } from '../../../interfaces/LanguageState';
import { Card } from '../../ui/Card/Card';


export const Library: FC = () => {
  const { allStories } = useSelector((state: { story: StoryState }) => state.story);
  const { language, currentLanguage } = useSelector((state: { lang: LanguageState }) => state.lang);


  return(
    <div className={styles.library}>
      <Header from={language[currentLanguage].library} />

      <div className={styles.container}>
        {
          allStories.map((story, index) => {
            return <Card key={index} text={story.reduce((accumulator, currentValue) => accumulator + currentValue.text, '')} />
          })
        }
      </div>

      <div className={styles.counters}>{allStories.length}/20</div>
    </div>
  );
};
