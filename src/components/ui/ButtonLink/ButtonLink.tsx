import { FC, PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './ButtonLink.module.scss';

interface IProps extends PropsWithChildren {
  redirectTo: string;
}
export const ButtonLink: FC<IProps> = ({ redirectTo, children }) => {
  const navigate = useNavigate();

  return <button className={styles.button} onClick={() => navigate(redirectTo)}>{ children }</button>;
};
