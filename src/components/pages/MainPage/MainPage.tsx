import { FC, useState } from "react";
import { useSelector } from "react-redux";
import cn from "classnames";

import { RecorderMic } from "../../simple/RecorderMic/RecorderMic";
import {
  addUserMessageToCurrentStory,
  getOpenAiStory,
} from "../../../store/storySlice";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { StoryState } from "../../../interfaces/StoryState";
import randomImg from "../../../images/random-image.jpg";

import styles from "./MainPage.module.scss";
import { Transcribe } from "../../simple/Transcribe/Transcribe";
import { Chat } from "../../simple/Chat/Chat";
import { Header } from "../../simple/Header/Header";
import { Tools } from "../../simple/Tools/Tools";

export const MainPage: FC = () => {
  const [prompt, setPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isMicHovered, toggleIsMicHovered] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(addUserMessageToCurrentStory(prompt));
    setPrompt("");

    await dispatch(getOpenAiStory({ prompt }));

    setLoading(false);
  };

  const handleMicHover = () => {
    toggleIsMicHovered((cur) => !cur);
  };

  return (
    <div className={styles.main}>
      {/* <h1>Main Page</h1>
      <img src={randomImg} alt={`Картинка ${randomImg}`} width={200} />
      <div className={styles['output']}>
        {currentStory.map((story, index) => (
          <p key={index}>{story}</p>
        ))}
      </div>
      {loading && <p>Получаем ответ...</p>}
      
      <RecorderMic />
      <Transcribe /> */}
      <Header from="Сказочник" />
      <div className={styles.chatcontainer}>
        <Chat />
        <form
          className={cn(
            styles.form,
            isMicHovered ? styles.formwithhover : null
          )}
          onSubmit={handleSubmit}
        >
          <input
            disabled={loading ? true : false}
            placeholder={
              loading
                ? "Сказочник генерирует сказку..."
                : "Какую сказку вы хотите?"
            }
            onChange={(elser) => setPrompt(elser.target.value)}
            value={prompt}
          />
          <button type="submit"></button>
        </form>
      </div>

      <Tools handleHover={handleMicHover} />
    </div>
  );
};
