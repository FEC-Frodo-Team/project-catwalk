/* eslint-disable react/prop-types */
import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {QuestionsContext} from './QuestionsContext.jsx';
import {styles} from './styles.js';
import axios from 'axios';

import {AddAnswer} from './AddAnswer.jsx';
import {Answer} from './Answer.jsx';

export const Question = (props) => {
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const [question] = useState(props.question);
  const [helpfulnessCount, setHelpfulnessCount] = useState(question.question_helpfulness);
  const [answers, setAnswers] = useState();
  const {newAnswerCount, setNewAnswerCount} = useContext(QuestionsContext);
  const [numAToDisplay, setNumAToDisplay] = useState(2);
  const [helpfulClicked, setHelpfulClicked] = useState(false);

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

  const handleClick = (event) => {
    console.log(event.target.className);
    const {className} = event.target;

    if (className === 'helpful' && helpfulClicked) {
      alert('you can not click helpful more than once');
      return;
    }

    axios.put(`api/qa/questions/${question.question_id}/${className}`)
        .then(() => setHelpfulClicked(true))
        .then(() => props.fetchQuestions())
        .then(() => setHelpfulnessCount(helpfulnessCount + 1))
        .catch(console.log);
  };
  return (
    !Array.isArray(answers) ? <div>loading question...</div> :
    <div>
      <hr />
      <div id="question-box" style={styles.questionBox}>
        <p style={{fontWeight: 'bold'}}>Q: {question.question_body} </p>

        <div className="helpfulAndReport">
          <p
            className="helpful"
            onClick={(event) => {
              handleClick(event);
            }}>
            Helpful? Yes({helpfulnessCount})
          </p>
          <p className="vertical-line"> </p>
          <AddAnswer
            question={question}
            newAnswerCount={newAnswerCount}
            setNewAnswerCount={setNewAnswerCount}
          />
          <p className="vertical-line"> </p>
          <p className="report" onClick={(event) => handleClick(event)}>
            report
          </p>

        </div>

      </div>

      {answers.slice(0, numAToDisplay).map((answer) => {
        return (
          <Answer answer={answer} key={answer.id}/>
        );
      })}

      <div id="more-less-answers" >
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
