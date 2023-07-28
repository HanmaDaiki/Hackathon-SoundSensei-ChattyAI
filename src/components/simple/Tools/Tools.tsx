import { FC } from 'react';

import styles from './Tools.module.scss';
import { Mic } from '../../ui/Mic/Mic';
import { Next } from '../../ui/Next/Next';
import { LikeStory } from '../../ui/LikeStory/LikeStory';

export const Tools: FC = () =>
  {
  return <div className={styles.tools}>
    <Next />
    <LikeStory />
    <Mic />
  </div>;
};
