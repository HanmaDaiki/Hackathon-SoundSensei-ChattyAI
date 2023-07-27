import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { setLanguage } from '../store/languageSlice';
import { Favorites } from './pages/Favorites/Favorites';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { loadData } from '../store/storySlice';
import { Library } from './pages/Library/Library';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SideBar } from './simple/SideBar/SideBar';
import styles from './App.module.scss';
import { Overlay } from './ui/Overlay/Overlay';
import { useSelector } from 'react-redux';
import { StoryState } from '../interfaces/StoryState';


const MicRecorderTemp = require('mic-recorder-to-mp3');
const Mp3Recorder = new MicRecorderTemp({
  bitRate: 128
});


export function App() {
  const { statusApiIsLoading } = useSelector((state: { story: StoryState }) => state.story);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadData());
    const saveLang = localStorage.getItem('lang');
    if(!saveLang) {
      localStorage.setItem('lang', 'ru')
    }

    dispatch(setLanguage(localStorage.getItem('lang')));
    Mp3Recorder.start();
    Mp3Recorder.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <SideBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/library' element={<Library />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
      { statusApiIsLoading && <Overlay /> }
    </div>
  )
}
