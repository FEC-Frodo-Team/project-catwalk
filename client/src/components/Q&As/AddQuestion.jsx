import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';

import {styles} from './styles.js';

export const AddQuestion = (props) => {
  const [showForm, setShowForm] = useState(false);
  const {selectedProductID} = useContext(AppContext);
  const formObj = {
    body: null,
    name: null,
    email: null,
    product_id: selectedProductID,
  };
  const [form, setForm] = useState(formObj);


  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formObj);
    axios.post('/api/qa/questions', form)
        .then(console.log)
        .catch(console.log);
  };

  const formChange = (event) => {
    const {name, value} = event.target;
    form[name] = value;
    // console.log(form);
  };

  return (
    <div>

      {showForm &&
      <div className="popup-box" style={styles.popupBox}>
        <div className="box" style={styles.box}>

          <span
            className="close-icon"
            style={styles.closeIcon}
            onClick={toggleForm}>
            x
          </span>

          <div style={styles.formInputs}>

            <label>Your Question*</label>
            <textarea
              name="body"
              style={styles.formBody}
              rows="1" cols="10"
              minLength="10"
              maxLength="1000"
              defaulvalue={formObj.body}
              required="required"
              onChange={(event) => formChange(event)}
            ></textarea>

            <br />

            <label>Nickname*</label>
            <input
              name="name"
              type="text"
              minLength='2'
              maxLength="60"
              placeholder="Example: jackson11!"
              defaulvalue={formObj.name}
              required="required"
              onChange={(event) => formChange(event)}
            />
            <p>
            For privacy reasons, do not use your full name or email address
            </p>

            <br />

            <label>Email*</label>
            <input
              name="email"
              type='email'
              minLength="7"
              maxLength="60"
              placeholder ='Example: jackson11@email.com'
              defaulvalue={formObj.email}
              required="required"
              onChange={(event) => formChange(event)}
            />
            <p>For authentication reasons, you will not be emailed</p>

          </div>
          <br />
          <input
            type='button' value='Submit'
            onClick={(event) => handleSubmit(event)} />


        </div>
      </div>}
      <button
        style={styles.buttons}
        onClick={toggleForm}
      >
      Add a Question +
      </button>

    </div>

  );
};
