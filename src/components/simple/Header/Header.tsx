import { FC } from "react";

import flagRU from "../../../images/flagRU.svg";
import styles from "./Header.module.scss";
interface IProps {
  from: string;
}
export const Header: FC<IProps> = (props) => {
  const { from } = props;

  return (
    <header className={styles.header}>
      <span className={styles.caption}>{from}</span>
      <div className={styles.flags}>
        <img src={flagRU} alt="flag RU"></img>
      </div>
    </header>
  );
};
