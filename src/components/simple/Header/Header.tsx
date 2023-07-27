import { FC, useEffect, useState } from "react";

import { setLanguage } from "../../../store/languageSlice";
import { useSelector } from "react-redux";
import { LanguageState } from "../../../interfaces/LanguageState";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import flagru from "../../../images/ru-flag.png";
import flagen from "../../../images/en-flag.png";
import flagzh from "../../../images/zh-flag.png";
import flagfr from "../../../images/fr-flag.png";
import styles from "./Header.module.scss";
import { StoryState } from "../../../interfaces/StoryState";

interface IProps {
  from: string;
}
export const Header: FC<IProps> = (props) => {
  const { from } = props;
  const { currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );
  const { statusApiIsLoading } = useSelector(
    (state: { story: StoryState }) => state.story
  );

  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<React.ReactNode>(
    <img
      src={require(`../../../images/${currentLanguage}-flag.png`)}
      alt="flag"
    />
  );
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSelectedOption(
      <img
        src={require(`../../../images/${currentLanguage}-flag.png`)}
        alt="flag"
      />
    );
  }, [currentLanguage]);

  const handleOptionClick = (option: React.ReactNode) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <span className={styles.caption}>{from}</span>
      {statusApiIsLoading ? (
        <div className={styles.customSelect}>{selectedOption}</div>
      ) : (
        <div className={styles.customSelect}>
          <div className="selected-option" onClick={() => setIsOpen(!isOpen)}>
            {selectedOption}
          </div>
          {isOpen && (
            <div className={styles.options}>
              <div
                className="option"
                onClick={() => {
                  handleOptionClick(<img src={flagru} alt="flag" />);
                  dispatch(setLanguage("ru"));
                  localStorage.setItem("lang", "ru");
                }}
              >
                <img src={flagru} alt="flag" />
              </div>
              <div
                className="option"
                onClick={() => {
                  handleOptionClick(<img src={flagen} alt="flag" />);
                  dispatch(setLanguage("en"));
                  localStorage.setItem("lang", "en");
                }}
              >
                <img src={flagen} alt="flag" />
              </div>
              <div
                className="option"
                onClick={() => {
                  handleOptionClick(<img src={flagzh} alt="flag" />);
                  dispatch(setLanguage("zh"));
                  localStorage.setItem("lang", "zh");
                }}
              >
                <img src={flagzh} alt="flag" />
              </div>
              <div
                className="option"
                onClick={() => {
                  handleOptionClick(<img src={flagfr} alt="flag" />);
                  dispatch(setLanguage("fr"));
                  localStorage.setItem("lang", "fr");
                }}
              >
                <img src={flagfr} alt="flag" />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
