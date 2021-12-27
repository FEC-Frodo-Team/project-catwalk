import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
// import axios from 'axios';

import {SearchQuestions} from './SearchQuestions.jsx';
// import {Answers} from './Answers.jsx';


export const QuestionsAndAnswers = () => {
  const {questions} = useContext(AppContext);
  // const {selectedProductID} = useContext(AppContext);


  return (
    !questions.data? <div>Loading Questions...</div> :
    <div style={{border: '2px solid blue', padding: '2rem', margin: '2rem'}}>

      <h2>Questions & Answers</h2>

      <SearchQuestions />

      {questions.data.results.map((question, index) => {
        return (
          <div key={index}>
            <p>{question.question_body}</p>
          </div>
        );
      })}
      {/* <Answers /> */}

      <div >
        <button
          style={{width: '10rem', background: 'transparent'}}>
          More Answered Questions
        </button>
        <button
          style={{width: '10rem', background: 'transparent'}}>
          Add a Question +
        </button>
      </div>
    </div>
  );
};
