import { FC } from 'react';

import { StoryState } from '../../../interfaces/StoryState';
import { useSelector } from 'react-redux';
import { Header } from '../../simple/Header/Header';
import styles from './Library.module.scss';


export const Library: FC = () => {
  const { allStories } = useSelector((state: { story: StoryState }) => state.story);

  return(
    <div>
      <Header from='Мои сказки' />

      <div className={styles.container}>
        {
          allStories.map((story, index) => {
            return <span key={index}>{story.slice(1).reduce((accumulator, currentValue) => accumulator + currentValue.text, '')}</span>
          })
        }
      </div>
    </div>
  );
};
