import { FC } from "react";

import { Header } from "../../simple/Header/Header";
import { useSelector } from "react-redux";
import { LanguageState } from "../../../interfaces/LanguageState";
import styles from "./Favorites.module.scss";
import { StoryState } from "../../../interfaces/StoryState";
import { Card } from "../../ui/Card/Card";

export const Favorites: FC = () => {
  const { allStories } = useSelector(
    (state: { story: StoryState }) => state.story
  );
  const { language, currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );

  return (
    <div className={styles.favorites}>
      <Header from={language[currentLanguage].favorites} />

      {allStories.filter((story) => story.isLiked).length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyImg} />
          <div className={styles.emptyText}>
            {language[currentLanguage].emptyFav}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          {allStories.filter((story) => story.isLiked).map((story, index) => {
            return (
              <Card
                key={index}
                story={story}
              />
            );
          })}
        </div>
      )}

      <div className={styles.counters}>{allStories.filter((story) => story.isLiked).length}</div>
    </div>
  );
};
