import React, {useContext, useState} from 'react';
import {QuestionsContext} from './QuestionsContext.jsx';
import {styles} from './styles.js';


export const SearchQuestions = () => {
  const {questions, setQuestions, defaultQs, setDefaultQs} = useContext(QuestionsContext);
  const [searchTerm, setSearchTerm] = useState('');


  const handleSearch = (term) => {
    // setSearchedFor(true);
    if (term.length < 3) {
      setQuestions(defaultQs);
      return;
    } else {
      const copyData = JSON.parse(JSON.stringify(defaultQs));
      const filtered = defaultQs.results.filter((question) => {
        return (
          question.question_body.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      copyData.results = filtered;
      setQuestions(copyData);
    }
    // console.log(copyData);
    // console.log(defaultQs);
  };

  return (
    <form style={styles.searchContainer} >
      <input
        type="text"
        style={styles.searchBar}
        id="QA_SearchBar"

        onChange={(event) => {
          setSearchTerm(event.target.value);
          handleSearch(searchTerm);
        }}
      />
      <button style={styles.searchBtn}>search</button>
    </form>
  );
};
