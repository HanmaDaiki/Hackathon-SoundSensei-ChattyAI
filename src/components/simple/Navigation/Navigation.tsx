import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { StoryState } from '../../../interfaces/StoryState';
import magicBall from '../../../images/magic-ball.png';
import heart from '../../../images/heart.png';
import book from '../../../images/book.png';
import styles from './Navigation.module.scss';
import { LanguageState } from '../../../interfaces/LanguageState';


export const Navigation: FC = () => {
  const { statusApiIsLoading } = useSelector((state: { story: StoryState }) => state.story);
  const { language, currentLanguage } = useSelector((state: {lang: LanguageState} ) => state.lang);


  return (
    <nav className={styles.navigation}>
      <NavLink
        to='/'
        style={{ pointerEvents: statusApiIsLoading ? 'none' : 'auto' }}
        className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : styles.link)}
      > 
        <img src={magicBall} alt={'Волшебный шар'} width={34} height={41}/>
        {language[currentLanguage].chat}
      </NavLink>
      <NavLink
        to='/favorites'
        style={{ pointerEvents: statusApiIsLoading ? 'none' : 'auto' }}
        className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : styles.link)}
      >
        <img src={heart} alt={'Сердечко'} width={32} height={32}/>
        {language[currentLanguage].favorites}
      </NavLink>
      <NavLink
        to='/library'
        style={{ pointerEvents: statusApiIsLoading ? 'none' : 'auto' }}
        className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : styles.link)}
      >
        <img src={book} alt={'Книга'} width={47} height={30}/>
        {language[currentLanguage].library}
      </NavLink>
    </nav>
  );
};
