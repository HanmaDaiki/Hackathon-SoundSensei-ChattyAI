import { Routes, Route } from 'react-router-dom';

import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Header } from './simple/Header/Header';
import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
