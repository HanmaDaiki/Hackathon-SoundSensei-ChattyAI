import { FC } from "react";
import { useSelector } from "react-redux";

import { StoryState } from "../../../interfaces/StoryState";
import styles from "./LikeStory.module.scss";
import { saveStory } from "../../../store/storySlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";

export const LikeStory: FC = () => {
  const { statusApiIsLoading } = useSelector(
    (state: { story: StoryState }) => state.story
  );
  const dispatch = useAppDispatch();

  return (
    <button
      disabled={statusApiIsLoading}
      className={styles.like}
      onClick={() => {
        dispatch(saveStory());
      }}
    >
      <div className={styles.img}></div>
    </button>
  );
};
