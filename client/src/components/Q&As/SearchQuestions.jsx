import React, {useContext, useState} from 'react';
import {QuestionsContext} from './QuestionsContext.jsx';
import {styles} from './styles.js';
import {BsSearch} from 'react-icons/bs';


export const SearchQuestions = () => {
  const {questions, setQuestions, defaultQs} = useContext(QuestionsContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    if (term.length < 3) {
      setQuestions(defaultQs);
      return;
    } else {
      const copyData = JSON.parse(JSON.stringify(defaultQs));
      const filtered = defaultQs.results.filter((question) => {
        return (
          question.question_body
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
        );
      });
      copyData.results = filtered;
      setQuestions(copyData);
    }
  };

  return (
    <form style={styles.searchContainer} >
      <input
        type="text"
        id="QA_SearchBar"
        placeholder="Search for questions here"
        onChange={(event) => {
          setSearchTerm(event.target.value);
          handleSearch(searchTerm);
        }}
      />
      <button id="search-btn"
        onClick={(e) => e.preventDefault()
        }>
        <BsSearch /></button>
    </form>
  );
};
