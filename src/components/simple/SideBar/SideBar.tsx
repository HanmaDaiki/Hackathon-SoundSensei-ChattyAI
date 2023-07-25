import { FC } from 'react';

import { Navigation } from '../Navigation/Navigation';
import styles from './SideBar.module.scss';


export const SideBar: FC = () => {
  return <aside className={styles.sidebar}>
    <Navigation />
  </aside>
};
