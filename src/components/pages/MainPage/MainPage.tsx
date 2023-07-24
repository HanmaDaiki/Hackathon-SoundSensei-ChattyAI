import { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { RecorderMic } from '../../simple/RecorderMic/RecorderMic';
import { getOpenAiStory } from '../../../store/storySlice';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { StoryState } from '../../../interfaces/StoryState';
import randomImg from '../../../images/random-image.jpg';
import styles from './MainPage.module.scss';
import { Transcribe } from '../../simple/Transcribe/Transcribe';


export const MainPage: FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { currentStory } = useSelector((state: { story: StoryState }) => state.story);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    await dispatch(getOpenAiStory({ prompt }));

    setLoading(false);
  };

  return (
    <div className={styles.main}>
      <h1>Main Page</h1>
      <img src={randomImg} alt={`Картинка ${randomImg}`} width={200} />
      <div className={styles['output']}>
        {currentStory.map((story, index) => (
          <p key={index}>{story}</p>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <textarea onChange={(elser) => setPrompt(elser.target.value)} value={prompt} />
        <button type='submit'>Спроси у OpenAI</button>
      </form>
      {loading && <p>Получаем ответ...</p>}
      
      <RecorderMic />
      <Transcribe />
    </div>
  );
};
