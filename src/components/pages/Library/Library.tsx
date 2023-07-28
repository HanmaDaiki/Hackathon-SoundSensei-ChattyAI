import { FC } from "react";

import { StoryState } from "../../../interfaces/StoryState";
import { useSelector } from "react-redux";
import { Header } from "../../simple/Header/Header";
import styles from "./Library.module.scss";
import { LanguageState } from "../../../interfaces/LanguageState";
import { Card } from "../../ui/Card/Card";

export const Library: FC = () => {
  const { allStories } = useSelector(
    (state: { story: StoryState }) => state.story
  );
  const { language, currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );

  return (
    <div className={styles.library}>
      <Header from={language[currentLanguage].library} />

      {allStories.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyImg} />
          <div className={styles.emptyText}>
            {language[currentLanguage].emptyLib}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          {allStories.map((story, index) => {
            return (
              <Card
                key={index}
                story={story}
              />
            );
          })}
        </div>
      )}

      <div className={styles.counters}>{allStories.length}/20</div>
    </div>
  );
};
