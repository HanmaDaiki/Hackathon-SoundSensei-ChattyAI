import { FC, useState } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { AllStoriesMessage } from "../../../interfaces/StoryState";
import styles from "./Card.module.scss";
import { saveAllStories, toggleLikeStory } from "../../../store/storySlice";

interface IProps {
  story: AllStoriesMessage;
}
export const Card: FC<IProps> = ({ story }) => {
  const [isOpen, toggleOpen] = useState(false);

  const dispatch = useAppDispatch();

  return (
    <div className={styles.card} onClick={() => toggleOpen(true)}>
      <img src={story.image} width={440} height={220} alt="pic" />
      <div className={styles.bottom}>
        <span>{story.text}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(toggleLikeStory(story.text));
            dispatch(saveAllStories());
          }}
          className={story.isLiked ? styles.like_active : styles.like}
        ></button>
      </div>

      {isOpen && (
        <div
          className={styles.full}
          onClick={(e) => {
            e.stopPropagation();
            toggleOpen(false);
          }}
        >
          <div className={styles.content}>
            <div className={styles.text}>{story.text}</div>
            <div className={styles.decor} />
          </div>
        </div>
      )}
    </div>
  );
};
