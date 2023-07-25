import { Routes, Route } from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SideBar } from './simple/SideBar/SideBar';
import { Header } from './simple/Header/Header';
import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/favorites' element={<Header from='Избраное'/>} />
        <Route path='/my-fairy-tales' element={<Header from='Мои сказки'/>} />
        <Route path='/settings' element={<Header from='Настройки'/>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
