// eslint-disable-next-line no-unused-vars
import React, {useState, useEffect, useContext} from 'react';
import {AppContext} from '../AppContext.jsx';

import {styles} from './styles.js';

// import Answer from './Answer.jsx';

export const AddQuestion = (props) => {
  const [showForm, setShowForm] = useState(false);
  const [questionBody, setQuestionBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const {selectedProductID} = useContext(AppContext);


  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = () => {
    event.preventDefault();
    // axios.post('/api/qa/questions', {
    //   body: '', // something,
    //   name: '', // nickname,
    //   email: 'email',
    //   product_id: selectedProductID,
    // }).then(console.log).catch(console.log);
  };

  const formChange = () => {
    event.target.name(event.target.value);
    console.log(questionBody);
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
              name="setQuestionBody"
              style={styles.formBody}
              rows="1" cols="10"
              maxLength="1000"
              value={questionBody}
              onChange={formChange}
            ></textarea>

            <br />

            <label>Nickname*</label>
            <input
              name="nickname"
              type="text" maxLength="60"
              placeholder="Example: jackson11!"
              value={nickname}/>
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
              value={email}
            />
            <p>For authentication reasons, you will not be emailed</p>

          </div>
          <br />
          <input
            type='button' value='Submit'
            onClick={handleSubmit} />


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
