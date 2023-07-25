import { FC } from 'react';

import styles from './VoiceText.module.scss';

export const VoiceText: FC = () => {
  return <button className={styles.voiceText}><div className={styles.img}></div></button>;
};
