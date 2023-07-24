import { FC } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

interface IProps {
  children: React.ReactNode;
  moreClassName: string;
  onClick: () => void;
}
export const Button: FC<IProps> = (props) => {
  const { children, moreClassName, onClick } = props;
  return <button onClick={onClick} className={classNames(styles.button, styles[moreClassName])}>{children}</button>;
};
