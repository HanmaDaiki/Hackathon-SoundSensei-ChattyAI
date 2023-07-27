import { FC } from 'react';
import { useSelector } from 'react-redux';

import { StoryState } from '../../../interfaces/StoryState';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { nextStory, saveAllStories } from '../../../store/storySlice';
import styles from './Next.module.scss';


export const Next: FC = () => {
  const { statusApiIsLoading } = useSelector((state: { story: StoryState }) => state.story);
  const dispatch = useAppDispatch();

  return <button disabled={statusApiIsLoading} className={styles.next} onClick={() => {
    dispatch(nextStory());
    dispatch(saveAllStories());
  }}><div className={styles.img}></div></button>;
};
