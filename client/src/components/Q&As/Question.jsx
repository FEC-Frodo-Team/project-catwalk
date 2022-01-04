/* eslint-disable react/prop-types */
import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {QuestionsContext} from './QuestionsContext.jsx';
import {styles} from './styles.js';
import axios from 'axios';

import {AddAnswer} from './AddAnswer.jsx';
import {Answer} from './Answer.jsx';

export const Question = (props) => {
  const {selectedProductID} = useContext(AppContext);
  const [question] = useState(props.question);
  const [answers, setAnswers] = useState(question.answers);
  const {newAnswerCount, setNewAnswerCount} = useContext(QuestionsContext);
  const [numAToDisplay, setNumAToDisplay] = useState(2);

  const sortAnswers = (response) => {
    response.sort((a1, a2) =>
      (a1.answerer_name.toLowerCase() === 'seller' &&
      a2.answerer_name.toLowerCase() !== 'seller') ? -1 :
      (a1.answerer_name.toLowerCase() === 'seller' &&
      a2.answerer_name.toLowerCase() === 'seller') ?
      ((a1.helpfulness > a2.helpfulness) ? -1 : 1) : 1);
  };

  useEffect(() => {
    axios.get(`api/qa/questions/${question.question_id}/answers?count=100`)
        .then((response) => {
          sortAnswers(response.data.results);
          setAnswers(response.data.results);
          console.log(answers);
        });
  }, [question, newAnswerCount]);

  // increase numAToDisplay by 2 to show more answers
  const showMoreAnswers = () => {
    setNumAToDisplay(answers.length);
  };

  return (
    !Array.isArray(answers) ? <div>loading question...</div> :
    <div>
      <hr />
      <div style={styles.questionBox}>
        <p>Q: {question.question_body} </p>

        <div style={styles.helpfulAndReport} className="helpfulAndReport">
          <p>
            Helpful? Yes({question.question_helpfulness})
          </p>
          <p className="vertical-line"> </p>
          <AddAnswer
            questionId={question.question_id}
            newAnswerCount={newAnswerCount}
            setNewAnswerCount={setNewAnswerCount}
          />
          <p className="vertical-line"> </p>
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
