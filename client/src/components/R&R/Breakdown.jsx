import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ReviewContext} from './ReviewContext.jsx';
import axios from 'axios';


export const Breakdown = () => {
  const {reviewMetaData} = useContext(AppContext);
  const {totalNumberReviews, setStarSelected, starSelected, setSearchTerm} = useContext(ReviewContext);

  const ratingObj = reviewMetaData.data.ratings ?
    reviewMetaData.data.ratings : {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

  const checkIfAnySelected = (obj) => {
    const arr1 = Object.keys(obj).map((key) => {
      return obj[key];
    });
    const checker = (arr) => arr.some((v) => v === true);

    console.log(checker(arr1), 'sdfgdsfg', starSelected);
    return checker(arr1);
  };


  return (
    <span>
      {Object.keys(ratingObj).slice(0).reverse().map((key) => {
        return <div style={{width: '80%', overflow: 'hidden', whiteSpace: 'nowrap', outline: (starSelected[key] && starSelected.anySelected)?'1px solid red':null}} onClick = {
          () => {
            setStarSelected({...starSelected, [key]: !starSelected[key], 'anySelected': checkIfAnySelected({...starSelected, [key]: !starSelected[key], 'anySelected': false})}); setSearchTerm('');
          }}>
          <span style = {{width: '10%', textDecoration: 'underline'}}
                           onMouseEnter= {(e)=>{e.target.style.color = 'blue', e.target.style.cursor = 'pointer' }}
                           onMouseLeave= {(e)=>{e.target.style.color = 'cadetblue'}}>{key} stars </span>
          {/* The bar itself will be two toned, green and grey. 1.2.4.2. p12*/}
          <span style = {{color: 'cadetblue', display: 'inline-block', backgroundColor: 'cadetblue', width: `${78*ratingObj[key]/totalNumberReviews}%`, marginTop: '5px', marginBottom: '5px'}}> .</span>
          <span style = {{color: 'lightgray', display: 'inline-block', backgroundColor: 'LightGray', width: `${78-(78*ratingObj[key]/totalNumberReviews)}%`, marginTop: '5px',marginBottom: '5px'}}>.</span>
        </div>;
      })}
    </span>
  );
};
