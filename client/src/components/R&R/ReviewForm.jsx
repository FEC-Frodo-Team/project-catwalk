import React, {useContext, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';
import {ReviewContext} from './ReviewContext.jsx';
import Rating from 'react-rating';

export const ReviewForm = () => {
  const {reviewMetaData, products, selectedProductID, setReviews, reviews} = useContext(AppContext);
  const {showForm, setShowForm, formObj, setFormObj, charObj, setCharObj} = useContext(ReviewContext);


  const formSubmit = () => {
    const dummyObj = {...formObj, characteristics: charObj, recommend: formObj.recommend === 'Yes'? true:false};
    setFormObj(dummyObj);
    axios.post(`api/reviews`, dummyObj).then((err, result)=>{
      if (err) {
        console.log(err);
      }
      setShowForm(!showForm);
      setReviews({...reviews, 'data': {...reviews.data, 'results': reviews.data.results.concat([dummyObj])}});
      setCharObj({});
      setFormObj({});
      alert('THANKS FOR YOUR SUBMISSION!!');
    },
    );
  };

  const characteristicsObject ={
    Size: [148903,
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too wide'],
    Width: [148904,
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide'],
    Comfort: [148905,
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect'],
    Quality: [148906,
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect'],
    Length: [148896,
      'Runs Short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long'],
    Fit: [148895,
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long'],
  };


  const productName = 'testing'; // products.data.filter((item) => item.id === selectedProductID)[0].name;
  return (
    <div>
      {showForm? <div className="modal"><form className="modal-box">
        <span className='close' onClick = {() => setShowForm(!showForm)} >&times;</span>
        <h2 style = {{textAlign: 'center'}}>Write Your Review </h2>
        <div style = {{textAlign: 'center'}}>About the {productName}</div>
        <h2> Overall rating (mandatory)</h2>
        <div>Star selector component
          <Rating placeholderRating ={formObj.rating || 0} onClick = {(value) => {
            setFormObj({...formObj, 'rating': value});
          }}/>
        </div>
        <h2>Do you recommend this product? (mandatory)</h2>
        <div>
          <input checked = {!formObj.recommend || formObj.recommend == 'Yes'} onClick = {(e) => {
            setFormObj({...formObj, 'recommend': e.target.value});
          }} type="radio" id = 'Yes' name='recommended' value="Yes" />
          <label>Yes</label>
          <input type="radio" id="No" name='recommended' value = 'No' checked = {formObj.recommend == 'No'} onClick = {(e) => {
            setFormObj({...formObj, 'recommend': e.target.value});
          }}/>
          <label>No</label>
        </div>
        <h2>Characteristics (mandatory)</h2>
        <div>{Object.keys(reviewMetaData.data.characteristics).map((key) =>{
          return (<div>
            <h2>{key}</h2>
            <span style = {{display: 'flex', justifyContent: 'space-between'}}>
              {/* {arrOfRatings.map((oneRating) => {
            return (
              <span>
                <input required  value = {oneRating} checked = {charObj[characteristicsObject[key][0]] == {oneRating}}
                onClick = {(e) => {setCharObj({...charObj, [characteristicsObject[key][0]]: e.target.value})}} type="radio" name = {key}/>
                <label >{oneRating} {characteristicsObject[key][oneRating]}</label>
              </span>
            );
          })} */}
              <input required value = {1} checked = {charObj[characteristicsObject[key][0]] == '1'}
                onClick = {(e) => {
                  setCharObj({...charObj, [characteristicsObject[key][0]]: Number(e.target.value)});
                }} type="radio" name = {key}/>
              <label >{1} {characteristicsObject[key][1]}</label>
              <input required value = {2} checked = {charObj[characteristicsObject[key][0]] == '2'}
                onClick = {(e) => {
                  setCharObj({...charObj, [characteristicsObject[key][0]]: Number(e.target.value)});
                }} type="radio" name = {key}/>
              <label >{2} {characteristicsObject[key][2]}</label>
              <input required value = {3} checked = {charObj[characteristicsObject[key][0]] == '3'}
                onClick = {(e) => {
                  setCharObj({...charObj, [characteristicsObject[key][0]]: Number(e.target.value)});
                }} type="radio" name = {key}/>
              <label >{3} {characteristicsObject[key][3]}</label>
              <input required value = {4} checked = {charObj[characteristicsObject[key][0]] == '4'}
                onClick = {(e) => {
                  setCharObj({...charObj, [characteristicsObject[key][0]]: Number(e.target.value)});
                }} type="radio" name = {key}/>
              <label >{4} {characteristicsObject[key][4]}</label>
              <input required value = {5} checked = {charObj[characteristicsObject[key][0]] == '5'}
                onClick = {(e) => {
                  setCharObj({...charObj, [characteristicsObject[key][0]]: Number(e.target.value)});
                }} type="radio" name = {key}/>
              <label >{5} {characteristicsObject[key][5]}</label>
            </span>
          </div>);
        })}
        <h2>Review summary</h2>
        <input value = {formObj.summary || null} onChange = {(e) => {
          setFormObj({...formObj, 'summary': e.target.value});
        }} type = 'text' maxLength="60" placeholder = 'Example: Best purchase ever!' ></input>
        <h2> Review body (mandatory)</h2>
        <input required value = {formObj.body || null} onChange = {(e) => {
          setFormObj({...formObj, 'body': e.target.value});
        }} type = 'text' minLength="50" maxLength="1000" placeholder = 'Why did you like the product or not?'></input>
        </div>
        <h2>Upload your photos</h2>
        <input ></input>
        <h2>What is your nickname (mandatory)</h2>
        <input required value = {formObj.nickname || null} onChange = {(e) => {
          setFormObj({...formObj, 'name': e.target.value});
        }} type = 'text' maxLength="50" placeholder ='Example: jackson11!'></input>
        <h2>Your email (mandatory)</h2>
        <input required value = {formObj.email || null} onChange = {(e) => {
          setFormObj({...formObj, 'email': e.target.value});
        }}type = 'email' maxLength="60" placeholder ='Example: jackson11@email.com'></input>
        <button onClick = {(e) => {
          e.preventDefault(); formSubmit();
        }}>Submit review</button>
        <div></div>
      </form> </div>:null}
      <button onClick = {() => setShowForm(!showForm)}>ADD A REVIEW+</button>
    </div>
  );
};
