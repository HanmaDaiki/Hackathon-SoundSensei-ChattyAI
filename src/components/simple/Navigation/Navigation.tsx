import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import magicBall from '../../../images/magic-ball.png';
import heart from '../../../images/heart.png';
import star from '../../../images/star.png';
import book from '../../../images/book.png';
import styles from './Navigation.module.scss';

export const Navigation: FC = () => {
  return (
    <nav className={styles.navigation}>
      <NavLink
        to='/'
        className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : styles.link)}
      > 
        <img src={magicBall} alt={'Волшебный шар'} width={34} height={41}/>
        Чат
      </NavLink>
      <NavLink
        to='/favorites'
        className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : styles.link)}
      >
        <img src={heart} alt={'Сердечко'} width={32} height={32}/>
        Избраное
      </NavLink>
      <NavLink
        to='/my-fairy-tales'
        className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : styles.link)}
      >
        <img src={star} alt={'Звезда'} width={43} height={41}/>
        Мои сказки
      </NavLink>
      <NavLink
        to='/settings'
        className={({ isActive, isPending }) => (isPending ? styles.pending : isActive ? styles.active : styles.link)}
      >
        <img src={book} alt={'Кинга'} width={47} height={30}/>
        Настройки
      </NavLink>
    </nav>
  );
};
