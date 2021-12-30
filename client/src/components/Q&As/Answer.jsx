import React, {useState, useEffect} from 'react';
import {styles} from './styles.js';

// import Answer from './Answer.jsx';

export const Answer = (props) => {
  const [answer] = useState(props.answer);
  const [enlargePic, setEnlargePic] = useState(false);

  return (
    <div id="answerBox"
      key={answer.id}
      style={styles.answerBox}>
      <p style={styles.answerBoxP}> A: {answer.body}</p>

      <div style={styles.answerPhotos}>
        {enlargePic ?
        <div >
          <img
            src={event.target.src}
            style={styles.forms}
            onClick={() => setEnlargePic(!enlargePic)}
          />
        </div> :
        null
        }

        {answer.photos.length ?
            answer.photos.map((pic, index) => {
              return (
                <div
                  target="_parent"
                  href={pic}
                  key={index}>
                  <img
                    style={styles.pic}
                    src={pic}
                    onClick={() => setEnlargePic(!enlargePic)}
                  />
                </div>);
            }) :
             null}
      </div>

      <div style={styles.helpfulAndReport}>
        <p>by {answer.answerer_name}, {answer.date.slice(0, 10)} </p>
        <p>Helpful? Yes({answer.helpfulness})</p>
        <p>report</p>

      </div>


    </div>
  );
};
