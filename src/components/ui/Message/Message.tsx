import { FC, PropsWithChildren } from 'react';
import cn from 'classnames';

import styles from './Message.module.scss';

interface IProps extends PropsWithChildren {
  botMessage: boolean;
}
export const Message: FC<IProps> = (props) => {
  const { botMessage, children } = props;

  return <div className={cn(styles.message, botMessage && styles.bot)}>{children}</div>;
};
