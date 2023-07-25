import { FC } from 'react';

import styles from './Header.module.scss';
import flagRU from '../../../images/flagRU.svg';
interface IProps {
  from: string;
}
export const Header: FC<IProps> = (props) => {
  const { from } = props;

  return <header className={styles.header}>

    <span>{from}</span>
    <img src={flagRU} alt="flag RU"></img>
  </header>;
};
