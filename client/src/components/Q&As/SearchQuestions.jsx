import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
// import axios from 'axios';


export const SearchQuestions = () => {
  const {questions} = useContext(AppContext);

  return (
    <div>
      <input
        id="QA_SearchBar"
        style={
          {
            width: '20rem',
            background: '#F2F1F9',
            border: '1px solid black',
            padding: '0.5rem',
          }}

        value={null}
        placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."
      />
    </div>
  );
};
