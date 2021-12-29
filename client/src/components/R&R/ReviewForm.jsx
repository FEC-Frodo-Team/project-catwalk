import React, {useContext, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';
import {ReviewContext} from './ReviewContext.jsx';


export const ReviewForm = () => {
  const {reviewMetaData, products, selectedProductID} = useContext(AppContext);
  const {showForm, setShowForm} = useContext(ReviewContext);
  let allTheInfo;
  const characteristicsObject ={
    Size: [
      'A size too small',
      '½ a size too small',
      'Perfect',
      '½ a size too big',
      'A size too wide'],
    Width: [
      'Too narrow',
      'Slightly narrow',
      'Perfect',
      'Slightly wide',
      'Too wide'],
    Comfort: [
      'Uncomfortable',
      'Slightly uncomfortable',
      'Ok',
      'Comfortable',
      'Perfect'],
    Quality: [
      'Poor',
      'Below average',
      'What I expected',
      'Pretty great',
      'Perfect'],
    Length: [
      'Runs Short',
      'Runs slightly short',
      'Perfect',
      'Runs slightly long',
      'Runs long'],
    Fit: [
      'Runs tight',
      'Runs slightly tight',
      'Perfect',
      'Runs slightly long',
      'Runs long'],
  };


  let productName = products.data.filter((item) => item.id === selectedProductID)[0].name;
  return (
    <div>
      {showForm? <form style = {{overflow: 'auto', border: '2px solid blue', position: 'absolute', left:'12%', backgroundColor: 'white', width:'76%', height: '90%', top: '-10%'}}>
        <h2 style = {{textAlign: 'center'}}>Write Your Review </h2>
        <div style = {{textAlign: 'center'}}>About the {productName}</div>
        <h2> Overall rating (mandatory)</h2>
        <div>Star selector component</div>
        <h2>Do you recommend this product? (mandatory)</h2>
        <div>
          <input type="radio" id = 'Yes' name='recommended' value="Yes"
                checked/>
          <label for="Yes">Yes</label>
          <input type="radio" id="No" name='recommended' value="No"/>
          <label for="No">No</label>
        </div>
        <h2>Characteristics (mandatory)</h2>
        <div>{Object.keys(reviewMetaData.data.characteristics).map((key) =>{
        return (<div>
          <h2>{key}</h2>
            <span style = {{display: 'flex', justifyContent: 'space-between'}}>
              <input type="radio" name = {key}/>
              <label >1 {characteristicsObject[key][0]}</label>
              <input type="radio" name = {key}/>
              <label >2 {characteristicsObject[key][1]}</label>
              <input type="radio" name = {key}/>
              <label >3 {characteristicsObject[key][2]}</label>
              <input type="radio" name = {key}/>
              <label >4 {characteristicsObject[key][3]}</label>
              <input type="radio" name = {key}/>
              <label >5 {characteristicsObject[key][4]}</label>
            </span>
          </div>)})}
        <h2>Review summary</h2>
        <input type = 'text' maxLength="60" placeholder = 'Example: Best purchase ever!' ></input>
        <h2> Review body (mandatory)</h2>
        <input type = 'text' minLength="50" maxLength="1000" placeholder = 'Why did you like the product or not?'></input>
        </div>
        <button>Upload your photos</button>
        <h2>What is your nickname (mandatory)</h2>
        <input type = 'text' maxLength="50" placeholder ='Example: jackson11!'></input>
        <h2>Your email (mandatory)</h2>
        <input type = 'email' maxLength="60" placeholder ='Example: jackson11@email.com'></input>
        <button>Submit review</button>

        <div></div>
        </form>:null}
      <button onClick = {() => setShowForm(!showForm)}>ADD A REVIEW+</button>
    </div>
  );
};
