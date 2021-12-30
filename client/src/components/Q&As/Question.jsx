/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {styles} from './styles.js';

import {Answer} from './Answer.jsx';

export const Question = (props) => {
  // const [allAnswers, setAllAnswers] = useState(question.answers);
  const [question] = useState(props.question);
  const [answers, setAnswers] = useState(question.answers);
  // const [moreAnswers, setMoreAnswers] = useState(false);
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

  return (
    console.log(styles),

    !Array.isArray(answers) ? <div>loading question...</div> :
    <div>
      <hr />
      <div style={styles.questionBox}>
        <p>Q: {question.question_body} </p>

        <div style={styles.helpfulAndReport}>
          <p style={{marginRight: '10px'}}>
            Helpful? Yes({question.question_helpfulness})
          </p>
          <p style={{marginRight: '10px'}}>
          Add Answer
          </p>
          <p>
            report
          </p>

        </div>

      </div>
      <hr/>

      {answers.slice(0, numAToDisplay).map((answer) => {
        return (
          <Answer answer={answer} key={answer.id}/>
          // <div id="answerBox"
          //   key={answer.id}
          //   style={styles.answerBox}>
          //   <p style={styles.answerBoxP}> A: {answer.body}</p>

        //   <div style={styles.helpfulAndReport}>
        //     <p>by {answer.answerer_name}, {answer.date.slice(0, 10)} </p>
        //     <p>Helpful? Yes({answer.helpfulness})</p>
        //     <p>report</p>

        //   </div>
        //   <div style={styles.answerPhotos}>
        //     {answer.photos.length ?
        //     answer.photos.map((pic, index) => {
        //       return (
        //         <a
        //           target="_parent"
        //           href={pic}
        //           key={index}>

        //           <img
        //             style={styles.pic}
        //             src={pic}/>
        //         </a>);
        //     }) : null}
        //   </div>
        // </div>
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
