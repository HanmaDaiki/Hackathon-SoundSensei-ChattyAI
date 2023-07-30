import { FC, useEffect } from "react";
import { useSelector } from "react-redux";

import { StoryState } from "../../../interfaces/StoryState";
import styles from "./LikeStory.module.scss";
import { resetGenaration, saveStory } from "../../../store/storySlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

export const LikeStory: FC = () => {
  const { statusApiIsLoading, generation } = useSelector(
    (state: { story: StoryState }) => state.story
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if(generation > 3) {
      setTimeout(() => {
        dispatch(resetGenaration());
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generation])

  return (
    <div className={styles.container}>
      <button
        disabled={statusApiIsLoading}
        className={styles.like}
        onClick={() => {
          dispatch(saveStory());
        }}
      >
        <div className={styles.img}></div>
      </button>
      {generation > 2 && (
        <div className={styles.notifycation} onClick={() => dispatch(resetGenaration())}>
          Нажми на сердечко, и сказка сохранится в твоей Библиотеке
        </div>
      )}
    </div>
  );
};
