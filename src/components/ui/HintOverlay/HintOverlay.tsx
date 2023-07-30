import { FC } from "react";
import cn from "classnames";
import { useSelector } from "react-redux";
import { LanguageState } from "../../../interfaces/LanguageState";

import { HintOverlayProps } from "../../../interfaces/HintOverlayProps";

import styles from "./HintOverlay.module.scss";

export const HintOverlay: FC<HintOverlayProps> = ({
  handleHintsOverlay,
}: HintOverlayProps) => {
  const handleClick = () => {
    localStorage.setItem("firstTime", "false");
    handleHintsOverlay();
  };

  const { language, currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );

  return (
    <div onClick={handleClick} className={styles.overlaycontainer}>
      <div className={styles.hintoverlay}>
        <div className={cn(styles.hintbubble, styles.text, styles.small1, currentLanguage === "zh" && styles.zh)}>
          {language[currentLanguage].hintNewTale}
        </div>
        <div className={cn(styles.hintbubble, styles.text, styles.small2, currentLanguage === "zh" && styles.zh)}>
          {language[currentLanguage].hintFavTale}
        </div>
        <div className={cn(styles.hintbubble, styles.text, styles.big)}>
          {language[currentLanguage].hintMic}
        </div>
      </div>
    </div>
  );
};
