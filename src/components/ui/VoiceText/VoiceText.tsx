import { FC } from 'react';
import { useSelector } from 'react-redux';

import { StoryState } from '../../../interfaces/StoryState';
import styles from './VoiceText.module.scss';


export const VoiceText: FC = () => {
  const { statusApiIsLoading } = useSelector((state: { story: StoryState }) => state.story);
  
  return <button disabled={statusApiIsLoading} className={styles.voiceText}><div className={styles.img}></div></button>;
};
