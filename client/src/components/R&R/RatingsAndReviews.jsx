import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';
import {Breakdown} from './Breakdown.jsx';
import {Characteristics} from './Characteristics.jsx';
import {ReviewTile} from './ReviewTile.jsx';

export const RatingsAndReviews = () => {
  const {reviews} = useContext(AppContext);
  const {reviewMetaData} = useContext(AppContext);
  // console.log('ratings and stuff:', reviews);

  console.log('inside rr:', reviews, reviewMetaData);
  const totalNumberReviews = (Number(reviewMetaData.data.recommended.true)+Number(reviewMetaData.data.recommended.false))

  const percentageRecommend = reviews.data.results.length ?
    100*Number(reviewMetaData.data.recommended.true)/totalNumberReviews : 0;

  return (
    <span>
      <h2>RatingsAndReviews</h2>
      <div style={{width: '30%', float: 'left'}}>
        <h2>4.5  star component</h2>
        <p>{percentageRecommend.toFixed()}% of reviews recommend this product</p>
        <Breakdown totalNumberReviews ={totalNumberReviews}/>
        <Characteristics />
      </div>
      <div style={{width: '70%', float: 'left'}}>
        <span>{reviews.data.results.length} reviews, sorted by <select>
          <option>Relevant</option>
          <option>Most Helpful</option>
          <option>Newest</option>
        </select>
        </span>
        <ReviewTile />
        <span><button>MORE REVIEWS</button><button>ADD A REVIEW+</button></span>
      </div>
    </span>
  );
};
