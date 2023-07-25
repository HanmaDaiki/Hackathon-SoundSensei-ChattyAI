import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './NotFoundPage.module.scss';


export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return <div className={styles['not-found']}>
    Not Found Page
    <button onClick={() => navigate('/')} />  
  </div>;
};
