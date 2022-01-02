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
  const [count, setCount] = useState(100);
  const [amount, setAmount] = useState(count);
  const [newAnswerCount, setNewAnswerCount] = useState(0);
  const {selectedProductID} = useContext(AppContext);


  // sort questions by helpfulness then if they have answers then by date
  const sortQuestions = (response) => {
    response.sort((q1, q2) =>
    (q1.question_helpfulness > q2.question_helpfulness) ? -1 :
    (q1.question_helpfulness === q2.question_helpfulness) ?
    ((Object.keys(q1.answers).length && !Object.keys(q2.answers).length) ? -1 :
     (Object.keys(q1.answers).length && Object.keys(q2.answers).length) ?
     ((q1.question_date > q2.question_date) ? -1 : 1) : 1) : 1);
  };

  // get request to get all questions for selected product
  const fetchQuestions = () => {
    axios
        // eslint-disable-next-line max-len
        .get(`api/qa/questions?product_id=${selectedProductID}&page=1&count=${count}`)
        .then((response) => {
          sortQuestions(response.data.results);
          setQuestions(response.data);
          console.log('got Questions: ', response.data);
        })
        .catch(console.log);
  };

  useEffect(() => {
    fetchQuestions();
  }, [selectedProductID, count, amount, newAnswerCount]);

  // function to increase the number of questions to display at a time
  const showMoreQuestions = () => {
    if (questions.results.length < count - 1 ) {
      setAmount(questions.results.length);
    } else {
      setCount(count + 2);
      setAmount(amount + 2);
    }
    setNumQToDisplay(numQToDisplay + 2);
  };


  return (
    console.log('QUESTIONS***', questions),
    !questions.results? <div>Loading Questions...</div> :
    <QuestionsContext.Provider value={{
      questions, setQuestions,
      amount, setAmount,
      newAnswerCount, setNewAnswerCount,
    }}>
      <div style={styles.qAContainer}>

        <h2>Questions & Answers</h2>

        <SearchQuestions />
        <div style={styles.questionAndAnswers}>
          {questions.results.slice(0, numQToDisplay).map((question) => {
            return (
              <Question
                question={question}
                key={question.question_id}
                fetchQuestions={fetchQuestions}
              />
            );
          })}
        </div>
        <div >
          {numQToDisplay < amount ?
          <button
            onClick={()=> showMoreQuestions()}
            style={styles.buttons}>
            More Answered Questions
          </button> : null
          }
          <AddQuestion fetchQuestions={fetchQuestions} />

        </div>
      </div>
    </QuestionsContext.Provider>
  );
};


