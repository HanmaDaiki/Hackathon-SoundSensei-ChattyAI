import { FC, useState, useEffect } from "react";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { AllStoriesMessage } from "../../../interfaces/StoryState";
import styles from "./Card.module.scss";
import { deleteSavedStory } from "../../../store/storySlice";

interface IProps {
  story: AllStoriesMessage;
}
export const Card: FC<IProps> = ({ story }) => {
  const [isOpen, toggleOpen] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          toggleOpen(false);
        }
      });
    }

    if (!isOpen) {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          toggleOpen(false);
        }
      });
    }
  }, [isOpen]);

  return (
    <div className={styles.card} onClick={() => toggleOpen(true)}>
      <img src={story.image} width={440} height={220} alt="pic" />
      <div className={styles.bottom}>
        <span>{story.text}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(deleteSavedStory(story.text));
          }}
          aria-label="delete saved story"
          className={styles.delete}
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
          <div className={styles.content} onClick={(e) => e.stopPropagation()}>
            <div className={styles.text}>{story.text}</div>
            <div className={styles.decor} />
          </div>
        </div>
      )}
    </div>
  );
};
