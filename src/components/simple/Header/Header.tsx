import { FC } from 'react';

import styles from './Header.module.scss';

interface IProps {
  from: string;
}
export const Header: FC<IProps> = (props) => {
  const { from } = props;

  return <header className={styles.header}>{from}</header>;
};
