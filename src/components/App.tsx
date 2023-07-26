import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import { useAppDispatch } from '../hooks/useAppDispatch';
import { loadData } from '../store/storySlice';
import { Library } from './pages/Library/Library';
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SideBar } from './simple/SideBar/SideBar';
import { Header } from './simple/Header/Header';
import styles from './App.module.scss';


export function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.app}>
      <SideBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/favorites' element={<Header from='Избраное'/>} />
        <Route path='/library' element={<Library />} />
        <Route path='/settings' element={<Header from='Настройки'/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
