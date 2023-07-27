import { FC } from 'react';

import { Header } from '../../simple/Header/Header';
import { useSelector } from 'react-redux';
import { LanguageState } from '../../../interfaces/LanguageState';
import styles from './Favorites.module.scss';



export const Favorites: FC = () => {
  const { language, currentLanguage } = useSelector((state: {lang: LanguageState} ) => state.lang);


  return(
    <div className={styles.favorites}>
      <Header from={language[currentLanguage].favorites} />
    </div>
  );
};
