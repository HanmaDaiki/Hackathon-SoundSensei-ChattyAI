import { Routes, Route } from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { MainPage } from './pages/MainPage/MainPage';
import { SideBar } from './simple/SideBar/SideBar';
import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <SideBar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/favorites' element={<div>Избраное</div>} />
        <Route path='/my-fairy-tales' element={<div>Мои сказки</div>} />
        <Route path='/settings' element={<div>Настройки</div>} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
