import { FC, useState } from 'react';

import { Chat } from '../../simple/Chat/Chat';
import { Header } from '../../simple/Header/Header';
import { Tools } from '../../simple/Tools/Tools';
import { addUserMessageToCurrentStory, getOpenAiStory, saveCurrentStory, updateStatusApiIsLoading } from '../../../store/storySlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import styles from './MainPage.module.scss';
import { StoryState } from '../../../interfaces/StoryState';
import { useSelector } from 'react-redux';


export const MainPage: FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const { statusApiIsLoading } = useSelector((state: { story: StoryState }) => state.story);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateStatusApiIsLoading(true));
    dispatch(addUserMessageToCurrentStory(prompt));
    dispatch(saveCurrentStory());
    setPrompt('');

    await dispatch(getOpenAiStory({ prompt }));

    dispatch(updateStatusApiIsLoading(false));
  };

  return (
    <div className={styles.main}>
      <Header from='Сказочник' />
      <Chat />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          disabled={statusApiIsLoading}
          placeholder={statusApiIsLoading ? 'Сказочник генерирует сказку...' : 'Какую сказку вы хотите?'}
          onChange={(elser) => setPrompt(elser.target.value)}
          value={prompt}
        />
        <button disabled={statusApiIsLoading} type='submit'></button>
      </form>
      <Tools />
    </div>
  );
};
