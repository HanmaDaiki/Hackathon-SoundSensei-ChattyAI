import { FC, useState } from "react";

import { LanguageState } from "../../../interfaces/LanguageState";
import { Card } from "../../ui/Card/Card";
import { StoryState } from "../../../interfaces/StoryState";
import { useSelector } from "react-redux";
import { Header } from "../../simple/Header/Header";
import styles from "./Library.module.scss";


export const Library: FC = () => {
  const { allStories } = useSelector(
    (state: { story: StoryState }) => state.story
  );
  const { language, currentLanguage } = useSelector(
    (state: { lang: LanguageState }) => state.lang
  );
  const [search, setSearch] = useState<string>('');
  const [filterOption, setFilterOption] = useState<string>('');
  
  return (
    <div className={styles.library}>
      <Header from={language[currentLanguage].library} />
      <form onSubmit={(e) => {
        e.preventDefault();
        setFilterOption(search  );
        setSearch('');
      }} className={styles.search}>
        <input placeholder={language[currentLanguage].searchPlaceholder} className={styles['search-input']} onChange={(e) => setSearch(e.target.value)} value={search} />
        <button className={styles['search-button']} type='submit' />
      </form>
      {allStories.length === 0 ? (
        <div className={styles.empty}>
          <div className={styles.emptyImg} />
          <div className={styles.emptyText}>
            {language[currentLanguage].emptyLib}
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          {allStories.filter((story) => story.text.toLowerCase().replace(' ', '').includes(filterOption.toLowerCase())).map((story, index) => {
            return (
              <Card
                key={index}
                story={story}
              />
            );
          })}
        </div>
      )}

      <div className={styles.counters}>{allStories.length}/20</div>
    </div>
  );
};
