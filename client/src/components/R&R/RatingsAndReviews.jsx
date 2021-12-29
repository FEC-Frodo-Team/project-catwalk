import React, {useContext, useState, useEffect} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';
import {Breakdown} from './Breakdown.jsx';
import {Characteristics} from './Characteristics.jsx';
import {ReviewTile} from './ReviewTile.jsx';
import {ReviewForm} from './ReviewForm.jsx';
import {ReviewContext} from './ReviewContext.jsx';

export const RatingsAndReviews = () => {
  const {reviews, reviewMetaData, products, selectedProductID} = useContext(AppContext);
  const [showMore, setShowMore] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const totalNumberReviews = (Number(reviewMetaData.data.recommended.true)+Number(reviewMetaData.data.recommended.false))
  const percentageRecommend = reviews.data.results.length ?
    100*Number(reviewMetaData.data.recommended.true)/totalNumberReviews : 0;


  return (
    <ReviewContext.Provider value = {{
      totalNumberReviews,
      showMore, setShowMore,
      showForm, setShowForm,
    }}>
      <div style = {{width: '70%', left: '15%', position: 'absolute', paddingBottom: '5%'}}>
        <h2>RatingsAndReviews</h2>
        <div style={{width: '30%', float: 'left'}}>
          <h2>4.5  star component</h2>
          <p>{percentageRecommend.toFixed()}% of reviews recommend this product</p>
          <Breakdown />
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
          <span>
            {showMore*2<=reviews.data.results.length ?<button onClick = {() => {setShowMore(showMore+1)}}>MORE REVIEWS</button>:null
            }
            <ReviewForm />
          </span>
        </div>
      </div>
    </ReviewContext.Provider>
  );
};
