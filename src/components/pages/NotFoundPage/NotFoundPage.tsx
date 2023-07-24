import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../ui/Button/Button';

import styles from './NotFoundPage.module.scss';


export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  return <div className={styles['not-found']}>
    Not Found Page
    <Button moreClassName='btn' onClick={() => navigate('/')}>Go Back To Main</Button>  
  </div>;
};
