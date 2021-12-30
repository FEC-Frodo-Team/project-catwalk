import React, {useContext, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
// import axios from 'axios';


import {styles} from './styles.js';
import {SearchQuestions} from './SearchQuestions.jsx';
import {Question} from './Question.jsx';
import {AddQuestion} from './AddQuestion.jsx';


export const QuestionsAndAnswers = () => {
  const {questions} = useContext(AppContext);
  const [numQToDisplay, setNumQToDisplay] = useState(4);
  // const {selectedProductID} = useContext(AppContext);

  const showMoreQuestions = () => {
    setNumQToDisplay(numQToDisplay + 2);
  };

  return (
    !questions.data? <div>Loading Questions...</div> :
    <div style={styles.qAContainer}>

      <h2>Questions & Answers</h2>

      <SearchQuestions />
      <div style={styles.questionAndAnswers}>
        {questions.data.results.slice(0, numQToDisplay).map((question) => {
          return (
            <Question
              question={question}
              key={question.question_id}
            />
          );
        })}
      </div>
      <div >
        {numQToDisplay < questions.data.results.length ?
        <button
          onClick={()=> showMoreQuestions()}
          style={styles.buttons}>
        More Answered Questions
        </button> :null
        }
        <AddQuestion />

      </div>
    </div>
  );
};
