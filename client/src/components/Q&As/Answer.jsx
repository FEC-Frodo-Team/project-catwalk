/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect} from 'react';
import {styles} from './styles.js';
import Popup from 'reactjs-popup';
// import 'reactjs-popup/dist/index.css
import moment from 'moment';

export const Answer = (props) => {
  const [answer] = useState(props.answer);


  return (
    <div id="answerBox"
      key={answer.id}
      style={styles.answerBox}>
      <p style={styles.answerBoxP}> <b>A:</b> {answer.body}</p>

      <div style={styles.answerPhotos}>

        {answer.photos.length ?
            answer.photos.map((pic, index) => {
              return (
                <div
                  key={index}>
                  <Popup trigger={<img
                    style={styles.pic}
                    src={pic.url}/>}
                  modal
                  nested
                  >
                    {(close) => (
                      <div className="modal">
                        <span className="close" onClick={close}>&times;</span>
                        <img className="modal-box"
                          src={pic.url}
                          onClick={close} />
                      </div>
                    )}
                  </Popup>

                </div>);
            }) :
             null}
      </div>

      <div style={styles.helpfulAndReport} className="helpfulAndReport">
        <p>by : {answer.answerer_name.toLowerCase() === 'seller' ?
             <b>{'SELLER'}</b> :
                answer.answerer_name},
        {' ' + moment(answer.date.slice(0, 10)).format('MMMM DD, YYYY')} </p>
        <p className="vertical-line"></p>
        <p >Helpful? Yes({answer.helpfulness})</p>
        <p className="vertical-line"></p>
        <p>report</p>

      </div>


    </div>
  );
};
