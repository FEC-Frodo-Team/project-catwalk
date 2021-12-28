import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {styles} from './styles.js';


export const SearchQuestions = () => {
  // const {questions, setQuestions} = useContext(AppContext);

  return (
    <form style={styles.searchContainer} >
      <input
        type="text"
        style={styles.searchBar}
        id="QA_SearchBar"
        value={null}
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      />
      <button style={styles.searchBtn}>search</button>
    </form>
  );
};
