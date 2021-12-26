import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';


export const RatingsAndReviews = () => {
  const {reviews} = useContext(AppContext);
  const {reviewMetaData} = useContext(AppContext);
  // console.log('ratings and stuff:', reviews);


  const ratingObj = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
  const percentageRecommend = reviews.data.results.length ?
    reviewMetaData.data.recommended[1]/reviews.data.results.length : 0;


  return (
    <span>
      <h2>RatingsAndReviews</h2>
      <div style={{width: '35%', float: 'left'}}>
        <h2>4.5  star component</h2>
        <p>{percentageRecommend}% of reviews recommend this product</p>
        <span>
          {Object.keys(ratingObj).map((key) => {
            return <p>{key} stars {ratingObj[key]/reviews.data.results.length || 0} %</p>;
          })}
        </span>
        {!reviewMetaData.data ? <p>no character</p> :
        Object.keys(reviewMetaData.data.characteristics).map((key) => {
          return <div><p>{key}</p><p>{reviewMetaData.data.characteristics[key].value}</p></div>;
        })}
      </div>
      <div style={{width: '65%', float: 'left'}}>
        <span>{reviews.data.results.length} reviews, sorted by <select>
          <option>Relevant</option>
          <option>Most Helpful</option>
          <option>Newest</option>
        </select>
        </span>
        <p>map reviews</p>
        <p>map reviews</p>
        <p>map reviews</p>
        <p>map reviews</p>
        <p>map reviews</p>
        <span><button>MORE REVIEWS</button><button>ADD A REVIEW+</button></span>
      </div>
    </span>
  );
};
