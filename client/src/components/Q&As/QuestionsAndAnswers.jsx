import React, { useContext } from 'react';
import { AppContext } from '../AppContext.jsx';
import axios from 'axios';


export const QuestionsAndAnswers = () => {
  const { questions, setQuestions } = useContext(AppContext);
  const { selectedProductID } = useContext(AppContext);

  console.log('***Questions***', questions);
  console.log('****Questions Data: ', questions.data);
  console.log('***Questions DATA RESULTS***', questions.data.results);


  return (
    <div>Hello from Q and As</div>
  );
};
