import { FC, useState } from "react";

import { imagesCard } from "../../../utils/constants";
import { generateRandomNumber } from "../../../utils/generateRandomNumber";
import styles from "./Card.module.scss";

interface IProps {
  text: string;
}
export const Card: FC<IProps> = ({ text }) => {
  const srcImage = imagesCard[generateRandomNumber(imagesCard.length - 1)];
  const [isOpen, toggleOpen] = useState(false);

  return (
    <div className={styles.card} onClick={() => toggleOpen(true)}>
      <img src={srcImage} alt="Картинка" width={440} height={220} />
      <div className={styles.bottom}>
        <span>{text}</span>
        <button className={styles.like}></button>
      </div>

      {isOpen && (
        <div
          className={styles.full}
          onClick={(e) => {
            e.stopPropagation();
            toggleOpen(false);
          }}
        >
          <div className={styles.content}>
            <div className={styles.text}>{text}</div>
            <div className={styles.decor} />
          </div>
        </div>
      )}
    </div>
  );
};
