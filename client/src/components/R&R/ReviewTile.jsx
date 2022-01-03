import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ReviewContext} from './ReviewContext.jsx';
import Rating from 'react-rating';


export const ReviewTile = () => {
  const {reviews} = useContext(AppContext);
  const {showMore} = useContext(ReviewContext);
//the mogen conversion library v.01
const prettifyDate = (date) => {
    let reviewYear = date.slice(0, 4);
    let reviewMonth = date.slice(5, 7);
    let reviewDay = date.slice(8, 10);
    let monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    if (reviewMonth[0] === '0') {
      reviewMonth = monthArray[reviewMonth[1] - 1];
    } else {
      reviewMonth = monthArray[reviewMonth - 1];
    }

    if (reviewDay[0] === '0') {
      reviewDay = reviewDay[1];
    }
    return (`${reviewMonth} ${reviewDay}, ${reviewYear}`);
  };
  const reviewTilesToDisplay = showMore*2<=reviews.data.results.length  ? reviews.data.results.slice(0,showMore*2) : reviews.data.results;
  return (
    <div style = {{overflow: 'auto', maxHeight: "800px"}}>
    {reviewTilesToDisplay.map((oneResult) => {
      let showMoreReviewBody=false;
      return (
        <div style = {{borderBottom: "3px solid grey", paddingTop: "20px"}}>
          <div style = {{display: "flex", justifyContent: "space-between"}}>
            <Rating readonly = {true} initialRating = {oneResult.rating}/>
            <span>{oneResult.reviewer_name}, {prettifyDate(oneResult.date)}</span>
          </div>
          <div>
            <h2>{oneResult.summary.length <= 120 ? oneResult.summary : oneResult.summary.substring(0,120)+'...'}</h2>
          </div>
          <div>{oneResult.summary.length > 120 ? oneResult.summary.substring(120,oneResult.summary.length) : null}</div>
          <div onClick = {() => {let showMoreReviewBody = true;}}>
            {oneResult.body.length <= 250 ? oneResult.body : oneResult.body.substring(0,250)+'...Show More'}
          </div>
          <div>{showMoreReviewBody ?  oneResult.body.substring(250,oneResult.body.length): null}</div>
          {oneResult.recommend?<div>√ I recommend this product</div>:null}
          {oneResult.response?<div style = {{backgroundColor: "grey"}}>
            <h2>Response:</h2>
            <p>{oneResult.response}</p>
            </div>:null}
          <div>Helpful? Yes()  |  Report Component</div>
      </div>);
    })}
  </div>
  );
};
