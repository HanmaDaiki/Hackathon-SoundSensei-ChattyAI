import { FC } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import cn from "classnames";

import { HintOverlayProps } from "../../../interfaces/HintOverlayProps";
import { LanguageState } from "../../../interfaces/LanguageState";

import star from "../../../images/star.png";
import styles from "./Hint.module.scss";

export const Hint: FC<HintOverlayProps> = ({
  handleHintsOverlay,
}: HintOverlayProps) => {
  const { language, currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );
  const location = useLocation();

  return (
    <div
      onClick={handleHintsOverlay}
      className={
        location.pathname === "/"
          ? cn(styles.hintcontainer)
          : cn(styles.hidden, styles.hintcontainer)
      }
    >
      <div className={styles.iconcontainer}>
        <img src={star} alt={"Звезды"} width={43} height={41} />
      </div>
      <span className={styles.hintcaption}>
        {language[currentLanguage].hint}
      </span>
    </div>
  );
};
