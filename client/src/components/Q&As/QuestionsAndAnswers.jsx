import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../AppContext.jsx';
import {QuestionsContext} from './QuestionsContext.jsx';
import axios from 'axios';


import {styles} from './styles.js';
import {SearchQuestions} from './SearchQuestions.jsx';
import {Question} from './Question.jsx';
import {AddQuestion} from './AddQuestion.jsx';


export const QuestionsAndAnswers = () => {
  const [questions, setQuestions] = useState({});
  const [numQToDisplay, setNumQToDisplay] = useState(4);
  const {selectedProductID} = useContext(AppContext);

  // get request to get all questions for selected product
  useEffect(() => {
    axios
        .get(`api/qa/questions?product_id=${selectedProductID}&count=${numQToDisplay}`)
        .then((results) => {
          console.log('got Questions: ', results);
          setQuestions(results);
        });
  }, [selectedProductID, numQToDisplay]);

  // function to increase the number of questions to display at a time
  const showMoreQuestions = () => {
    setNumQToDisplay(numQToDisplay + 2);
  };


  return (
    !questions.data? <div>Loading Questions...</div> :
    <QuestionsContext.Provider value={{
      questions, setQuestions,
    }}>
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
          {/* {numQToDisplay < questions.data.results.length ? */}
          <button
            onClick={()=> showMoreQuestions()}
            style={styles.buttons}>
            More Answered Questions
          </button>   {/* : null */}
          {/* } */}
          <AddQuestion />

        </div>
      </div>
    </QuestionsContext.Provider>
  );
};
