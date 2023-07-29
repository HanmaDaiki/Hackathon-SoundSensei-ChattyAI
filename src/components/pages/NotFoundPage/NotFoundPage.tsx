import { FC } from "react";
import { useSelector } from "react-redux";

// import { useNavigate } from "react-router-dom";

import { Header } from "../../simple/Header/Header";
import { LanguageState } from "../../../interfaces/LanguageState";

import notfoundpic from "../../../images/not-found-story.png";
import styles from "./NotFoundPage.module.scss";

export const NotFoundPage: FC = () => {
  // const navigate = useNavigate();

  const { language, currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );

  return (
    <div className={styles["not-found"]}>
      <Header from={language[currentLanguage].storyteller} />
      <div className={styles.container}>
        <img src={notfoundpic} alt="Not found page" width={232} height={310} />
        <div className={styles.text}>
          Я не могу найти эту страницу Переходи в Чат, и мы вместе придумаем
          новую сказку
        </div>
      </div>
    </div>
  );
};
