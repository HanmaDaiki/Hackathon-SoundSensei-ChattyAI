import { FC } from "react";

import { HintOverlayProps } from "../../../interfaces/HintOverlayProps";
import star from "../../../images/star.png";
import styles from "./Hint.module.scss";

export const Hint: FC<HintOverlayProps> = ({
  handleHintsOverlay,
}: HintOverlayProps) => {
  return (
    <div onClick={handleHintsOverlay} className={styles.hintcontainer}>
      <div className={styles.iconcontainer}>
        <img src={star} alt={"Звезды"} width={43} height={41} />
      </div>
      <span className={styles.hintcaption}>Подсказка</span>
    </div>
  );
};
