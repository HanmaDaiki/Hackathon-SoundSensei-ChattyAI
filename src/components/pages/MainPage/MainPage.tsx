import { FC, useState } from 'react';

import { Chat } from '../../simple/Chat/Chat';
import { Header } from '../../simple/Header/Header';
import { Tools } from '../../simple/Tools/Tools';
import { addUserMessageToCurrentStory, getOpenAiStory, saveCurrentStory } from '../../../store/storySlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import styles from './MainPage.module.scss';


export const MainPage: FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(addUserMessageToCurrentStory(prompt));
    dispatch(saveCurrentStory());
    setPrompt('');

    await dispatch(getOpenAiStory({ prompt }));

    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <Header from='Сказочник' />
      <Chat />
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          disabled={loading ? true : false}
          placeholder={loading ? 'Сказочник генерирует сказку...' : 'Какую сказку вы хотите?'}
          onChange={(elser) => setPrompt(elser.target.value)}
          value={prompt}
        />
        <button type='submit'></button>
      </form>
      <Tools />
    </div>
  );
};
