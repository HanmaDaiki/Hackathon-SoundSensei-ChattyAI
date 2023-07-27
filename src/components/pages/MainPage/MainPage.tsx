import { FC, useState } from "react";
import { useSelector } from "react-redux";

import {
  addUserMessageToCurrentStory,
  getOpenAiStory,
  updateStatusApiIsLoading,
} from "../../../store/storySlice";
import { LanguageState } from '../../../interfaces/LanguageState';
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { StoryState } from "../../../interfaces/StoryState";
import { Chat } from "../../simple/Chat/Chat";
import { Header } from "../../simple/Header/Header";
import { Tools } from "../../simple/Tools/Tools";
import styles from "./MainPage.module.scss";


export const MainPage: FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const { statusApiIsLoading } = useSelector((state: { story: StoryState }) => state.story);
  const { language, currentLanguage } = useSelector((state: {lang: LanguageState} ) => state.lang);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateStatusApiIsLoading(true));
    dispatch(addUserMessageToCurrentStory(prompt));
    setPrompt('');

    await dispatch(getOpenAiStory({ prompt, keyWords: language[currentLanguage].keyWords }));

    dispatch(updateStatusApiIsLoading(false));
  };

  return (
    <div className={styles.main}>
      <Header from={language[currentLanguage].storyteller} />
      <Chat />

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <input
          disabled={statusApiIsLoading}
          placeholder={statusApiIsLoading ? language[currentLanguage].inputPlaceholderAwaiting : language[currentLanguage].inputPlaceholder}
          onChange={(elser) => setPrompt(elser.target.value)}
          value={prompt}
        />
        <button disabled={statusApiIsLoading} type="submit"></button>
      </form>
      <Tools />
    </div>
  );
};
