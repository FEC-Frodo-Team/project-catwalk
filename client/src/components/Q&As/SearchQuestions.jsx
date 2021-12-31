import React, {useContext} from 'react';
import {QuestionsContext} from './QuestionsContext.jsx';
import {styles} from './styles.js';


export const SearchQuestions = () => {
  const {questions, setQuestions} = useContext(QuestionsContext);

  return (
    <form style={styles.searchContainer} >
      <input
        type="text"
        style={styles.searchBar}
        id="QA_SearchBar"
        defaultValue=''
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      />
      <button style={styles.searchBtn}>search</button>
    </form>
  );
};
