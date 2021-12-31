import React, {useContext, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';
import {ReviewContext} from './ReviewContext.jsx';
import Rating from 'react-rating';

export const ReviewForm = () => {
  const {reviewMetaData, products, selectedProductID} = useContext(AppContext);
  const {showForm, setShowForm, formObj, setFormObj,charObj, setCharObj} = useContext(ReviewContext);


  const formSubmit = () => {
    setFormObj({...formObj, 'characteristics': charObj});
    console.log('form oject:', formObj);
    axios.post(`api/reviews?product_id=`);
  };

  const arrOfRatings = [1,2,3,4,5];
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


  let productName = products.data.filter((item) => item.id === selectedProductID)[0].name;
  return (
    <div>
      {showForm? <form onSubmit={() => {console.log('gothere');return false}}  style = {{overflow: 'auto', border: '2px solid blue', position: 'absolute', left:'12%', backgroundColor: 'white', width:'76%', height: '100%', top: '-10%'}}>
        <h2 style = {{textAlign: 'center'}}>Write Your Review </h2>
        <div style = {{textAlign: 'center'}}>About the {productName}</div>
        <h2> Overall rating (mandatory)</h2>
        <div>Star selector component
        <Rating fractions = {4}/>
        </div>
        <h2>Do you recommend this product? (mandatory)</h2>
        <div>
          <input checked = {formObj.recommend == "Yes"} onClick = {(e) => {setFormObj({...formObj, 'recommend': e.target.value})}} type="radio" id = 'Yes' name='recommended' value="Yes" defaultChecked/>
          <label>Yes</label>
          <input type="radio" id="No" name='recommended' value = 'No' checked = {formObj.recommend == "No"} onClick = {(e) => {setFormObj({...formObj, 'recommend': e.target.value})}}/>
          <label>No</label>
        </div>
        <h2>Characteristics (mandatory)</h2>
        <div>{Object.keys(reviewMetaData.data.characteristics).map((key) =>{
        return (<div>
          <h2>{key}</h2>
            <span style = {{display: 'flex', justifyContent: 'space-between'}}>
            {arrOfRatings.map((oneRating) => {
            return (
              <span>
                <input required  value = {oneRating} checked = {charObj[characteristicsObject[key][0]] == {oneRating}}
                onClick = {(e) => {setCharObj({...charObj, [characteristicsObject[key][0]]: e.target.value})}} type="radio" name = {key}/>
                <label >{oneRating} {characteristicsObject[key][oneRating]}</label>
              </span>
            );
          })}
            </span>
          </div>)})}
        <h2>Review summary</h2>
        <input  value = {formObj.summary || null} onChange = {(e) => {setFormObj({...formObj, 'summary': e.target.value})}} type = 'text' maxLength="60" placeholder = 'Example: Best purchase ever!' ></input>
        <h2> Review body (mandatory)</h2>
        <input required value = {formObj.body || null} onChange = {(e) => {setFormObj({...formObj, 'body': e.target.value})}} type = 'text' minLength="50" maxLength="1000" placeholder = 'Why did you like the product or not?'></input>
        </div>
        <button>Upload your photos</button>
        <h2>What is your nickname (mandatory)</h2>
        <input required value = {formObj.nickname || null} onChange = {(e) => {setFormObj({...formObj, 'nickname': e.target.value})}} type = 'text' maxLength="50" placeholder ='Example: jackson11!'></input>
        <h2>Your email (mandatory)</h2>
        <input required  value = {formObj.email || null} onChange = {(e) => {setFormObj({...formObj, 'email': e.target.value})}}type = 'email' maxLength="60" placeholder ='Example: jackson11@email.com'></input>
        <button onClick = {(e) => { e.preventDefault(); formSubmit();}}>Submit review</button>
        <div></div>
        </form>:null}
      <button onClick = {() => setShowForm(!showForm)}>ADD A REVIEW+</button>
    </div>
  );
};
