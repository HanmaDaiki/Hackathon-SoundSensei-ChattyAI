import { FC } from "react";

import { Navigation } from "../Navigation/Navigation";
import styles from "./SideBar.module.scss";
import { Hint } from "../../ui/Hint/Hint";

import { HintOverlayProps } from "../../../interfaces/HintOverlayProps";

export const SideBar: FC<HintOverlayProps> = ({
  handleHintsOverlay,
}: HintOverlayProps) => {
  return (
    <aside className={styles.sidebar}>
      <Navigation />
      <div className={styles.hint}>
        <Hint handleHintsOverlay={handleHintsOverlay} />
      </div>
    </aside>
  );
};
