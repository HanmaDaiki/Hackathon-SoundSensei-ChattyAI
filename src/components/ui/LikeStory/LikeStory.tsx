import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { StoryState } from "../../../interfaces/StoryState";
import styles from "./LikeStory.module.scss";
import { resetGenaration, saveStory } from "../../../store/storySlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { LanguageState } from "../../../interfaces/LanguageState";

export const LikeStory: FC = () => {
  const { language, currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );
  const { statusApiIsLoading, generation } = useSelector(
    (state: { story: StoryState }) => state.story
  );
  const dispatch = useAppDispatch();

  console.log(language[currentLanguage]);
  useEffect(() => {
    if (generation > 2) {
      setTimeout(() => {
        dispatch(resetGenaration());
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation]);

  return (
    <div className={styles.container}>
      <button
        aria-label="save story"
        disabled={statusApiIsLoading}
        className={styles.like}
        onClick={() => {
          dispatch(saveStory());
        }}
      >
        <div className={styles.img}></div>
      </button>
      {generation > 2 && (
        <div
          className={styles.notifycation}
          onClick={() => dispatch(resetGenaration())}
        >
          Нажми на сердечко, и сказка сохранится в твоей Библиотеке
        <div className={styles.notifycation} onClick={() => dispatch(resetGenaration())}>
          {language[currentLanguage].hintFavTale}
        </div>
      )}
    </div>
  );
};
