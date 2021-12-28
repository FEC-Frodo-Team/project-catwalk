import React, {useContext, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';
import {ReviewContext} from './ReviewContext.jsx';


export const ReviewForm = () => {
  const {reviewMetaData, products, selectedProductID} = useContext(AppContext);
  const {showForm, setShowForm} = useContext(ReviewContext);

const characteristicsObject ={
  Size:[
  'A size too small',
  '½ a size too small',
  'Perfect',
  '½ a size too big',
  'A size too wide'],
  Width:[
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
  Quality:[
  'Poor',
  'Below average',
  'What I expected',
  'Pretty great',
  'Perfect'],
  Length:[
  'Runs Short',
  'Runs slightly short',
  'Perfect',
  'Runs slightly long',
  'Runs long'],
  Fit:[
  'Runs tight',
  'Runs slightly tight',
  'Perfect',
  'Runs slightly long',
  'Runs long'],
}


  let productName = products.data.filter((item) => item.id === selectedProductID)[0].name;
  return (
    <div>
      {showForm? <div style = {{overflow: 'auto', position: 'absolute',left:'12%', backgroundColor: 'green', width:'76%', height: '60%', top: '20%'}}>
        <h2>Write Your Review </h2>
        <div>About the {productName}</div>
        <h2> Overall rating (mandatory)</h2>
        <div>Star selector component</div>
        <h2>Do you recommend this product? (mandatory)</h2>
        <div>
          <input type="radio" id = 'Yes' value="Yes"
                checked/>
          <label for="Yes">Yes</label>
          <input type="radio" id="No" value="No"/>
          <label for="No">No</label>
        </div>
        <h2>Characteristics (mandatory)</h2>
        <div>{Object.keys(reviewMetaData.data.characteristics).map((key) =>{
        return (<div>
          <h2>{key}</h2>
            <div>
              <input type="radio"/>
              <label >1 {characteristicsObject[key][0]}</label>
              <input type="radio"/>
              <label >2 {characteristicsObject[key][1]}</label>
              <input type="radio"/>
              <label >3 {characteristicsObject[key][2]}</label>
              <input type="radio"/>
              <label >4 {characteristicsObject[key][3]}</label>
              <input type="radio"/>
              <label >5 {characteristicsObject[key][4]}</label>
            </div>
          </div>)})}
        <h2>Review summary</h2>
        <input type = 'text' hieght = '40px'></input>
        <h2> Review body (mandatory)</h2>
        <input type = 'text' hieght = '200px'></input>
        </div>
        <button>Upload your photos</button>
        <h2>What is your nickname (mandatory)</h2>
        <input type = 'text' ></input>
        <h2>Your email (mandatory)</h2>
        <input type = 'text' ></input>
        <button>Submit review</button>
        <div></div>
        </div>:null}
      <button onClick = {() => setShowForm(!showForm)}>ADD A REVIEW+</button>
    </div>
  );
};
