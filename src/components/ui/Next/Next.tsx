import { FC } from 'react';

import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { nextStory, saveAllStories } from '../../../store/storySlice';
import styles from './Next.module.scss';

export const Next: FC = () => {
  const dispatch = useAppDispatch();

  return <button className={styles.next} onClick={() => {
    dispatch(nextStory());
    dispatch(saveAllStories());
  }}><div className={styles.img}></div></button>;
};
