import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ReviewContext} from './ReviewContext.jsx';
import axios from 'axios';


export const ReviewTile = () => {
  const {reviews} = useContext(AppContext);
  const {reviewMetaData} = useContext(AppContext);
  const {showMore} = useContext(ReviewContext);
  const {setShowMore} = useContext(ReviewContext);

  const reviewTilesToDisplay = showMore*2<=reviews.data.results.length  ? reviews.data.results.slice(0,showMore*2) : reviews.data.results;
  return (
    <div style = {{overflow: 'auto'}}>
    {reviewTilesToDisplay.map((oneResult) => {
      return (
        <div style = {{borderBottom: "3px solid grey", paddingTop: "20px"}}>
          <div style = {{display: "flex", justifyContent: "space-between"}}>
            <span>{oneResult.rating}star component</span>
            <span>{oneResult.reviewer_name}, {oneResult.date.substring(0,10)}</span>
          </div>
          <div>
            <h2>{oneResult.summary.length < 120 ? oneResult.summary : oneResult.summary.substring(0,120)+'...'}</h2>
          </div>
          <div>
            {oneResult.body}
          </div>
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
