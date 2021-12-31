/* eslint-disable react/prop-types */
import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {styles} from './styles.js';
import axios from 'axios';

import {AddAnswer} from './AddAnswer.jsx';
import {Answer} from './Answer.jsx';

export const Question = (props) => {
  const {selectedProductID} = useContext(AppContext);
  const [question] = useState(props.question);
  const [answers, setAnswers] = useState(question.answers);
  const [numAToDisplay, setNumAToDisplay] = useState(2);

  // change the answers object into an array
  useEffect(() => {
    const answersArray = Object.values(answers).map((answer) => answer);
    setAnswers(answersArray);
  }, [question]);

  // increase numAToDisplay by 2 to show more answers
  const showMoreAnswers = () => {
    setNumAToDisplay(answers.length);
  };

  const fetchQuestions = () => {
    axios.get(`api/qa/questions?product_id=${selectedProductID}&count=100`)
        .then(console.log);
  };

  return (
    !Array.isArray(answers) ? <div>loading question...</div> :
    <div>
      <hr />
      <div style={styles.questionBox}>
        <p>Q: {question.question_body} </p>

        <div style={styles.helpfulAndReport}>
          <p style={{marginRight: '10px'}}>
            Helpful? Yes({question.question_helpfulness})
          </p>
          <AddAnswer questionId={question.question_id} fetchQuestions={fetchQuestions}/>
          <p>
            report
          </p>

        </div>

      </div>


      {answers.slice(0, numAToDisplay).map((answer) => {
        return (
          <Answer answer={answer} key={answer.id}/>
        );
      })}

      <div style={styles.moreLessAnswers}>
        {numAToDisplay < answers.length ?
         <div onClick={() => showMoreAnswers()}>
         LOAD MORE ANSWERS
         </div> : answers.length <= 2 ? null :
         <div onClick={() => setNumAToDisplay(2)}>COLLAPSE ANSWERS</div>
        }


      </div>
    </div>
  );
};
