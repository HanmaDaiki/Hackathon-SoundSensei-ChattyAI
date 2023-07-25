import { FC } from 'react';

import styles from './Tools.module.scss';
import { Mic } from '../../ui/Mic/Mic';
import { Next } from '../../ui/Next/Next';
import { VoiceText } from '../../ui/VoiceText/VoiceText';

type IProps = {

  handleHover: () => void

}
export const Tools:FC<IProps> = ({handleHover}: IProps) =>
  {
  return <div className={styles.tools}>
    <VoiceText />
    <Next />
    <Mic handleHover={handleHover}/>
  </div>;
};
