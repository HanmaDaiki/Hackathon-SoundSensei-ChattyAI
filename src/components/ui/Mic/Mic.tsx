import { FC } from 'react';

import styles from './Mic.module.scss';

type IProps = {

  handleHover: () => void

}
export const Mic: FC<IProps> = ({ handleHover }: IProps) => {
  return <button onMouseEnter={handleHover} onMouseLeave={handleHover}  className={styles.mic} />;
};
