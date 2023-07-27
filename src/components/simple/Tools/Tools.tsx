import { FC } from 'react';

import styles from './Tools.module.scss';
import { Mic } from '../../ui/Mic/Mic';
import { Next } from '../../ui/Next/Next';
import { VoiceText } from '../../ui/VoiceText/VoiceText';

export const Tools: FC = () =>
  {
  return <div className={styles.tools}>
    <VoiceText />
    <Next />
    <Mic />
  </div>;
};
