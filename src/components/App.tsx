import { Routes, Route, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import cn from "classnames";

import { setLanguage } from "../store/languageSlice";
import { Favorites } from "./pages/Favorites/Favorites";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { loadData } from "../store/storySlice";
import { Library } from "./pages/Library/Library";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { MainPage } from "./pages/MainPage/MainPage";
import { SideBar } from "./simple/SideBar/SideBar";
import styles from "./App.module.scss";
import { HintOverlay } from "./ui/HintOverlay/HintOverlay";

const MicRecorderTemp = require("mic-recorder-to-mp3");
const Mp3Recorder = new MicRecorderTemp({
  bitRate: 128,
});

export function App() {
  const dispatch = useAppDispatch();
  const [isHintOverlayOpened, setIsHintOverlayOpened] = useState(true);
  const navigate = useNavigate();

  const handleHintsOverlay = () => {
    setIsHintOverlayOpened((cur) => !cur);
    navigate("/");
  };

  useEffect(() => {
    dispatch(loadData());
    const saveLang = localStorage.getItem("lang");
    if (!saveLang) {
      localStorage.setItem("lang", "ru");
    }

    dispatch(setLanguage(localStorage.getItem("lang")));
    Mp3Recorder.start();
    Mp3Recorder.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div
        className={
          isHintOverlayOpened ? cn(styles.app, styles.blockclicks) : styles.app
        }
      >
        <SideBar handleHintsOverlay={handleHintsOverlay} />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/library" element={<Library />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </div>
      {isHintOverlayOpened && (
        <HintOverlay handleHintsOverlay={handleHintsOverlay} />
      )}
    </>
  );
}
