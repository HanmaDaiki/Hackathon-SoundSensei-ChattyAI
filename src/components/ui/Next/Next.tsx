import { FC } from 'react';

import styles from './Next.module.scss';

export const Next: FC = () => {
  return <button className={styles.next}><div className={styles.img}></div></button>;
};
