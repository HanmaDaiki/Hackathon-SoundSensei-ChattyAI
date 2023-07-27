import { FC } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import { LanguageState } from '../../../interfaces/LanguageState';
import styles from './Overlay.module.scss';



export const Overlay: FC = () => {
  const { currentLanguage } = useSelector((state: { lang: LanguageState }) => state.lang);

  return <div className={styles.overlay}>
    <div className={cn(styles.gif, styles[currentLanguage])}></div>
  </div>;
};
