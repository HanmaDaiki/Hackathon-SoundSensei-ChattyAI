import { FC } from 'react';

import { setLanguage } from '../../../store/languageSlice';
import { switchHelloMessage } from '../../../store/storySlice';
import { useSelector } from 'react-redux';
import { LanguageState } from '../../../interfaces/LanguageState';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import flagRu from '../../../images/ru-flag.png';
import flagEu from '../../../images/eu-flag.png';
import flagCn from '../../../images/cn-flag.png';
import flagAe from '../../../images/ae-flag.png';
import flagFr from '../../../images/fr-flag.png';
import styles from './Header.module.scss';


interface IProps {
  from: string;
}
export const Header: FC<IProps> = (props) => {
  const { from } = props;
  const { language } = useSelector((state: { lang: LanguageState }) => state.lang);

  const dispatch = useAppDispatch();

  const [selectedOption, setSelectedOption] = useState<React.ReactNode>(<img src={flagRu} alt='flag' />);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: React.ReactNode) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <h1>{from}</h1>

      <div className={styles.customSelect}>
        <div className='selected-option' onClick={() => setIsOpen(!isOpen)}>
          {selectedOption}
        </div>
        {isOpen && (
          <div className={styles.options}>
            <div
              className='option'
              onClick={() => {
                handleOptionClick(<img src={flagRu} alt='flag' />);
                dispatch(setLanguage('ru'));
                dispatch(switchHelloMessage(language['ru'].helloMessage));
              }}
            >
              <img src={flagRu} alt='flag' />
            </div>
            <div
              className='option'
              onClick={() => {
                handleOptionClick(<img src={flagEu} alt='flag' />);
                dispatch(setLanguage('en'));
                dispatch(switchHelloMessage(language['en'].helloMessage));
              }}
            >
              <img src={flagEu} alt='flag' />
            </div>
            <div
              className='option'
              onClick={() => {
                handleOptionClick(<img src={flagCn} alt='flag' />);
                dispatch(setLanguage('zh'));
                dispatch(switchHelloMessage(language['zh'].helloMessage));
              }}
            >
              <img src={flagCn} alt='flag' />
            </div>
            <div
              className='option'
              onClick={() => {
                handleOptionClick(<img src={flagAe} alt='flag' />);
                dispatch(setLanguage('ae'));
                dispatch(switchHelloMessage(language['ae'].helloMessage));
              }}
            >
              <img src={flagAe} alt='flag' />
            </div>
            <div
              className='option'
              onClick={() => {
                handleOptionClick(<img src={flagFr} alt='flag' />);
                dispatch(setLanguage('fr'));
                dispatch(switchHelloMessage(language['fr'].helloMessage));
              }}
            >
              <img src={flagFr} alt='flag' />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
