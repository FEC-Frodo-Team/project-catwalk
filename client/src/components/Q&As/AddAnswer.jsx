/* eslint-disable react/prop-types */
import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {QuestionsContext} from './QuestionsContext.jsx';
import Popup from 'reactjs-popup';
import axios from 'axios';

import {styles} from './styles.js';

export const AddAnswer = (props) => {
  // const [questionId, setQuestionId] = useState(props.question.questionId);
  const {question_id: questionId, question_body: questionBody} = props.question;
  const {currentProduct} = useContext(AppContext);
  const {newAnswerCount, setNewAnswerCount} = useContext(QuestionsContext);
  const formObj = {
    body: '',
    name: '',
    email: '',
    photos: [],
  };
  const [form, setForm] = useState(formObj);


  const formChange = (event) => {
    const {name, value} = event.target;
    form[name] = value;
  };

  const addPhotos = (event) => {
    // const file = document.querySelector('input[type=file]').files[0];
    // form.photos.push(event.target.value);
    // // or
    // form.photos.push(file.name);
    console.log(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`api/qa/questions/${questionId}/answers`, form)
        .then(console.log)
        .then(setNewAnswerCount(newAnswerCount + 1))
        .then(() => {
          setForm(formObj);
        })
        .catch(console.log);
  };

  return (

    <div>
      <Popup trigger={
        <p style={{marginRight: '10px'}}>
        Add Answer
        </p>}>

        {(close) => (
          <div className="popup-box modal">
            <div className="modal-box" >

              <span
                className="close"
                onClick={close}>
            &times;
              </span>

              <div style={styles.formInputs}>
                <h4>Submit Your Answer
                  <br/>
                  <div style={{fontSize: 'small'}}>
                    {currentProduct.data.name + ': ' + questionBody}
                  </div>
                </h4>

                <label>Your Answer*</label>
                <textarea
                  name="body"
                  style={styles.formBody}
                  rows="1" cols="10"
                  maxLength="1000"
                  defaulvalue={''}
                  required="required"
                  onChange={formChange}
                ></textarea>

                <br />

                <label>Nickname*</label>
                <input
                  name="name"
                  type="text" maxLength="60"
                  placeholder="Example: jackson11!"
                  defaulvalue={''}
                  required="required"
                  onChange={formChange}
                />
                <p>
                 For privacy reasons, do not use your full name or email address
                </p>

                <br />

                <label>Email*</label>
                <input
                  name="email"
                  type='email'
                  maxLength="60"
                  placeholder ='Example: jackson11@email.com'
                  defaulvalue={''}
                  required="required"
                  onChange={formChange}
                />
                <p>For authentication reasons, you will not be emailed</p>

                {/* <label>Upload Your Photos</label>
                {form.photos.length < 5 ? // doesnt work properly
             <input
               type="file"
               name="photos"
               // multiple
               onChange={(event) => addPhotos(event)}
             /> :
           <p> you have already submitted the max amount of photos </p>
                } */}

              </div>
              <br />
              <input
                type='button' value='Submit'
                onClick={handleSubmit}
              />
            </div>
          </div>
        )}
      </Popup>

    </div>
  );
};


{/* <div className="popup-box" style={styles.popupBox}>
        <div className="box" style={styles.box}>

          <span
            className="close-icon"
            style={styles.closeIcon}
            onClick={toggleForm}>
            x
          </span>

          <div style={styles.formInputs}>
            <h4>Submit Your Answer
              <br/>
              <div style={{fontSize: 'small'}}>
                {currentProduct.data.name + ': ' + questionBody}
              </div>
            </h4>

            <label>Your Answer*</label>
            <textarea
              name="body"
              style={styles.formBody}
              rows="1" cols="10"
              maxLength="1000"
              defaulvalue={''}
              required="required"
              onChange={formChange}
            ></textarea>

            <br />

            <label>Nickname*</label>
            <input
              name="name"
              type="text" maxLength="60"
              placeholder="Example: jackson11!"
              defaulvalue={''}
              required="required"
              onChange={formChange}
            />
            <p>
            For privacy reasons, do not use your full name or email address
            </p>

            <br />

            <label>Email*</label>
            <input
              name="email"
              type='email'
              maxLength="60"
              placeholder ='Example: jackson11@email.com'
              defaulvalue={''}
              required="required"
              onChange={formChange}
            />
            <p>For authentication reasons, you will not be emailed</p>

            <label>Upload Your Photos</label>

            {form.photos.length < 5 ? // doesnt work properly
             <input
               type="file"
               name="photos"
               // multiple
               onChange={(event) => addPhotos(event)}
             /> :
           <p> you have already submitted the max amount of photos </p>
            }

          </div>
          <br />
          <input
            type='button' value='Submit'
            onClick={handleSubmit}
          />
        </div>
      </div> */}
