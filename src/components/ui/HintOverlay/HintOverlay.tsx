import { FC } from "react";
import cn from "classnames";

import styles from "./HintOverlay.module.scss";

export const HintOverlay: FC = () => {
  return (
    <div className={styles.hintoverlay}>
      <div className={styles.hintbubble}>Хочешь послушать сказку?</div>
      <div className={cn(styles.hintbubble, styles.newtalehint)}>
        Придумаем новую сказку? Готовая сказка сохранится в Библиотеке
      </div>
      <div className={cn(styles.hintbubble, styles.michint)}>
        Чтобы создать сказку, зажми кнопку со звездочкой и говори
      </div>
    </div>
  );
};
